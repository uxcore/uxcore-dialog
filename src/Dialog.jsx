/**
 * @author: vincent
 * @date: 15/5/19
 */
import Button from 'uxcore-button';
import React from 'react';
import classnames from 'classnames';
import assign from 'object-assign';
import Icon from 'uxcore-icon';
import PropTypes from 'prop-types';

import RcDialog from './RcDialog';
import confirm from './confirm';
import i18n from './i18n';


function noop() {
}


const getIEVer = () => {
  if (window) {
    const ua = window.navigator.userAgent;
    const idx = ua.indexOf('MSIE');
    if (idx > 0) {
      // "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64;
      // Trident/6.0; SLCC2; .NET CLR 2.0.50727)"
      return parseInt(ua.substring(idx + 5, ua.indexOf('.', idx)), 10);
    }
    if (ua.match(/Trident\/7\./)) {
      // "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2;
      // .NET CLR 2.0.50727; rv:11.0) like Gecko"
      return 11;
    }
    return 0;
  }
  return 0;
};

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
    };
  }

  componentWillUpdate(nextProps) {
    const { htmlClassName } = this.props;
    const htmlNode = document.documentElement;
    const supportClassList = !!htmlNode.classList;
    if (htmlClassName) {
      if (nextProps.visible) {
        if (supportClassList) {
          htmlNode.classList.add(htmlClassName);
        } else {
          htmlNode.className += ` ${htmlClassName}`;
        }
      } else if (supportClassList) {
        htmlNode.classList.remove(htmlClassName);
      } else {
        let cls = htmlNode.className;
        cls = cls.replace(new RegExp(`\\s?${htmlClassName}`), '');
        htmlNode.className = cls;
      }
    }
  }

  saveRef(refName) {
    const me = this;
    return (c) => {
      me[refName] = c;
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
    const locale = i18n[props.locale];

    const defaultFooter = [
      <Button
        key="cancel"
        type="secondary"
        size="small"
        onClick={this.handleCancel.bind(this)}
      >
        {locale.cancel}
      </Button>,
      <Button
        key="confirm"
        type="primary"
        size="small"
        onClick={this.handleOk.bind(this)}
      >
        {locale.ok}
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
      'vertical-center-dialog': getIEVer() < 8,
    });
    return (
      <RcDialog
        onClose={this.handleCancel.bind(this)}
        footer={footer}
        {...props}
        className={className}
        wrapClassName={wrapClassName}
        visible={props.visible}
        ref={(c) => {
          this.dialog = c;
        }}
      />
    );
  }
}

Dialog.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  htmlClassName: PropTypes.string,
  getContainer: PropTypes.func,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

Dialog.defaultProps = {
  prefixCls: 'kuma-dlg',
  className: '',
  wrapClassName: '',
  onOk: noop,
  locale: 'zh-cn',
  onCancel: noop,
  width: '520px',
  transitionName: 'dialogSlideDown',
  maskTransitionName: 'dialogFade',
  confirmLoading: false,
  visible: false,
  closable: true,
  maskClosable: false,
  title: '',
  htmlClassName: '',
};

function adjustIcon(props, defaultIcon) {
  const icon = props.iconClassName ? <Icon name={props.iconClassName} /> : <Icon name={defaultIcon} />;
  return props.icon ? props.icon : icon;
}

Dialog.info = (props) => {
  assign(props, {
    icon: adjustIcon(props, 'tishi-full'),
    okCancel: false,
  });
  return confirm(props, Dialog);
};

Dialog.success = (props) => {
  assign(props, {
    icon: adjustIcon(props, 'chenggong-full'),
    okCancel: false,
  });
  return confirm(props, Dialog);
};

Dialog.error = (props) => {
  assign(props, {
    icon: adjustIcon(props, 'biaodanlei-tongyongqingchu'),
    okCancel: false,
  });
  return confirm(props, Dialog);
};

Dialog.confirm = (props) => {
  assign(props, {
    icon: adjustIcon(props, 'jinggao-full'),
    okCancel: true,
  });
  return confirm(props, Dialog);
};
