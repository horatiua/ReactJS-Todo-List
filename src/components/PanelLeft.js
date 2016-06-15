import React from 'React';
import PanelLeftItem from './PanelLeftItem';

class PanelLeft extends React.Component {
  constructor() {
    super();

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    this.props.handleAdd({});
  }

  getItems() {
    if(this.props.listState.lists.length) {
      return this.props.listState.lists.map((item) => {
        return (
          <PanelLeftItem
            listState={this.props.listState}
            item={item}
            key={item.id}
            onClick={this.props.onClick}
            handleEdit={this.props.handleEdit}
          />
        );
      });
    } else {
      return (
        <p>There are no lists here.<br /> You can add a list by pressing the <span className="glyphicon glyphicon-plus-sign"></span> button above.</p>
      );
    }
  }

  render() {
    let listItems = this.getItems();

    return (
      <div className="pull-left col-sm-4">
        <div className="panel panel-success">
          <div className="panel-heading">
            Your to-do lists
            <a href="#" onClick={this.handleAdd}><span className="glyphicon glyphicon-plus-sign pull-right"></span></a>
          </div>
          <div className="panel-body">
            <div className="list-group">
              {listItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PanelLeft;
