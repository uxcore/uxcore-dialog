import React from 'react';
import Dialog from './Dialog';
let div;

export default function (props) {
  let d;
  props = props || {};
  props.iconClassName = props.iconClassName || 'kuma-question-circle';
  let width = props.width || 416;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  function close() {
    d.setState({
      visible: false
    });
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
  let footer = <div className="kuma-confirm-btns">
    <button type="button" className="kuma-button kuma-button-mwhite" onClick={onCancel}>取 消</button>
    <button type="button" className="kuma-button kuma-button-mblue" onClick={onOk}>确 定</button>
  </div>;

  if (props.okCancel) {
    footer = <div className="kuma-confirm-btns">
      <button type="button" className="kuma-button kuma-button-mwhite" onClick={onCancel}>取 消</button>
      <button type="button" className="kuma-button kuma-button-mblue" onClick={onOk}>确 定</button>
    </div>;
  } else {
    footer = <div className="kuma-confirm-btns">
      <button type="button" className="kuma-button kuma-button-mblue" onClick={onOk}>知道了</button>
    </div>;
  }

  if (!div) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  React.render(<Dialog
    prefixCls="kuma-dialog"
    className="kuma-dialog-confirm"
    visible={true}
    closable={false}
    title=""
    transitionName="zoom"
    footer=""
    maskTransitionName="fade" width={width}>
    <div style={{zoom: 1, overflow: 'hidden'}}>{body} {footer}</div>
  </Dialog>, div, function () {
    d = this;
  });
}
