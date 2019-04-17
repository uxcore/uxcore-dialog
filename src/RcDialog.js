import RcDialog from 'rc-dialog';

const defaultGetContainer = () => document.body;

class NewDialog extends RcDialog {
  constructor(props) {
    super(props);
    const { getContainer } = props;
    if (document) {
      /* eslint-disable no-underscore-dangle */
      this._container = getContainer ? getContainer() : defaultGetContainer();
      /* eslint-enable no-underscore-dangle */
    }
  }
}

export default NewDialog;
