/**
 * @author: vincent
 * @date: 15/5/19
 */
import RcDialog from 'rc-dialog';
import Button from 'uxcore-button';
import React from 'react';
import classnames from 'classnames';

import confirm from './confirm';
import i18n from './i18n';

function noop() {
}

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      visible: props.visible,
    };
  }

  handleCancel() {
    this.props.onCancel();
  }

  handleOk() {
    this.props.onOk();
  }

  render() {
    const props = this.props;
    let { transitionName } = props;
    const locale = i18n[props.locale];

    if (typeof document === 'object') {
      if (navigator
        && /Safari/.test(navigator.userAgent)
        && /Apple Computer/.test(navigator.vendor)) {
        // safari animation bug when using threeFallV
        transitionName = 'slideDown';
      }
    }
    const defaultFooter = [
      <Button
        key="confirm"
        type="primary"
        size="medium"
        loading={props.confirmLoading}
        onClick={this.handleOk.bind(this)}
      >
        {locale.ok}
      </Button>,
      <Button
        key="cancel"
        type="secondary"
        size="medium"
        onClick={this.handleCancel.bind(this)}
      >
        {locale.cancel}
      </Button>,
    ];
    const footer = props.footer || defaultFooter;
    let className;
    if (!props.title) {
      className = `${props.className} ${props.prefixCls}-noheader`;
    } else {
      className = props.className;
    }
    const wrapClassName = classnames({
      [props.wrapClassName]: !!props.wrapClassName,
      'vertical-center-dialog': true,
    });
    return (<RcDialog
      onClose={this.handleCancel.bind(this)}
      footer={footer}
      {...props}
      transitionName={transitionName}
      className={className}
      wrapClassName={wrapClassName}
      visible={props.visible}
    />);
  }
}

Dialog.propTypes = {
  visible: React.PropTypes.bool,
  onCancel: React.PropTypes.func,
  onOk: React.PropTypes.func,
};

Dialog.defaultProps = {
  prefixCls: 'kuma-dlg',
  className: '',
  wrapClassName: '',
  onOk: noop,
  locale: 'zh-cn',
  onCancel: noop,
  width: 520,
  transitionName: 'threeFallV',
  maskTransitionName: 'fade',
  confirmLoading: false,
  visible: false,
  closable: true,
  maskClosable: false,
  title: '',
};

Dialog.info = function (props) {
  const newProps = { ...props };
  newProps.iconClassName = 'kuma-icon-information';
  newProps.okCancel = false;
  return confirm(newProps);
};

Dialog.success = function (props) {
  const newProps = { ...props };
  newProps.iconClassName = 'kuma-icon-success';
  newProps.okCancel = false;
  return confirm(newProps);
};

Dialog.error = function (props) {
  const newProps = { ...props };
  newProps.iconClassName = 'kuma-icon-error';
  newProps.okCancel = false;
  return confirm(newProps);
};

Dialog.confirm = function (props) {
  const newProps = { ...props };
  newProps.okCancel = true;
  return confirm(newProps);
};
