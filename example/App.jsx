var React = require('react/addons'),
  TreeMenu = require('../index').TreeMenu,
  TreeNode = require('../index').TreeNode,
  TreeMenuUtils = require('../index').Utils;

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var App = React.createClass({

  getInitialState: function() {
    return {
      lastAction1: null,
      lastAction2: null,
      lastAction3: null,
      staticTreeData: {
        "option_2.a" : {
          checked: false
        },
        "option_2.b" : {
          checked: false
        }
      },
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

    return <div className="container">

      <div className="row">
        <div className="col-lg-12 hero">
          <h1><code>{"<TreeMenu/>"}</code></h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          {this._getDynamicTreeExample()}
        </div>

        <div className="col-lg-4">
          {this._getDeclarativeTreeExample()}
        </div>

        <div className="col-lg-4">
          {this._getUnboundTreeExample()}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("1")}
          </CSSTransitionGroup>
        </div>

        <div className="col-lg-4">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("2")}
          </CSSTransitionGroup>

        </div>

        <div className="col-lg-4">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("3")}
          </CSSTransitionGroup>
        </div>
      </div>

    </div>;

  },

  _getLastActionNode: function (col) {

    var lastActionNode = null,
      key = "lastAction" + col;

    var action = this.state[key];

    if (action) {
      lastActionNode = (
        <div className="text-center alert alert-success tree-event-alert" key={"lastAction_" + col + "_" + action.time}>
          <h3>Event Received:</h3>
          <div><strong>{action.event}</strong></div>
          <h3><code>{"<TreeMenu/>"}</code> Affected: </h3>
          <div><strong>{action.node}</strong></div>
        </div>);
    }

    return lastActionNode;

  },

  _getUnboundTreeExample: function () {

    return <div>
      <h2>Tree Menu (Unbound: Won't Update UI State)</h2>
      <ul>
        <li>This menu doesn't have any handlers applied that update UI state, so it's static.</li>
      </ul>

      <div className="panel panel-default">
        <div className="panel-heading">Unbound Menu</div>
        <div className="panel-body">
          <TreeMenu
            identifier="id"
            onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "3")}
            onTreeNodeCollapseChange={this._setLastActionState.bind(this, "collapsed", "3")}
            onTreeNodeCheckChange={this._setLastActionState.bind(this, "checked", "3")}
            expandIconClass="fa fa-chevron-right"
            collapseIconClass="fa fa-chevron-down">
            <TreeNode label="Option 1" checkbox={true} id="option_1"/>
            <TreeNode label="Option 2" checkbox={true} id="option_2">
              <TreeNode label="Option A" checkbox={true} checked={true} id="option_2.a"/>
              <TreeNode label="Option B" checkbox={true} id="option_2.b"/>
            </TreeNode>
            <TreeNode label="Option 3" checkbox={true} id="option_3"/>
          </TreeMenu>
        </div>
      </div>

    </div>;
  },

  _getDeclarativeTreeExample: function () {

    return <div>
      <h2>Tree Menu (Declarative)</h2>
      <ul>
        <li>This menu is built w/ nested TreeNode components</li>
        <li>It has collapsible=false, so no expand/collapse icons show</li>
        <li>It has identifier="id", so it uses the 'id' prop when emitting events</li>
      </ul>
      <div className="panel panel-default">
        <div className="panel-heading">Declarative Menu</div>
        <div className="panel-body">
          <TreeMenu
            identifier="id"
            onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "2")}
            onTreeNodeCollapseChange={this._handleDeclarativeTreeNodePropChange.bind(this, "collapsed")}
            onTreeNodeCheckChange={this._handleDeclarativeTreeNodePropChange.bind(this, "checked")}
            collapsible={false}
            expandIconClass="fa fa-chevron-right"
            collapseIconClass="fa fa-chevron-down">
            <TreeNode label="Option 1" id="option_1"/>
            <TreeNode label="Option 2" id="option_2">
              <TreeNode label="Option A" checkbox={true} checked={this.state.staticTreeData["option_2.a"].checked} id="option_2.a"/>
              <TreeNode label="Option B" checkbox={true} checked={this.state.staticTreeData["option_2.b"].checked} id="option_2.b"/>
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
        <li>It is collapsible (the default), so expand/collapse icons show</li>
        <li>It has no identifier prop for the TreeMenu, so it uses the array index when emitting events</li>
      </ul>
      <div className="panel panel-default">
        <div className="panel-heading">Dynamic Menu</div>
        <div className="panel-body">
          <TreeMenu
            expandIconClass="fa fa-chevron-right"
            collapseIconClass="fa fa-chevron-down"
            onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "1")}
            onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange.bind(this, "collapsed")}
            onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange.bind(this, "checked")}
            data={this.state.dynamicTreeData} />
        </div>
      </div>
    </div>;

  },

  _handleDeclarativeTreeNodePropChange: function (propName, lineage) {

    this._setLastActionState(propName, "2", lineage);

    var nodeId = lineage.pop();
    
    var treeState = this.state.staticTreeData;
    
    treeState[nodeId][propName] = !treeState[nodeId][propName];
    
    this.setState({
      staticTreeData : treeState
    });
    
  },

  _handleDynamicTreeNodePropChange: function (propName, lineage) {

    this._setLastActionState(propName, "1", lineage);

    this.setState(TreeMenuUtils.getNewTreeState(lineage, this.state.dynamicTreeData, propName));

  },

  _setLastActionState: function (action, col, node) {

    var toggleEvents = ["collapsed", "checked"];

    if (toggleEvents.indexOf(action) >= 0) {
      action += "Changed";
    }

    console.log("Controller View received tree menu " + action + " action: " + node.join(" > "));

    var key = "lastAction" + col;

    var mutation = {};
    mutation[key] = {
      event: action,
      node: node.join(" > "),
      time: new Date().getTime()
    };

    this.setState(mutation)
  }
});


module.exports = App;