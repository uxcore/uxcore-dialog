import Button from 'uxcore-button';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import React from 'react';

import i18n from './i18n';


export default function (props = {}, Dialog) {
  const htmlNode = document.documentElement;
  const supportClassList = !!htmlNode.classList;
  const div = document.createElement('div');
  document.body.appendChild(div);

  const newProps = assign({
    iconClassName: 'kuma-icon-caution',
    width: 320,
    locale: 'zh-cn',
  }, props);
  const locale = i18n[newProps.locale];

    // 默认为 true，保持向下兼容
  if (!('okCancel' in newProps)) {
    newProps.okCancel = true;
  }

  function close() {
    if (newProps.htmlClassName) {
      if (supportClassList) {
        htmlNode.classList.remove(newProps.htmlClassName);
      } else {
        htmlNode.className = htmlNode.className.replace(new RegExp(`\\s?${newProps.htmlClassName}`), '');
      }
    }
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  if (newProps.timer) {
    setTimeout(() => {
      close();
    }, newProps.timer);
  }

  function onCancel() {
    const cancelFn = newProps.onCancel;
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
    const okFn = newProps.onOk;
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

  let icon = <i className={`kuma-icon ${newProps.iconClassName}`} />;

  if (newProps.icon) {
    icon = newProps.icon;
  }

  const body = (
    <div className="kuma-confirm-body">
      {icon}
      <div className="kuma-confirm-body-main">
        <span className="kuma-confirm-title">{newProps.title}</span>
        <div className="kuma-confirm-content">{newProps.content}</div>
      </div>
    </div>
  );
  let footer;

  if (newProps.okCancel) {
    footer = (
      <div className="kuma-confirm-action">
        <Button type="secondary" size={newProps.buttonSize || 'small'} onClick={onCancel}>{newProps.cancelText || locale.cancel}</Button>
        <Button size={newProps.buttonSize || 'small'} onClick={onOk}>{newProps.okText || locale.confirm}</Button>
      </div>
    );
  } else {
    footer = (
      <div className="kuma-confirm-action">
        <Button size={newProps.buttonSize || 'small'} onClick={onOk}>{newProps.okText || locale.isee}</Button>
      </div>
    );
  }

  if (newProps.htmlClassName) {
    if (supportClassList) {
      htmlNode.classList.add(newProps.htmlClassName);
    } else {
      htmlNode.className += ` ${newProps.htmlClassName}`;
    }
  }

  ReactDOM.render(
    <Dialog
      prefixCls="kuma-dlg"
      className={`kuma-dlg-confirm ${newProps.className}`}
      onCancel={onCancel}
      visible
      closable
      title=""
      footer=""
      transitionName={newProps.transitionName}
      maskTransitionName={newProps.maskTransitionName}
      width={newProps.width}
      htmlClassName={newProps.htmlClassName}
      getContainer={newProps.getContainer}
    >
      <div>{body} {footer}</div>
    </Dialog>, div);
}
