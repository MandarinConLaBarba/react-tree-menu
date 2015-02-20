var React = require('react'),
  TreeNode = require('./TreeNode.jsx'),
  TreeNodeFactory = React.createFactory(TreeNode),
  TreeNodeMixin = require('./TreeNodeMixin'),
  clone = require('lodash/lang/clone'),
  omit = require('lodash/object/omit'),
  invariant = require('react/lib/invariant'),
  assign = require('object-assign');

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
    collapsible: React.PropTypes.bool,
    expandIconClass: React.PropTypes.string,
    collapseIconClass: React.PropTypes.string,
    data: React.PropTypes.array
    //TODO: make sure children are of TreeNode type?

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
      <div className={props.classNamePrefix + "-root"}>
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

    var self = this;
    return children.map(function (child) {

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

      return data.map(function(dataForNode, i) {

        var nodeProps = omit(dataForNode, ["children", "onClick", "onCheckChange"]),
          children = [];

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