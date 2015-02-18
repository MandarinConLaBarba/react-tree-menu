var React = require('react/addons'),
  TreeNode = require('./TreeNode.jsx'),
  TreeNodeFactory = React.createFactory(TreeNode),
  TreeNodeMixin = require('./TreeNodeMixin'),
  omit = require('lodash/object/omit'),
  invariant = require('react/lib/invariant'),
  assign = require('object-assign'),
  clone = require('lodash/lang/clone');

var TreeMenu = React.createClass({

  mixins : [TreeNodeMixin],

  propTypes : {

    classNamePrefix: React.PropTypes.string,
    stateful: React.PropTypes.bool
    //TODO: make sure children are of TreeNode type?

  },

  getDefaultProps: function () {
    return {
      classNamePrefix: "tree-view"
    }
  },

  render : function () {

    var props = this.props;

    return (
      <div className={props.classNamePrefix + "-root"}>
        {this._getTreeNodes()}
      </div>);

  },

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

  _getTreeNodes: function() {
    
    var props = this.props,
      treeData;

    invariant(!props.children || !props.data, "Either children or data props are expected in TreeMenu, but not both");

    if (props.children) {
      treeData = this._getDataFromChildren(props.children);
    } else {
      treeData = props.data;
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
          children = dataToNodes(dataForNode.children, ancestor.concat(i));
        }

        nodeProps = assign(nodeProps, thisComponent._getTreeNodeProps(props, ancestor, isRootNode, i));

        return TreeNodeFactory(nodeProps, children);

      });

    }

    if (treeData) {
      return dataToNodes(treeData);
    }

  }

});


module.exports = TreeMenu;