/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import Popup from '../../uxcore-popup/index';

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
    render(){
        var state = this.state;
        console.log(state, this.props)
        return (
            <Popup jsxvisible={state.visible} jsxwidth={400}>
                <div className={'content'}>
                    <div className={'header'}>
                        <div className={'title'}>title</div>
                        <div className={'close'} onClick={this._onClose.bind(this)}>x</div>
                    </div>
                    <div className={'body'}>body</div>
                    <button onClick={this._onCancel.bind(this)}>cancel</button>
                    <button onClick={this._onConfirm.bind(this)}>confirm</button>
                </div>
            </Popup>
        );
    }
}
Dialog.displayName = 'uxcore-dialog';
Dialog.defaultProps = {
    jsxvisible: false,
    cancelBtn: true,
    confirmBtn: true,
    onBeforeClose: noop,
    onClose: noop,
    onShow: noop
};

export default Dialog;