import Dialog from '../src/index';
import React from 'react';
let confirm = Dialog.confirm;

export class BasicDemo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			hasTitle: true
		};
	}
	showModal() {
		this.setState({
		  visible: true
		});
	}
	handleOk() {
		console.log('点击了确定');
		this.setState({
		  visible: false
		});
	}
	handleCancel() {
		this.setState({
		  visible: false
		});
	}
	toggleTitle(e){
		this.setState({
		  hasTitle: e.target.checked
		});
	}
	render(){
		let title;
		if (this.state.hasTitle) {
			title = 'title';
		} else {
			title = false;
		}
		return (
			<div>
				<label><input type="checkbox" name="hasTitle" defaultChecked={this.state.hasTitle} onClick={this.toggleTitle.bind(this)} /> 显示title</label><br />
				<button className="kuma-button" onClick={this.showModal.bind(this)}>显示对话框</button>
				<Dialog title={title}
					visible={this.state.visible}
					onOk={this.handleOk.bind(this)}
					onCancel={this.handleCancel.bind(this)}>
					<p>对话框的内容</p>
					<p>对话框的内容</p>
					<p>对话框的内容</p>
				</Dialog>
			</div>
		);
	}
}

export class AsyncCloseDemo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			ModalText: '对话框的内容',
			visible: false
		};
  	}
	showModal() {
		this.setState({
		  visible: true
		});
	}
	handleOk() {
		this.setState({
			ModalText: '对话框将在两秒后关闭'
		});
		setTimeout(() => {
		  this.setState({
		    visible: false
		  });
		}, 2000);
	}
	handleCancel() {
		console.log('点击了取消');
		this.setState({
			visible: false
		});
	}
	render() {
		return (<div>
			<button className="kuma-button" onClick={this.showModal.bind(this)}>显示对话框</button>
			<Dialog title="对话框标题"
				visible={this.state.visible}
				onOk={this.handleOk.bind(this)}
				onCancel={this.handleCancel.bind(this)}>
				<p>{this.state.ModalText}</p>
			</Dialog>
	  	</div>);
	}
}

export class CustomFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
      		visible: false
    	};
  	}
	showModal() {
		this.setState({
			visible: true
		});
	}
	handleOk() {
		this.setState({ loading: true });
		setTimeout(() => {
		  this.setState({ loading: false, visible: false });
		}, 3000);
	}
	handleCancel() {
		this.setState({ visible: false });
	}
	render() {
		return <div>
			<button className="kuma-button" onClick={this.showModal.bind(this)}>
			显示对话框
			</button>
			<Dialog ref="modal"
				visible={this.state.visible}
				title="对话框标题" onOk={this.handleOk} onCancel={this.handleCancel.bind(this)}
				footer={[
					<button key="back" className="kuma-button kuma-button-secondary" onClick={this.handleCancel.bind(this)}>返 回</button>,
					<button key="submit" className={'kuma-button ' + (this.state.loading ? 'kuma-button-loading': '')} onClick={this.handleOk.bind(this)}>
					提 交
					</button>
				]}>
				<p>对话框的内容</p>
				<p>对话框的内容</p>
				<p>对话框的内容</p>
				<p>对话框的内容</p>
				<p>对话框的内容</p>
			</Dialog>
		</div>;
	}
}

function showConfirm(){
  confirm({
    title: '您是否确认要删除这项内容',
    content: '一些解释',
    onOk: function() {
      alert('确定');
    },
    onCancel: function() {}
  });
}

export class ConfirmDemo extends React.Component {
	render(){
		return (<button className="kuma-button" onClick={showConfirm.bind(this)}>
			  确认对话框
		  </button>);
	}
}

function info() {
  Dialog.info({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息',
    onOk: function() {}
  });
}

function success() {
  Dialog.success({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

function error() {
  Dialog.error({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

export class InfoDemo extends React.Component {
	render(){
		return (<div>
		  <button className="kuma-button kuma-button-secondary" onClick={info}>信息提示</button>
		  <button className="kuma-button kuma-button-secondary" onClick={success}>成功提示</button>
		  <button className="kuma-button kuma-button-secondary" onClick={error}>失败提示</button>
		</div>);
	}
}
