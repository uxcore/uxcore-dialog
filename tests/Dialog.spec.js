import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { assign } from 'lodash';
import TestUtils, { Simulate } from 'react-addons-test-utils';
import { mount } from 'enzyme';
import $ from 'jquery';
import Dialog from '../src';
import Button from 'uxcore-button';

const appendElementToDOM = (id) => {
  const div = document.createElement('div');
  div.id = id;
  document.body.appendChild(div);
};

const cleanElements = () => {
  $('#test-dialog').remove();
  $('.kuma-dlg-wrap').remove();
}


class BasicDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
  }
  show() {
    this.setState({
      visible: true,
    });
  }
  render() {
    return (
      <div>
          <Button onClick={this.show.bind(this)}>显示对话框</Button>
          <Dialog
            title="第一个 Dialog"
            visible={this.state.visible}
            onOk={() => {
              this.setState({
                visible: false,
              });
            }}
            onCancel={() => {
              this.setState({
                visible: false,
              });
            }}
          >
              <p className="test-content-dialog">对话框的内容</p>
              <p className="test-content-dialog">对话框的内容</p>
              <p className="test-content-dialog">对话框的内容</p>
          </Dialog>
      </div>
    );
  }
}

const getDialog = (options = {}) => {
  const opts = assign({
    className: 'our-dialog',
    wrapClassName: 'wrapper',
    onOk: () => {},
    locale: 'zh-cn',
    onCancel: () => {},
    width: 600,
    transitionName: 'threeFallV',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
    closable: true,
    maskClosable: false,
    prefixCls: 'test',
    title: undefined,
    htmlClassName: '',
  }, options);
  return mount(React.createElement(Dialog, opts));
};

describe('Dialog', () => {
  describe('Constructor Test', () => {
    const w = getDialog();
    it('should get the initialized state and props', () => {
      expect(w.state('confirmLoading')).to.be(false);
    });
  });

  describe('Render Function Test', () => {
    it('should correctly render the title', () => {
      const j = getDialog({ title: 'hello' });
      expect(j.prop('className')).to.contain('our-dialog');
    });

    it('should get the onClose prop', (done) => {
      const onClose = () => done();
      const dialog = getDialog({ title: 'hello', onCancel: onClose });
      dialog.component.props.props.onCancel();
    });

    it('should get the visible prop', (done) => {
      appendElementToDOM('test-dialog');
      setTimeout(() => {
        expect($('.kuma-button-primary').length).to.be(2);
        expect($('.kuma-dlg-title').eq(0).text()).to.be('第一个 Dialog');
        expect($('.test-content-dialog').length).to.be(3);
        cleanElements();
        done();
      }, 100);
      ReactDOM.render(
        <BasicDemo visible />, document.getElementById('test-dialog'));
    });

    it('should get the visible dialog', (done) => {
      appendElementToDOM('test-dialog');
      setTimeout(() => {
        expect($('.kuma-button-primary').length).to.be(1);
        expect($('.test-content-dialog').length).to.be(0);
        cleanElements();
        done();
      }, 100);
      ReactDOM.render(
        <BasicDemo visible={false} />, document.getElementById('test-dialog'));
    });
  });

  describe('Dialog Helper Method Test', () => {
    it('Dialog.info', (done) => {
      Dialog.info({
        title: 'hello',
        onOk: () => {},
        onCancel: () => {},
        width: 220,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('hello');
        cleanElements();
        done();
      }, 100);
    });

    it('Dialog.success', (done) => {
      Dialog.success({
        title: 'success',
        onOk: () => {},
        onCancel: () => {},
        width: 230,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('success');
        cleanElements();
        done();
      }, 100);
    });

    it('Dialog.error', (done) => {
      Dialog.error({
        title: 'error',
        onOk: () => {},
        onCancel: () => {},
        width: 240,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('error');
        cleanElements();
        done();
      }, 100);
    });

    it('Dialog.confirm', (done) => {
      Dialog.confirm({
        title: 'confirm',
        onOk: () => {},
        onCancel: () => {},
        width: 250,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('confirm');
        cleanElements();
        done();
      }, 100);
    });
  });
});
