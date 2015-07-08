/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import RcDialog from 'rc-dialog';
import assign from 'object-assign'; 

class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        let props = this.props;
        return (
            <RcDialog {...props}>
                {props.children}
            </RcDialog>
        );
    }
}
Dialog.displayName = 'uxcore-dialog';
Dialog.defaultProps = assign(RcDialog.defaultProps, {
    prefixCls: 'kuma-dialog'
});

export default Dialog;