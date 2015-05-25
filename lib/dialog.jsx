/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import Popup from '../../uxcore-popup/index';
import '../style/dialog.less';

function noop(){}

class Dialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: props.visible
        }
    }
    _onClose(){
        this.close();
    }
    _onCancel(){
        this.close();
    }
    _onConfirm(){
        this.close();
    }
    componentDidMount(){
        if (this.state.visible) {
            this.props.onShow();
        }
    }
    componentWillReceiveProps(props){
        if (this.state.visible !== props.jsxvisible) {
            if (props.jsxvisible) {
                this.show();
            } else {
                this.close();
            }
        }
    }
    show(){
        var props = this.props;
        this.setState({
            visible: true
        }, ()=> {
            props.onShow();
        });
    }
    close(){
        var props = this.props;
        if (props.onBeforeClose(this) !== false) {
            this.setState({
                visible: false
            }, () => {
                props.onClose();
            });
        }
    }

    _createClsName(name){
        return `${this.props.jsxclsPrefix}-${name}`;
    }

    render(){
        var state = this.state;
        console.log(state, this.props);
        var content = [];
        var outerStyle = {
            display: state.visible ? 'block': 'none'
        };
        var overlayStyle = {
            display: this.props.jsxoverlay? 'block': 'none'
        };
        content.push(
            <div style={outerStyle}>
                <Popup jsxvisible={state.visible} jsxwidth={400} jsxcls='uxcore-dialog'>
                    <div className={this._createClsName('content')}>
                        <div className={this._createClsName('header')}>
                            <div className={this._createClsName('title')}>title</div>
                            <div className={this._createClsName('close')} onClick={this._onClose.bind(this)}>x</div>
                        </div>
                        <div className={this._createClsName('body')}>body</div>
                        <button onClick={this._onCancel.bind(this)}>cancel</button>
                        <button onClick={this._onConfirm.bind(this)}>confirm</button>
                    </div>
                </Popup>
                <div className={this._createClsName('overlay')} style={overlayStyle}></div>
            </div>
        );
        return content[0];
    }
}
Dialog.displayName = 'uxcore-dialog';
Dialog.defaultProps = {
    jsxclsPrefix: 'uxcore-dialog',
    jsxvisible: false,
    cancelBtn: true,
    confirmBtn: true,
    onBeforeClose: noop,
    onClose: noop,
    onShow: noop,
    jsxoverlay: true
};

export default Dialog;