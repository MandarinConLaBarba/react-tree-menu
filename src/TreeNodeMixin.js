var React = require('react/addons');

var TreeNodeMixin = {

  _getTreeNodeProps: function (rootProps, props, ancestor, isRootNode, childIndex) {

    //TODO: use omit/pick to clean this up

    return {
      classNamePrefix: rootProps.classNamePrefix,
      collapseIconClass: rootProps.collapseIconClass,
      expandIconClass: rootProps.expandIconClass,
      collapsible: rootProps.collapsible,
      ancestor: ancestor,
      onClick: rootProps.onTreeNodeClick,
      onCheckChange: rootProps.onTreeNodeCheckChange,
      onCollapseChange: rootProps.onTreeNodeCollapseChange,
      id: this.getNodeId(rootProps, props, childIndex),
      key: "tree-node-" + ancestor.join(".") + childIndex
    };

  },

  getNodeId: function (rootProps, props, childIndex) {
    return rootProps.identifier && props[rootProps.identifier] ? props[rootProps.identifier] : childIndex;
  }
};


module.exports = TreeNodeMixin;