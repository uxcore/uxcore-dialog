import Button from 'uxcore-button';
import Dialog from './Dialog';
import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

const htmlNode = document.documentElement;
const supportClassList = !!htmlNode.classList;

let defaultTransitionName = 'threeFallV';
if (typeof document === 'object') {
  if (navigator
    && /Safari/.test(navigator.userAgent)
    && /Apple Computer/.test(navigator.vendor)) {
    // safari animation bug when using threeFallV
    defaultTransitionName = 'slideDown';
  }
}

export default function (props = {}) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  props = assign({
    iconClassName: 'kuma-icon-caution',
    width: 300,
    locale: 'zh-cn',
    transitionName: defaultTransitionName,
  }, props);
  const locale = i18n[props.locale];

    // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  function close() {
    if (props.htmlClassName) {
      if (supportClassList) {
        htmlNode.classList.remove(props.htmlClassName);
      } else {
        let cls = htmlNode.className;
        cls = cls.replace(new RegExp(`\\s?${props.htmlClassName}`), '');
        htmlNode.className = cls;
      }
    } 
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  if (props.timer) {
    setTimeout(() => {
      close();
    }, props.timer);
  }

  function onCancel() {
    const cancelFn = props.onCancel;
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
    const okFn = props.onOk;
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

  let body = (
    <div className="kuma-confirm-body">
      <i className={`kuma-icon ${props.iconClassName}`}></i>
      <span className="kuma-confirm-title">{props.title}</span>
      <div className="kuma-confirm-content">{props.content}</div>
    </div>
  );
  let footer;

  if (props.okCancel) {
    footer = (
      <div className="kuma-confirm-action">
        <Button size={props.buttonSize || 'small'} onClick={onOk}>{locale.ok}</Button>
        <Button type="secondary" size={props.buttonSize || 'small'} onClick={onCancel}>{locale.cancel}</Button>
      </div>
    );
  } else {
    footer = (
      <div className="kuma-confirm-action">
        <Button size={props.buttonSize || 'small'} onClick={onOk}>{locale.isee}</Button>
      </div>
    );
  }

  if (props.htmlClassName) {
    if (supportClassList) {
      htmlNode.classList.add(props.htmlClassName);
    } else {
      htmlNode.className += ` ${props.htmlClassName}`;
    }
  }

  ReactDOM.render(
    <Dialog
      prefixCls="kuma-dlg"
      className="kuma-dlg-confirm"
      onCancel={onCancel}
      visible
      closable
      title=""
      footer=""
      transitionName={props.transitionName}
      maskTransitionName={props.maskTransitionName}
      width={props.width}
      htmlClassName={props.htmlClassName}
    >
      <div>{body} {footer}</div>
    </Dialog>, div);
}
