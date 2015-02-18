var React = require('react/addons');

var TreeNodeMixin = {

  _getTreeNodeProps: function (rootProps, ancestor, isRootNode, childIndex) {

    //TODO: use omit/pick to clean this up

    return {
      classNamePrefix: rootProps.classNamePrefix,
      collapseIconClass: rootProps.collapseIconClass,
      expandIconClass: rootProps.expandIconClass,
      ancestor: ancestor,
      onClick: rootProps.onTreeNodeClick,
      onCheckChange: rootProps.onTreeNodeCheckChange,
      onCollapseChange: rootProps.onTreeNodeCollapseChange,
      id: childIndex,
      key: "tree-node-" + ancestor.join(".") + childIndex
    };

  }
};


module.exports = TreeNodeMixin;