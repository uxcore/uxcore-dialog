/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import RcDialog from 'rc-dialog';
import { Dom } from 'rc-util';
import confirm from './confirm';
import Button from 'uxcore-button';

function noop() {
}

let mousePosition;
let mousePositionEventBinded;

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
        this.setState({
            confirmLoading: true
        });
        this.props.onOk();
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            let newState = {
                visible: nextProps.visible
            };
            // 隐藏后去除按钮 loading 效果
            if (!nextProps.visible) {
                newState.confirmLoading = false;
            }
            this.setState(newState);
        }
    }

    componentDidMount() {
        if (mousePositionEventBinded) {
          return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        Dom.addEventListener(document.body, 'click', function onDocumentMousemove(e) {
          mousePosition = {
            x: e.pageX,
            y: e.pageY
          };
          // 20ms 内发生过点击事件，则从点击位置动画展示
          // 否则直接 zoom 展示
          // 这样可以兼容非点击方式展开
          setTimeout(() => mousePosition = null, 20);
        });
        mousePositionEventBinded = true;
    }

    render() {
        let loadingClass = this.state.confirmLoading ? ' kuma-btn-loading' : '';
        let props = this.props;
        let defaultFooter = [
            <Button key="confirm" onClick={this.handleOk.bind(this)}>确 定</Button>,
            <Button key="cancel" type="secondary" onClick={this.handleCancel.bind(this)}>取 消</Button>
        ];
        let footer = props.footer || defaultFooter;
        let visible = this.state.visible;
        return <RcDialog onClose={this.handleCancel.bind(this)} footer={footer} {...props}
            visible={visible} mousePosition={mousePosition} />;
    }
}

Dialog.defaultProps = {
    prefixCls: 'kuma-dlg',
    onOk: noop,
    onCancel: noop,
    width: 520,
    transitionName: false,
    maskAnimation: false
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
