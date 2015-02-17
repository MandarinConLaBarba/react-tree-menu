var React = require('react/addons');

var TreeNodeMixin = {

  getTreeChildren : function () {
    var props = this.props;

    if (props.children) {
      return React.Children.map(props.children, function (child) {
        return React.addons.cloneWithProps(child, {
          classNamePrefix : props.classNamePrefix
        });
      });
    }

    //TODO: support a object/hash structure..
  }
};


module.exports = TreeNodeMixin;