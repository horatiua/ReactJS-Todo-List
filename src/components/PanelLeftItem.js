import React from 'React';

class PanelLeftItem extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    event.stopPropagation();

    this.props.handleEdit(this.props.item);
  }

  handleClick() {
    this.props.onClick(this.props.item);
  }

  render() {
    let activeItem = this.props.listState.currentListId == this.props.item.id;

    return (
      <a href="#" className={'list-group-item ' + (activeItem ? 'active' : '')} onClick={this.handleClick}>
        {this.props.item.name}
        <span className={'glyphicon glyphicon-edit pull-right ' + (activeItem ? '' : 'hide')} onClick={this.handleEdit}></span>
      </a>
    );
  }
}

export default PanelLeftItem;
