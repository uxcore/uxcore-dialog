/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import RcDialog from 'rc-dialog';
import confirm from './confirm';
import Button from 'uxcore-button';
import i18n from './i18n';

function noop() {
}

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            visible: this.props.visible
        };
    }

    handleCancel() {
        this.props.onCancel();
    }

    handleOk() {
        this.props.onOk();
    }

    render() {
        let props = this.props;
        let locale = i18n[props.locale];
        let defaultFooter = [
            <Button key="confirm"
                type="primary"
                size="medium"
                loading={props.confirmLoading}
                onClick={this.handleOk.bind(this)}>
                {locale['ok']}
            </Button>,
            <Button key="cancel"
                type="secondary"
                size="medium"
                onClick={this.handleCancel.bind(this)}>
                {locale['cancel']}
            </Button>
        ];
        let footer = props.footer || defaultFooter;
        return <RcDialog onClose={this.handleCancel.bind(this)} footer={footer} {...props}
          visible={props.visible} />;
    }
}

Dialog.defaultProps = {
    prefixCls: 'kuma-dlg',
    onOk: noop,
    locale: 'zh-cn',
    onCancel: noop,
    width: 520,
    transitionName: '',
    maskAnimation: false,
    confirmLoading: false,
    visible: false
};

Dialog.info = function(props) {
  props.iconClassName = 'kuma-icon-information';
  props.okCancel = false;
  return confirm(props);
};

Dialog.success = function(props) {
  props.iconClassName = 'kuma-icon-success';
  props.okCancel = false;
  return confirm(props);
};

Dialog.error = function(props) {
  props.iconClassName = 'kuma-icon-error';
  props.okCancel = false;
  return confirm(props);
};

Dialog.confirm = function(props) {
  props.okCancel = true;
  return confirm(props);
};
