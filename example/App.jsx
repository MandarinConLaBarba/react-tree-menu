var React = require('react'),
  TreeMenu = require('../src/TreeMenu.jsx'),
  TreeNode = require('../src/TreeNode.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      dynamicTreeData: [
        {
          label : "Option 1"
        },
        {
          label : "Option 2",
          children : [
            {
              checkbox: true,
              label: "Sub Option A",
              children: [
                {
                  label: "Third Level Nest Option 1",
                  checkbox : true
                },
                {
                  label: "Third Level Nest Option 2",
                  checkbox : true
                }
              ]
            },
            {
              checkbox: true,
              label: "Sub Option B"
            }
          ]
        }
      ]
    };
  },

  render: function() {
    return <div>

      {this._getStaticTreeExample()}

      {this._getDynamicTreeExample()}

    </div>;

  },

  _getStaticTreeExample: function () {

    return <div>
      <h2>Tree Menu 1</h2>
      <TreeMenu
        onTreeNodeClick={this._handleTreeNodeClick}
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down">
        <TreeNode label="Option 1"/>
        <TreeNode label="Option 2">
          <TreeNode label="Option A" checkbox={true} />
          <TreeNode label="Option B" checkbox={true} />
        </TreeNode>
        <TreeNode label="Option 3"/>
        <TreeNode label="Option 4"/>
      </TreeMenu>
    </div>;
  },

  _getDynamicTreeExample: function () {

    return <div>
      <h2>Tree Menu 2</h2>
      <TreeMenu
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down"
        onTreeNodeClick={this._handleTreeNodeClick}
        onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange.bind(this, "collapsed")}
        onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange.bind(this, "checked")}
        data={this.state.dynamicTreeData} />
    </div>;

  },

  _handleTreeNodeClick : function (lineage) {
    console.log("App Handler: " + lineage.join(" > "));
  },

  _handleDynamicTreeNodePropChange: function (propName, lineage) {

    //TODO: figure out how to use immutable API here..

    var thisComponent = this;

    function setPropState(node, value) {
      node[propName] = value;
      var children = node.children;
      if (children) {
        node.children.forEach(function (childNode, ci) {
          setPropState(childNode, value);
        });
      }
    }

    function getUpdatedTreeState(state) {
      state = state || thisComponent.state.dynamicTreeData;
      var id = lineage.shift();
      state.forEach(function (node, i) {
        if (i === id) {
          if (!lineage.length) {
            setPropState(state[i], !state[i][propName]);
          } else {
            state[i].children = getUpdatedTreeState(state[i].children);
          }
        }
      });

      return state;

    }

    this.setState(getUpdatedTreeState());

  }
});


module.exports = App;