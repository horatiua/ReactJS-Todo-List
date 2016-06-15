import React from 'React';

class ModalAddList extends React.Component {
  constructor() {
    super();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.handleClose();
  }

  componentWillReceiveProps(nextProps) {
    this.handleClose();

    if(nextProps.editList && Object.keys(nextProps.editList).length) {
      this.setState({
        name: nextProps.editList.name,
        buttonText: 'Save'
      });
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.name.length) {
      this.props.handleAddList(this.state.name, this.props.editList);
      this.handleClose();
    } else {
      this.setState({
        error: true
      });
    }
  }

  handleClose() {
    this.setState({
      error: false,
      name: '',
      buttonText: 'Add'
    });
  }

  render() {
    return (
      <div className="modal fade" id="modalAddList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Add list</h4>
            </div>
            <div className="modal-body">
              <div className={"alert alert-danger " + (this.state.error ? '' : 'hide')}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                Please insert a list name!
              </div>
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="listName" value={this.state.name} onChange={this.handleNameChange} />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>{this.state.buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAddList;
