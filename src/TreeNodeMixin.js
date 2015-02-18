var React = require('react/addons');

var TreeNodeMixin = {

  _getTreeNodeProps: function (rootProps, ancestor, isRootNode, childIndex) {

    return {
      classNamePrefix: rootProps.classNamePrefix,
      ancestor: ancestor,
      onClick: rootProps.onTreeNodeClick,
      onCheckChange: rootProps.onTreeNodeCheckChange,
      id: childIndex,
      key: "tree-node-" + ancestor.join(".") + childIndex
    };

  }
};


module.exports = TreeNodeMixin;