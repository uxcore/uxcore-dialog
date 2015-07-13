/**
 * @author: vincent
 * @date: 15/5/19
 */
import React from 'react';
import RcDialog from 'rc-dialog';
import assign from 'object-assign';

class Dialog extends RcDialog {
    constructor(props) {
        super(props);
    }
}
Dialog.displayName = 'uxcore-dialog';
Dialog.defaultProps = assign(RcDialog.defaultProps, {
    prefixCls: 'kuma-dialog'
});

export default Dialog;
