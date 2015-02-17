var React = require('react/addons'),
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
        {this.getTreeChildren()}
      </div>);

  }

});


module.exports = TreeMenu;