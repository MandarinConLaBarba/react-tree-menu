var React = require('react/addons'),
  TreeNode = require('./TreeNode.jsx'),
  TreeNodeFactory = React.createFactory(TreeNode),
  TreeNodeMixin = require('./TreeNodeMixin');

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

  _getTreeNodes: function() {
    
    var props = this.props;

    //invariant(!props.children || !props.data, "Either children or data props are expected in TreeMenu, but not both");

    if (props.children) {
      return this.getTreeChildren();
    }

    function dataToNodes(data) {

      return data.map(function(dataForNode) {
        var nodeProps = {
          label : dataForNode.label
        };

        if (dataForNode.children) {
          nodeProps.children = dataToNodes(dataForNode.children);
        }

        return TreeNodeFactory(nodeProps);

      });

    }

    if (props.data) {
      return dataToNodes(props.data);
    }

  }

});


module.exports = TreeMenu;