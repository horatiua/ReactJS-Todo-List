import React from 'React';

class PanelRightItem extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange() {
    return this.props.onDone(this.props.item);
  }

  handleDelete() {
    if(confirm('Delete ' + this.props.item.name + ' ?')) {
      return this.props.onDelete(this.props.item);
    }
  }

  handleEdit() {
    this.props.onEdit(this.props.item);
  }

  render() {
    let completedItem = this.props.item.done;

    return (
      <li className={"list-group-item " + (completedItem ? 'list-group-item-success' : '')}>
        <input type="checkbox" className="pull-left list-checkbox" checked={completedItem} onChange={this.handleChange} />
        {this.props.item.name}
        <a href="#" className={completedItem ? 'hide' : ''} onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>
        <a href="#" className={completedItem ? 'hide' : ''} onClick={this.handleEdit}><span className="glyphicon glyphicon-edit pull-right"></span></a>
      </li>
    );
  }
}

export default PanelRightItem;
