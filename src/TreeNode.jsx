var React = require('react'),
  TreeNodeMixin = require('./TreeNodeMixin'),
  noop = require('lodash/utility/noop');

/**
 * Individual nodes in tree hierarchy, nested under a single <TreeMenu/> node
 *
 *
 * @type {TreeNode}
 */
var TreeNode = React.createClass({

  mixins : [TreeNodeMixin],

  propTypes : {

    stateful: React.PropTypes.bool,
    checkbox: React.PropTypes.bool,
    collapsible : React.PropTypes.bool,
    collapsed : React.PropTypes.bool,
    expandIconClass: React.PropTypes.string,
    collapseIconClass: React.PropTypes.string,
    checked: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    classNamePrefix: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onCheckChange: React.PropTypes.func,
    onCollapseChange: React.PropTypes.func

  },

  getInitialState: function () {
    return {};
  },

  getDefaultProps: function () {
    return {
      stateful: false,
      collapsible: true,
      collapsed: false,
      checkbox : false,
      onClick: function(lineage) {
        console.log("Tree Node clicked: " + lineage.join(" > "));
      },
      onCheckChange: function (lineage) {
        console.log("Tree Node indicating a checkbox should change: " + lineage.join(" > "));
      },
      onCollapseChange: function (lineage) {
        console.log("Tree Node indicating collapse state should change: " + lineage.join(" > "));
      },
      checked : false,
      expandIconClass: "",
      collapseIconClass: ""
    }
  },

  render : function () {

    var props = this.props,
      collapseNode = null,
      rootClass = this._getRootCssClass();

    if (props.collapsible) {
      var collapseClassName = rootClass + "-collapse-toggle ";
      var collapseToggleHandler = this._handleCollapseChange;
      if (!props.children || props.children.length === 0) {
        collapseToggleHandler = noop;
        collapseClassName += "collapse-spacer";
      } else {
        collapseClassName += (this._isCollapsed() ? props.expandIconClass : props.collapseIconClass);
      }
      collapseNode = <span onClick={collapseToggleHandler} className={collapseClassName}></span>
    }

    return (
      <div className={rootClass}>
        {collapseNode}
        {this._getLabelNode()}
        {this._getChildrenNode()}
      </div>);

  },

  _getRootCssClass: function () {
    return this.props.classNamePrefix + "-node";
  },

  _getChildrenNode: function () {

    var props = this.props;

    if (this._isCollapsed()) return null;

    return (
      <div className={this._getRootCssClass() + "-children"}>
          {props.children}
      </div>
    );

  },

  _getLabelNode: function () {

    var props = this.props,
      labelNode = <label className={props.classNamePrefix + "-node-label"}>{props.label}</label>;

    return (
      <span onClick={this._handleClick}>
        {this._getCheckboxNode()}
        {labelNode}
      </span>
    );
  },

  _getCheckboxNode: function () {
    var props = this.props;
    if (!props.checkbox) return null;

    return <input
      className={props.classNamePrefix + "-node-checkbox"}
      type="checkbox"
      checked={this._isChecked()}
      onChange={noop}/>;
  },

  _isStateful: function () {

    return this.props.stateful ? true : false;

  },

  _isChecked: function () {

    if (this._isStateful() && this.state.checked) return true;
    return this.props.checked;

  },

  _isCollapsed: function () {

    if (!this.props.collapsible) return false;
    if (this._isStateful() && this.state.collapsed) return true;
    return this.props.collapsed;

  },

  _handleClick: function () {
    if (this.props.checkbox) {
      return this._handleCheckChange();
    }

    this.props.onClick(this._getLineage());

  },

  _toggleNodeStateIfStateful: function (field) {
    if (this._isStateful()) {
      var newValue = !this.props[field];
      if (typeof this.state[field] !== "undefined") {
        newValue = !this.state[field];
      }
      var mutation = {};
      mutation[field] = newValue;
      this.setState(mutation);
    }

  },

  _handleCheckChange: function () {

    this._toggleNodeStateIfStateful("checked");

    this.props.onCheckChange(this._getLineage());

  },

  _handleCollapseChange: function () {

    this._toggleNodeStateIfStateful("collapsed");

    this.props.onCollapseChange(this._getLineage());

  },

  _getLineage: function () {

    return this.props.ancestor.concat(this.props.id);

  }

});


module.exports = TreeNode;