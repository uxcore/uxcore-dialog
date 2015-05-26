/**
 * @author: vincent
 * @date: 15/5/19
 */
import Dialog from '../index.js';

class MyControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
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
    render() {
        return (
            <div>
                <button onClick={this.handleTrigger.bind(this)}>show dialog</button>
                <button onClick={this.handleClose.bind(this)}>close dialog</button>
                <Dialog
                    jsxvisible={this.state.visible}
                    >
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