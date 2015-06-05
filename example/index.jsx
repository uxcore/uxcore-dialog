/**
 * @author: vincent
 * @date: 15/5/19
 */
import Dialog from '../index.js';
import '../style/dialog.less';

class MyControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            jsxconfirm: true,
            jsxcancel: true,
            jsxoverlay: true,
            jsxdraggable: true
        };
    }
    handleTrigger(){
        this.setState({
            visible: true
        });
    }
    handleClose(){
        this.setState({
            visible: false
        });
    }
    handleChange(e){
        var state = {};
        state[e.target.value] = e.target.checked;
        this.setState(state)
    }
    render() {
        var _this = this;
        var state = this.state;
        var properties = {
            jsxvisible: state.visible,
            jsxconfirm: state.jsxconfirm,
            jsxcancel: state.jsxcancel,
            jsxoverlay: state.jsxoverlay,
            jsxdraggable: state.jsxdraggable,
            onClose(){
                _this.setState({
                    visible: false
                })
            }
        };
        return (
            <div>
                {Object.keys(state).map((v) => {
                    if (v !== 'visible') {
                        return <label><input type="checkbox" onChange={this.handleChange.bind(this)} value={v} checked={state[v]} />{v}</label>
                    }
                }, this)}
                <br/>
                <button onClick={this.handleTrigger.bind(this)}>show dialog</button>
                <button onClick={this.handleClose.bind(this)}>close dialog</button>
                <Dialog {...properties}>
                    <h3>content</h3>
                    <ul>
                        <li>example1</li>
                        <li>example2</li>
                        <li>example3</li>
                    </ul>
                </Dialog>
            </div>
        )
    }
}

React.render(
    <MyControl></MyControl>
    , document.getElementById('content'));