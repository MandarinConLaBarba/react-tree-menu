var pick = require('lodash/pick'),
    extend = require('lodash/assign');

var TreeNodeMixin = {

  /**
   * Build the properties necessary for the TreeNode instance
   *
   * @param rootProps
   * @param props
   * @param ancestor
   * @param isRootNode
   * @param childIndex
   * @returns {{classNamePrefix: (*|TreeMenu.propTypes.classNamePrefix|TreeMenu.getDefaultProps.classNamePrefix|TreeNodeMixin._getTreeNodeProps.classNamePrefix), collapseIconClass: (*|TreeMenu.propTypes.collapseIconClass|App._getStaticTreeExample.collapseIconClass|App._getDynamicTreeExample.collapseIconClass|TreeNodeMixin._getTreeNodeProps.collapseIconClass), expandIconClass: (*|TreeMenu.propTypes.expandIconClass|App._getStaticTreeExample.expandIconClass|App._getDynamicTreeExample.expandIconClass|TreeNodeMixin._getTreeNodeProps.expandIconClass), collapsible: (*|TreeMenu.propTypes.collapsible|TreeMenu.getDefaultProps.collapsible|App._getStaticTreeExample.collapsible|TreeNodeMixin._getTreeNodeProps.collapsible), ancestor: *, onClick: (TreeMenu.propTypes.onTreeNodeClick|*|App._getStaticTreeExample.onTreeNodeClick|App._getDynamicTreeExample.onTreeNodeClick), onCheckChange: (TreeMenu.propTypes.onTreeNodeCheckChange|*|App._getStaticTreeExample.onTreeNodeCheckChange|App._getDynamicTreeExample.onTreeNodeCheckChange), onCollapseChange: (App._getDynamicTreeExample.onTreeNodeCollapseChange|*), id: *, key: string}}
   * @private
   */
  getTreeNodeProps: function (rootProps, props, ancestor, isRootNode, childIndex) {

    //TODO: use omit/pick to clean this up

    return extend({
      ancestor: ancestor,
      onClick: rootProps.onTreeNodeClick,
      onCheckChange: rootProps.onTreeNodeCheckChange,
      onSelectChange: rootProps.onTreeNodeSelectChange,
      onCollapseChange: rootProps.onTreeNodeCollapseChange,
      id: this.getNodeId(rootProps, props, childIndex),
      key: "tree-node-" + ancestor.join(".") + childIndex
    }, pick(rootProps, "classNamePrefix", "collapseIconClass", "expandIconClass", "collapsible", "stateful", "labelFilter", "checkboxFactory", "labelFactory"));
  },

  getNodeId: function (rootProps, props, childIndex) {
    return rootProps.identifier && props[rootProps.identifier] ? props[rootProps.identifier] : childIndex;
  }
};

module.exports = TreeNodeMixin;