global.jQuery = require('jquery.1');
require('bootstrap');
require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('styles/App.less');

import React from 'react';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import ModalAddList from './ModalAddList';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      lists: [
        {
          id: 1,
          name: 'Groceries',
          items: [
            {
              id: 1,
              name: 'Cheese',
              done: false
            }, {
              id: 2,
              name: 'Eggs',
              done: false
            }, {
              id: 3,
              name: 'Carrots',
              done: true
            }, {
              id: 4,
              name: 'Tomatos',
              done: false
            }
          ]
        }, {
          id: 2,
          name: 'Weekend trip to mountains',
          items: [
            {
              id: 1,
              name: 'Sunglasses',
              done: true
            }, {
              id: 2,
              name: 'Food',
              done: true
            }, {
              id: 3,
              name: 'Water',
              done: true
            }, {
              id: 4,
              name: 'Tent',
              done: true
            }
          ]
        }, {
          id: 3,
          name: 'Christmas presents',
          items: []
        }
      ]
    };

    this.selectList = this.selectList.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);

    this.showModalAddList = this.showModalAddList.bind(this);
    this.handleAddList = this.handleAddList.bind(this);

    this.handleAddListItem = this.handleAddListItem.bind(this);
  }

  componentWillMount() {
    if(!this.state.currentListId) {
      this.setState({
        currentListId: this.state.lists[0].id,
        currentList: this.state.lists[0]
      });
    }
  }

  selectList(list) {
    for(let i in this.state.lists) {
      if (this.state.lists[i].id == list.id) {
        this.setState({
          currentListId: list.id,
          currentList: this.state.lists[i]
        });
      }
    }
  }

  handleAddListItem(name, oldItem) {
    let currentList = this.state.currentList,
        items = this.state.currentList.items;

    if(Object.keys(oldItem).length) {
      oldItem.name = name;

      for(let i in items) {
        if(items[i].id == oldItem.id) {
          items[i] = oldItem;
        }
      }
    } else {
      let item = {
        id: Date.now(),
        name: name,
        done: false
      }

      items.push(item);
    }

    currentList.items = items;

    this.setState({
      currentList: currentList
    });
  }

  handleDone(item) {
    let currentList = this.state.currentList;

    for(let i in currentList.items) {
      if(currentList.items[i].id == item.id) {
        currentList.items[i].done = !currentList.items[i].done;

        this.setState({currentList: currentList});
      }
    }
  }

  handleDeleteListItem(item) {
    let currentList = this.state.currentList;

    for(let i in currentList.items) {
      if(currentList.items[i].id == item.id) {
        currentList.items.splice(i, 1);

        this.setState({currentList: currentList});
      }
    }
  }

  showModalAddList(list) {
    this.setState({
      editList: list
    });

    jQuery('#modalAddList').modal('show');
  }

  handleAddList(listName, oldList) {
    let lists = this.state.lists,
        list;

    if(Object.keys(oldList).length) {
      list = oldList;
      list.name = listName;

      for(let i in lists) {
        if (lists[i].id == list.id) {
          lists[i] = list;
        }
      }
    } else {
      list = {
        id: Date.now(),
        name: listName,
        items: []
      };

      lists.push(list);
    }

    this.setState({
      lists: lists,
      currentListId: list.id,
      currentList: list
    });

    jQuery('#modalAddList').modal('hide');
  }

  handleDeleteList(list) {
    let lists = this.state.lists;

    for(let i in lists) {
      if(list.id == lists[i].id) {
        lists.splice(i ,1);
        this.setState({
          lists: lists,
        });

        if(lists.length) {
          this.setState({
            currentListId: lists[0].id,
            currentList: lists[0]
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="index">
        <div className="page-header col-sm-12">
          <h1>Wunderlist demo</h1>
        </div>
        <PanelLeft
          listState={this.state}
          onClick={this.selectList}
          handleAdd={this.showModalAddList}
          handleEdit={this.showModalAddList}
        />
        <PanelRight
          listState={this.state}
          onAdd={this.handleAddListItem}
          onDone={this.handleDone}
          onDelete={this.handleDeleteListItem}
          onDeleteList={this.handleDeleteList}
        />
        <div className="clearfix"></div>
        <ModalAddList
          handleAddList={this.handleAddList}
          editList={this.state.editList}
        />
      </div>
    );
    /*<img src={yeomanImage} alt="Yeoman Generator" />*/
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
