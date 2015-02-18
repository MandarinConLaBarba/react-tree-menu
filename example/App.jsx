var React = require('react'),
  TreeMenu = require('../src/TreeMenu.jsx'),
  TreeNode = require('../src/TreeNode.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
      lastAction: null,
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

    var lastActionNode = <div>Interact with the tree views on the left..</div>;

    if (this.state.lastAction) {
      lastActionNode = (
        <div>
          Received event <strong>{this.state.lastAction.event}</strong> for node <strong>{this.state.lastAction.node}</strong>!
        </div>);
    }
    return <div className="container">

      <div className="row">
        <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-12">
              {this._getStaticTreeExample()}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this._getDynamicTreeExample()}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row" style={{marginTop : 100}}>
            <div className="alert alert-success tree-event-alert">
              {lastActionNode}
            </div>
          </div>
        </div>

      </div>



    </div>;

  },

  _getStaticTreeExample: function () {

    return <div>
      <h2>Tree Menu 1</h2>
      <TreeMenu
        identifier={"id"}
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked")}
        onTreeNodeCheckChange={this._setLastActionState.bind(this, "checked")}
        collapsible={false}
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down">
        <TreeNode label="Option 1" id="option_1"/>
        <TreeNode label="Option 2" collapsible={false} id="option_2">
          <TreeNode label="Option A" checkbox={true} id="option_2.a"/>
          <TreeNode label="Option B" checkbox={true} id="option_2.b"/>
        </TreeNode>
        <TreeNode label="Option 3" id="option_3"/>
        <TreeNode label="Option 4" id="option_4"/>
      </TreeMenu>
    </div>;
  },

  _getDynamicTreeExample: function () {

    return <div>
      <h2>Tree Menu 2</h2>
      <TreeMenu
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down"
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked")}
        onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange.bind(this, "collapsed")}
        onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange.bind(this, "checked")}
        data={this.state.dynamicTreeData} />
    </div>;

  },

  _handleDynamicTreeNodePropChange: function (propName, lineage) {

    //TODO: figure out how to use immutable API here..

    this._setLastActionState(propName, lineage);

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

  },

  _setLastActionState: function (action, node) {
    console.log("Controller View received tree menu " + action + " action: " + node.join(" > "));
    this.setState({
      lastAction: {
        event: action,
        node: node.join(" > ")
      }
    })
  }
});


module.exports = App;