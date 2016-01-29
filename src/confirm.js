import Button from 'uxcore-button'
import Dialog from './Dialog'
import i18n from './i18n'

export default function (props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let d;
    props = props || {};
    props.iconClassName = props.iconClassName || 'kuma-icon-caution';
    let width = props.width || 416;

    props.lang = props.lang || 'zh-cn';
    let lang = i18n[props.lang];

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
        props.okCancel = true;
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
            <Button size={props.buttonSize || "medium"} onClick={onOk}>{lang['ok']}</Button>
            <Button type="secondary" size={props.buttonSize || "medium"} onClick={onCancel}>{lang['cancel']}</Button>
        </div>;
    } else {
        footer = <div className="kuma-confirm-action">
            <Button size={props.buttonSize || "medium"} onClick={onOk}>{lang['isee']}</Button>
        </div>;
    }

    ReactDOM.render(<Dialog
        prefixCls="kuma-dlg"
        className="kuma-dlg-confirm"
        visible={true}
        closable={false}
        title=""
        footer=""
        maskTransitionName="fade" width={width}>
        <div>{body} {footer}</div>
    </Dialog>, div, function () {
        d = this;
    });
}
