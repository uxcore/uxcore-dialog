/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import Popup from '../../uxcore-popup/index';
import domAlign from 'dom-align';

function noop(){}

let __pos = {};

class Dialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible : props.visible,
            isDragging  : false,
            position: {}
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
    _onHandleDragStart(e){
        let dialog = this.dialog = React.findDOMNode(this.refs.dialog.refs.popup);
        this.setState({
            isDragging: true
        });
        console.log('dragstart', {
            x: e.clientX,
            y: e.clientY
        }, dialog.style);
        this.originPos = {
            x: parseInt(dialog.style.left, 10),
            y: parseInt(dialog.style.top, 10)
        };
        this.originOffset = {
            x: e.clientX,
            y: e.clientY
        };

        this.handleDrag = this._onHandleDrag.bind(this);

        window.addEventListener('mousemove', this.handleDrag, true);
    }
    _onHandleDragEnd(e){
        window.removeEventListener('mousemove', this.handleDrag, true);

        this.setState({
            isDragging: false,
            style: {
                left: this.originPos.x + e.clientX - this.originOffset.x,
                top: this.originPos.y + e.clientY - this.originOffset.y
            }
        });
    }
    _onHandleDrag(e){
        this.setState({
            style: {
                left: this.originPos.x + e.clientX - this.originOffset.x,
                top: this.originPos.y + e.clientY - this.originOffset.y
            }
        });
    }
    render(){
        console.log(this)
        var state = this.state;
        var props = this.props;
        var outerStyle = {
            display: state.visible ? 'block': 'none'
        };
        var properties = {
            jsxcls: 'uxcore-dialog',
            ref: 'dialog',
            jsxvisible: state.visible,
            jsxwidth: props.jsxwidth,
            jsxheight: props.jsxheight,
            jsxpositionAdjust: !props.jsxdraggable
            //draggable: props.jsxdraggable
        };
        if (state.isDragging) {
            properties.jsxcls += ' dragging'
        }
        if (props.jsxdraggable) {
            properties.onMouseDown = this._onHandleDragStart.bind(this);
            properties.onMouseUp = this._onHandleDragEnd.bind(this);
        }
        if (state.style) {
            properties.style = state.style;
        }
        var confirmBtn, cancelBtn, overlay;
        if (props.jsxconfirm) {
            confirmBtn = <button onClick={this._onConfirm.bind(this)}>{typeof props.jsxconfirm === 'string' ? props.jsxconfirm: 'confirm'}</button>;
        }
        if (props.jsxcancel) {
            cancelBtn = <button onClick={this._onCancel.bind(this)}>{typeof props.jsxcancel === 'string' ? props.jsxcancel: 'cancel'}</button>;
        }
        if (props.jsxoverlay) {
            overlay = <div className={this._createClsName('overlay')}></div>;
        }
        return (
            <div style={outerStyle}>
                <Popup {...properties}>
                    <div className={this._createClsName('content')}>
                        <div className={this._createClsName('header')}>
                            <div className={this._createClsName('title')} >{props.jsxtitle}</div>
                            <div className={this._createClsName('close')} onClick={this._onClose.bind(this)}>x</div>
                        </div>
                        <div className={this._createClsName('body')}>{props.children}</div>
                        {cancelBtn}
                        {confirmBtn}
                    </div>
                </Popup>
                {overlay}
            </div>
        );
    }
}
Dialog.displayName = 'uxcore-dialog';
Dialog.propTypes = {
    jsxwidth        : React.PropTypes.number,
    jsxheight       : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    jsxclsPrefix    : React.PropTypes.string,
    jsxtitle        : React.PropTypes.string,
    jsxvisible      : React.PropTypes.bool,
    jsxcancel       : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    jsxconfirm      : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    jsxoverlay      : React.PropTypes.bool,
    jsxdraggable    : React.PropTypes.bool,
    onBeforeClose   : React.PropTypes.func,
    onClose         : React.PropTypes.func,
    onShow          : React.PropTypes.func
};
Dialog.defaultProps = {
    jsxwidth        : 400,
    jsxheight       : 'auto',
    jsxclsPrefix    : 'uxcore-dialog',
    jsxtitle        : 'title',
    jsxvisible      : false,
    jsxcancel       : true,
    jsxconfirm      : true,
    jsxoverlay      : true,
    jsxdraggable    : false,
    onBeforeClose   : noop,
    onClose         : noop,
    onShow          : noop
};

export default Dialog;