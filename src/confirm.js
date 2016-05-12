import Button from 'uxcore-button';
import Dialog from './Dialog';
import i18n from './i18n';
import React from 'react'; 
import ReactDOM from 'react-dom';

export default function (props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let d;
    props = props || {};
    props.iconClassName = props.iconClassName || 'kuma-icon-caution';
    let width = props.width || 300;

    props.locale = props.locale || 'zh-cn';
    let locale = i18n[props.locale];

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
        props.okCancel = true;
    }
    
    if (props.timer) {
        setTimeout(() => {
            close();
        }, props.timer);
    }

    function close() {
        d.setState({
            visible: false
        });
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    }

    function onCancel() {
        let cancelFn = props.onCancel;
        if (cancelFn) {
            let ret;
            if (cancelFn.length) {
                ret = cancelFn(close);
            } else {
                ret = cancelFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }

    function onOk() {
        let okFn = props.onOk;
        if (okFn) {
            let ret;
            if (okFn.length) {
                ret = okFn(close);
            } else {
                ret = okFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }

    let body = <div className="kuma-confirm-body">
        <i className={'kuma-icon ' + props.iconClassName}></i>
        <span className="kuma-confirm-title">{props.title}</span>
        <div className="kuma-confirm-content">{props.content}</div>
    </div>;
    let footer;

    if (props.okCancel) {
        footer = <div className="kuma-confirm-action">
            <Button size={props.buttonSize || "small"} onClick={onOk}>{locale['ok']}</Button>
            <Button type="secondary" size={props.buttonSize || "small"} onClick={onCancel}>{locale['cancel']}</Button>
        </div>;
    } else {
        footer = <div className="kuma-confirm-action">
            <Button size={props.buttonSize || "small"} onClick={onOk}>{locale['isee']}</Button>
        </div>;
    }

    ReactDOM.render(<Dialog
        prefixCls="kuma-dlg"
        className="kuma-dlg-confirm"
        onCancel={onCancel}
        visible={true}
        closable={true}
        title=""
        footer=""
        transitionName={props.transitionName || "threeFallV"}
        maskTransitionName={props.transitionName || "fade"} width={width}>
        <div>{body} {footer}</div>
    </Dialog>, div, function () {
        d = this;
    });
}
