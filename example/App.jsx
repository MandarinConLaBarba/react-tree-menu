var React = require('react'),
  TreeMenu = require('../src/TreeMenu.jsx'),
  TreeNode = require('../src/TreeNode.jsx');

var App = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return <div>
      <TreeMenu>
        <TreeNode label="Option 1"/>
        <TreeNode label="Option 2">
          <TreeNode label="Option A" checkbox={true} />
          <TreeNode label="Option B" checkbox={true} />
        </TreeNode>
        <TreeNode label="Option 3"/>
        <TreeNode label="Option 4"/>
      </TreeMenu>
    </div>;

  }
});


module.exports = App;