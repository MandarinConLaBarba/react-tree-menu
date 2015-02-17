var React = require('react'),
  TreeNodeMixin = require('./TreeNodeMixin');

var TreeMenu = React.createClass({

  mixins : [TreeNodeMixin],

  propTypes : {

    checkbox: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    label: React.PropTypes.string,
    classNamePrefix: React.PropTypes.string,
    toggleable: React.PropTypes.bool

  },

  getDefaultProps: function () {
    return {
      checkbox : false
    }
  },

  render : function () {

    var props = this.props;

    return (
      <div className={props.classNamePrefix + "-node"}>
        {this._getLabelNode()}
        {this.getTreeChildren()}
      </div>);

  },

  _getLabelNode: function () {

    var props = this.props,
      labelNode = <label className={props.classNamePrefix + "-node-label"}>{props.label}</label>;
    if (!props.checkbox) {
      return labelNode;
    }

    return (
      <span>
        <input
          className={props.classNamePrefix + "-node-checkbox"}
          type="checkbox"
          checked={props.checked} />
        {labelNode}
      </span>
    );
  }

});


module.exports = TreeMenu;