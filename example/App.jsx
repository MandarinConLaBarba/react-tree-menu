var React = require('react'),
  TreeMenu = require('../index').TreeMenu,
  TreeNode = require('../index').TreeNode,
  TreeMenuUtils = require('../index').Utils;

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
              {this._getDynamicTreeExample()}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this._getStaticTreeExample()}
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
      <h2>Tree Menu (Declarative)</h2>
      <ul>
        <li>This menu is built w/ nested TreeNode components</li>
        <li>It <u>is not</u> bound to state, so clicking on TreeNode components doesn't mutate UI state.</li>
        <li>It has collapsible=false, so no expand/collapse icons show</li>
        <li>It has identifier="id", so it uses the 'id' prop when emitting events</li>
      </ul>
      <div className="panel panel-default">
        <div className="panel-heading">Declarative Menu</div>
        <div className="panel-body">
          <TreeMenu
            identifier="id"
            onTreeNodeClick={this._setLastActionState.bind(this, "clicked")}
            onTreeNodeCheckChange={this._setLastActionState.bind(this, "checkChanged")}
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
        </div>
      </div>

    </div>;
  },

  _getDynamicTreeExample: function () {

    return <div>
      <h2>Tree Menu (Dynamic)</h2>
      <ul>
        <li>This menu is built dynamically using the data prop</li>
        <li>It <u>is</u> bound to state, so clicking on TreeNode components does mutate UI state.</li>
        <li>It is collapsible (the default), so expand/collapse icons show</li>
        <li>It has no identifier prop for the TreeMenu, so it uses the array index when emitting events</li>
      </ul>
      <div className="panel panel-default">
        <div className="panel-heading">Dynamic Menu</div>
        <div className="panel-body">
          <TreeMenu
            expandIconClass="fa fa-chevron-right"
            collapseIconClass="fa fa-chevron-down"
            onTreeNodeClick={this._setLastActionState.bind(this, "clicked")}
            onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange.bind(this, "collapsed")}
            onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange.bind(this, "checked")}
            data={this.state.dynamicTreeData} />
        </div>
      </div>
    </div>;

  },

  _handleDynamicTreeNodePropChange: function (propName, lineage) {

    this._setLastActionState(propName, lineage);

    this.setState(TreeMenuUtils.getNewTreeState(lineage, this.state.dynamicTreeData, propName));

  },

  _setLastActionState: function (action, node) {

    var toggleEvents = ["collapse", "checked"];

    if (toggleEvents.indexOf(action) >= 0) {
      action += "Changed";
    }

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