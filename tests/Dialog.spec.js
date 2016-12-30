import expect from 'expect.js';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { assign } from 'lodash';
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
      const j = getDialog({ title: 'hello', htmlClassName: 'kuma-test-diag' });
      j.node.componentWillUpdate(j.node.props);
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

    it('should correctly close the dialog', (done) => {
      appendElementToDOM('test-dialog');
      class DialogDemo extends Component {

        constructor(props) {
          super(props);
          this.state = {
            visible: true,
          };
        }

        handleOk() {
          this.setState({ visible: false });
        }

        render() {
          return (
            <Dialog
              key={Math.random().toString()}
              title="test title"
              onOk={this.handleOk.bind(this)}
              visible={this.state.visible}
            >
              <p>哦嗨哟！</p>
            </Dialog>
          );
        }
      }
      ReactDOM.render(
        <DialogDemo />, document.getElementById('test-dialog'));
      setTimeout(() => {
        expect($('.kuma-dlg-body p').text()).to.be('哦嗨哟！');
        $('.kuma-dlg-footer .kuma-button-primary').click();
        setTimeout(() => {
          expect($('.kuma-dlg-body p').length).to.be(0);
          done();
        }, 1000);
      }, 100);
    });

    it('should correctly close the dialog with cancel', (done) => {
      appendElementToDOM('test-dialog');
      class DialogDemo extends Component {

        constructor(props) {
          super(props);
          this.state = {
            visible: true,
          };
        }

        handleOk() {
          this.setState({ visible: false });
        }

        handleCancel() {
          this.setState({ visible: false });
        }

        render() {
          return (
            <Dialog
              key={Math.random().toString()}
              title="test title"
              onOk={this.handleOk.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              visible={this.state.visible}
            >
              <p>哦嗨哟！</p>
            </Dialog>
          );
        }
      }
      ReactDOM.render(
        <DialogDemo />, document.getElementById('test-dialog'));
      setTimeout(() => {
        expect($('.kuma-dlg-body p').text()).to.be('哦嗨哟！');
        $('.kuma-dlg-footer .kuma-button-secondary').click();
        setTimeout(() => {
          expect($('.kuma-dlg-body p').length).to.be(0);
          done();
        }, 1000);
      }, 100);
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
      let test = '';
      Dialog.error({
        title: 'error',
        onOk: () => { test = 'ok'; },
        onCancel: () => {},
        width: 240,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('error');
        $('.kuma-confirm-action button').click();
        setTimeout(() => {
          expect($('.kuma-confirm-title').length).to.be(0);
          cleanElements();
          done();
        }, 1000);
      }, 100);
    });

    it('Dialog.confirm', (done) => {
      let test = '';
      Dialog.confirm({
        title: 'confirm',
        onOk: () => {},
        onCancel: () => { test = 'cancel'; },
        htmlClassName: 'testClassName',
        width: 250,
      });
      setTimeout(() => {
        expect($('.kuma-dlg-wrap .kuma-confirm-title').text()).to.be('confirm');
        $('.kuma-button-secondary').click();
        setTimeout(() => {
          expect($('.kuma-confirm-title').length).to.be(0);
          cleanElements();
          done();
        }, 1000);
      }, 100);
    });
  });
});
