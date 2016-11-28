/**
 * @author: vincent
 * @date: 15/5/19
 */
import RcDialog from 'rc-dialog';
import Button from 'uxcore-button';
import React from 'react';
import classnames from 'classnames';
import assign from 'object-assign';

import confirm from './confirm';
import i18n from './i18n';

function noop() {
}

const htmlNode = document.documentElement;
const supportClassList = !!htmlNode.classList;
let isSafari = false;
if (typeof document === 'object') {
  if (navigator
    && /Safari/.test(navigator.userAgent)
    && /Apple Computer/.test(navigator.vendor)) {
    isSafari = true;
  }
}

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
    };
  }

  componentWillUpdate(nextProps) {
    const { htmlClassName } = this.props;
    if (htmlClassName) {
      if (nextProps.visible) {
        if (supportClassList) {
          htmlNode.classList.add(htmlClassName);
        } else {
          htmlNode.className += ` ${htmlClassName}`;
        }
      } else {
        if (supportClassList) {
          htmlNode.classList.remove(htmlClassName);
        } else {
          let cls = htmlNode.className;
          cls = cls.replace(new RegExp(`\\s?${htmlClassName}`), '');
          htmlNode.className = cls;
        }
      }
    }
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

    if (isSafari) {
        // safari animation bug when using threeFallV
        transitionName = 'slideDown';
    }
    const defaultFooter = [
      <Button
        key="confirm"
        type="primary"
        size="medium"
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
  htmlClassName: '',
};

Dialog.info = props => {
  assign(props, {
    iconClassName: 'kuma-icon-information',
    okCancel: false,
  });
  return confirm(props);
};

Dialog.success = props => {
  assign(props, {
    iconClassName: 'kuma-icon-success',
    okCancel: false,
  });
  return confirm(props);
};

Dialog.error = props => {
  assign(props, {
    iconClassName: 'kuma-icon-error',
    okCancel: false,
  });
  return confirm(props);
};

Dialog.confirm = props => {
  assign(props, {
    okCancel: true,
  });
  return confirm(props);
};
