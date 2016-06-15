import React from 'React';
import PanelRightItem from './PanelRightItem';

class PanelRight extends React.Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {
    this.handleReset();
  }

  componentWillReceiveProps() {
    this.handleReset();
  }

  handleReset() {
    this.setState({
      name: '',
      item: {},
      buttonText: 'Add'
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEdit(item) {
    this.setState({
      name: item.name,
      item: item,
      buttonText: 'Save'
    });
  }

  handleDelete() {
    if(confirm('Delete ' + this.props.listState.currentList.name + '?')) {
      this.props.onDeleteList(this.props.listState.currentList);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.name.length) {
      this.props.onAdd(this.state.name, this.state.item);

      this.handleReset();
    }
  }

  getItems() {
    let listItems = this.props.listState.currentList.items;

    if(listItems.length) {
      listItems.sort(function (a, b) {
        if (a.done && !b.done) {
          return 1;
        }

        return 0;
      });

      return listItems.map((item) => {
        return (
          <PanelRightItem
            item={item}
            listState={this.props.listState}
            key={item.id}
            onDone={this.props.onDone}
            onDelete={this.props.onDelete}
            onEdit={this.handleEdit}
          />
        );
      });
    } else {
      return (
        <p>There are no items here.<br /> You can add an item by using the input field above.</p>
      );
    }
  }

  render() {
    let items = this.getItems();

    return (
      <div className="pull-right col-sm-8 panel-right">
        <div className="panel panel-info">
          <div className="panel-heading">
            {this.props.listState.currentList.name}
            <a href="#" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>
          </div>
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="col-sm-12 col-input-to-do">
                  <input type="text" className="form-control" id="listName" value={this.state.name} onChange={this.handleNameChange} placeholder="Add a to-do" />
                  <input type="submit" className="btn btn-success btn-xs btn-add-to-do" value={this.state.buttonText} />
                </div>
              </div>
            </form>
            <ul className="list-group form-inline">
              {items}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PanelRight;
