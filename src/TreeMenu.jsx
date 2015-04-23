var React = require('react'),
  TreeNode = require('./TreeNode.jsx'),
  TreeNodeFactory = React.createFactory(TreeNode),
  TreeNodeMixin = require('./TreeNodeMixin'),
  clone = require('lodash/lang/clone'),
  omit = require('lodash/object/omit'),
  invariant = require('react/lib/invariant'),
  assign = require('object-assign'),
  map = require('lodash/collection/map');

/**
 * The root component for a tree view. Can have one or many <TreeNode/> children
 *
 * @type {TreeMenu}
 */
var TreeMenu = React.createClass({

  mixins : [TreeNodeMixin],

  propTypes : {

    stateful: React.PropTypes.bool,
    classNamePrefix: React.PropTypes.string,
    identifier: React.PropTypes.string,
    onTreeNodeClick: React.PropTypes.func,
    onTreeNodeCheckChange: React.PropTypes.func,
    onTreeNodeSelectChange: React.PropTypes.func,
    collapsible: React.PropTypes.bool,
    expandIconClass: React.PropTypes.string,
    collapseIconClass: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    labelFilter: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      classNamePrefix: "tree-view",
      stateful: false
    }
  },

  render : function () {

    var props = this.props;

    return (
      <div className={props.classNamePrefix}>
        {this._getTreeNodes()}
      </div>);

  },

  /**
   * Gets data from declarative TreeMenu nodes
   *
   * @param children
   * @returns {*}
   * @private
   */
  _getDataFromChildren: function (children) {

    var iterableChildren = Array.isArray(children) ? children : [children];

    var self = this;
    return iterableChildren.map(function (child) {

      var data = clone(omit(child.props, "children"));

      if (child.props.children) {
        data.children = self._getDataFromChildren(child.props.children);
      }

      return data;
    });
  },

  /**
   * Get TreeNode instances for render()
   *
   * @returns {*}
   * @private
   */
  _getTreeNodes: function() {
    
    var treeMenuProps = this.props,
      treeData;

    invariant(!treeMenuProps.children || !treeMenuProps.data,
      "Either children or data props are expected in TreeMenu, but not both");

    if (treeMenuProps.children) {
      treeData = this._getDataFromChildren(treeMenuProps.children);
    } else {
      treeData = treeMenuProps.data;
    }

    var thisComponent = this;

    function dataToNodes(data, ancestor) {

      var isRootNode = false;
      if (!ancestor) {
        isRootNode = true;
        ancestor = [];
      }

      return map(data, function(dataForNode, i) {

        var nodeProps = omit(dataForNode, ["children", "onClick", "onCheckChange"]),
          children = [];

        nodeProps.label = nodeProps.label || i;

        if (dataForNode.children) {
          children = dataToNodes(dataForNode.children, ancestor.concat(thisComponent.getNodeId(treeMenuProps, nodeProps, i)));
        }

        nodeProps = assign(nodeProps, thisComponent.getTreeNodeProps(treeMenuProps, nodeProps, ancestor, isRootNode, i));

        return TreeNodeFactory(nodeProps, children);

      });

    }

    if (treeData) {
      return dataToNodes(treeData);
    }

  }

});


module.exports = TreeMenu;