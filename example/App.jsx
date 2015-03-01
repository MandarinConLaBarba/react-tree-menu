var React = require('react/addons'),
  TreeMenu = require('../index').TreeMenu,
  TreeNode = require('../index').TreeNode,
  TreeMenuUtils = require('../index').Utils,
  Immutable = require('immutable'),
  _ = require('lodash');

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
                  label: "Third Level Option 1",
                  checkbox : true
                },
                {
                  label: "Third Level Option 2",
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
      ],
      dynamicTreeDataMap: {
        "Option 1" : {
          checked: true,
          checkbox: true,
          children: {
            "Sub Option 1" : {
              checked: false
            },
            "Sub Option 2" : {
              checked: false,
              checkbox: true,
              children: {
                "Sub-Sub Option 1" : {
                  checked: false,
                  checkbox: true
                },
                "Sub-Sub Option 2" : {
                  checked: false,
                  checkbox: true
                }
              }
            }
          }
        },
        "Option 2" : {
          checked: false,
          checkbox: true
        }
      }

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
        <div className="col-lg-12 hero">
          <h3>Check out the code for this demo <a href="https://github.com/MandarinConLaBarba/react-tree-menu/blob/master/example/App.jsx">here</a>.</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <h2>Dynamic (Array)</h2>
          <ul>
            <li>This menu is built dynamically using the data prop (array)</li>
            <li>It is collapsible (the default), so expand/collapse icons show</li>
            <li>It has no identifier prop for the TreeMenu, so it uses the array index when emitting events</li>
          </ul>
        </div>

        <div className="col-lg-3">
          <h2>Declarative</h2>
          <ul>
            <li>This menu is built w/ nested TreeNode components</li>
            <li>It has collapsible=false, so no expand/collapse icons show</li>
            <li>It has identifier="id", so it uses the 'id' prop when emitting events</li>
          </ul>
        </div>

        <div className="col-lg-3">
          <h2>{"Unbound: Won't Update UI State"}</h2>
          <ul>
            <li>This menu doesn't have any handlers applied that update UI state, so it's static.</li>
          </ul>
        </div>

        <div className="col-lg-3">
          <h2>{"Stateful, manages its own UI state"}</h2>
          <ul>
            <li>This menu has stateful=true, so it manages its own state w/o help from the Controller-View.</li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          {this._getExamplePanel("Dynamic", this._getDynamicTreeExample())}
        </div>

        <div className="col-lg-3">
          {this._getExamplePanel("Declarative", this._getDeclarativeTreeExample())}
        </div>

        <div className="col-lg-3">
          {this._getExamplePanel("Unbound", this._getUnboundTreeExample())}
        </div>

        <div className="col-lg-3">
          {this._getExamplePanel("Stateful", this._getStatefulTreeExample())}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("1")}
          </CSSTransitionGroup>
        </div>

        <div className="col-lg-3">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("2")}
          </CSSTransitionGroup>

        </div>

        <div className="col-lg-3">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("3")}
          </CSSTransitionGroup>
        </div>

        <div className="col-lg-3">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("4")}
          </CSSTransitionGroup>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <h2>Dynamic (Object)</h2>
          <ul>
            <li>This menu is built dynamically using the data prop (object)</li>
            <li>It is collapsible (the default), so expand/collapse icons show</li>
            <li>It has no identifier prop for the TreeMenu, so it uses the object key when emitting events</li>
          </ul>
        </div>

      </div>

      <div className="row">
        <div className="col-lg-3">
          {this._getExamplePanel("Dynamic (Map Data)", this._getDynamicTreeExample2())}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <CSSTransitionGroup transitionName="last-action" transitionLeave={false}>
            {this._getLastActionNode("5")}
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
          <h3><code>{"<TreeNode/>"}</code> Affected: </h3>
          <div><strong>{action.node}</strong></div>
        </div>);
    }

    return lastActionNode;

  },

  _getStatefulTreeExample: function () {

    return (
      <TreeMenu
        identifier="id"
        stateful={true}
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "4")}
        onTreeNodeCollapseChange={this._setLastActionState.bind(this, "collapsed", "4")}
        onTreeNodeCheckChange={this._setLastActionState.bind(this, "checked", "4")}
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down">
        <TreeNode label="Option 1" checkbox={true} id="option_1"/>
        <TreeNode label="Option 2" checkbox={true} id="option_2">
          <TreeNode label="Option A" checkbox={true} id="option_2.a"/>
          <TreeNode label="Option B" checkbox={true} id="option_2.b">
            <TreeNode label="Option B.x" checkbox={true} id="option_2.b.x"/>
            <TreeNode label="Option B.y" checkbox={true} id="option_2.b.y"/>
          </TreeNode>
        </TreeNode>
      </TreeMenu>
    );
  },

  _getUnboundTreeExample: function () {

    return (
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
        <TreeNode label="Option 3" checkbox={true} id="option_3"/>
      </TreeMenu>
    );
  },

  _getDeclarativeTreeExample: function () {

    return (
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
    );
  },

  _getDynamicTreeExample: function () {

    return  (
      <TreeMenu
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down"
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "1")}
        onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange.bind(this, "collapsed")}
        onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange.bind(this, "checked")}
        data={this.state.dynamicTreeData} />
    );

  },

  _getDynamicTreeExample2: function () {

    return  (
      <TreeMenu
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down"
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "5")}
        onTreeNodeCollapseChange={this._handleDynamicTreeNodePropChange2.bind(this, "collapsed")}
        onTreeNodeCheckChange={this._handleDynamicTreeNodePropChange2.bind(this, "checked")}
        data={this.state.dynamicTreeDataMap} />
    );

  },

  _getExamplePanel: function (title, treeMenuNode) {
    return <div>
      <div className="panel panel-default">
        <div className="panel-heading">{title + " Menu"}</div>
        <div className="panel-body">
          {treeMenuNode}
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


  _handleDynamicTreeNodePropChange2: function (propName, lineage) {

    this._setLastActionState(propName, "5", lineage);

    function getNodePath(nodeKey) {

      if (nodeKey.length === 1) return nodeKey;

      return _(nodeKey).zip(nodeKey.map(function () {
        return "children";
      })).flatten().initial().value();

    }

    function syncChildren(immutableState, prop, state) {
      var childKeyPath = nodePath.concat('children');

      var children = immutableState.getIn(childKeyPath);

      if (!children || children.size === 0) return immutableState;

      var newChildren = children.map(function (val) {
        return val.set(prop, state);
      });

      return immutableState.setIn(childKeyPath, newChildren);
    }

    var nodePath = getNodePath(lineage),
      keyPath = nodePath.concat([propName]);

    var newState =
      Immutable.fromJS(this.state.dynamicTreeDataMap).updateIn(keyPath, function (value) {
        return !value;
      });

    newState = syncChildren(newState, propName, newState.getIn(keyPath));

    this.setState({
      dynamicTreeDataMap: newState.toJS()
    });

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