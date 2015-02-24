## React Tree Menu Component

A stateless tree component with the following features:

* Checkboxes
* Collapsible nodes
* Dynamic tree generation
* Declarative tree menus
* Built with the Flux proposal in mind (i.e. trickle-down state)

## Please check out the [Demo](http://mandarinconlabarba.github.io/react-tree-menu/example/index.html).

## Install

```
npm install --save react-tree-menu
```

## General Usage

```

var TreeMenu = require('react-tree-menu').TreeMenu,
    TreeNode = require('react-tree-menu').TreeNode;

    ...

    <TreeMenu/>
    <TreeMenu>
        <TreeNode/>
    </TreeMenu>

```

## Exports

This package exports the following:

```
module.exports = {
  TreeMenu: require('./src/TreeMenu.jsx'),
  TreeNode: require('./src/TreeNode.jsx'),
  Utils: require('./src/TreeMenuUtils')
};

```

## Declarative use

In your `.render()` method, embed `TreeMenu`:

```jsx

      return <TreeMenu
        identifier={"id"}
        onTreeNodeClick={this._setLastActionState.bind(this, "clicked")}
        onTreeNodeCheckChange={this._setLastActionState.bind(this, "checked")}
        collapsible={false}
        expandIconClass="fa fa-chevron-right"
        collapseIconClass="fa fa-chevron-down">
        <TreeNode label="Option 1" id="option_1"/>
        <TreeNode label="Option 2" collapsible={false} id="option_2">
          <TreeNode label="Option A" checkbox={true} id="option_2.a"/>
          <TreeNode label="Option B" checkbox={true} id="option_2.b"/>
        </TreeNode>
        <TreeNode label="Option 3" id="option_3"/>
        <TreeNode label="Option 4" id="option_4"/>
      </TreeMenu>;

```


## Dynamic use w/ the 'data' prop

In your `.render()` method, embed `TreeMenu` with a `data` prop:

```jsx

var data = [{
             label : "Option 1"
           },
           {
             label : "Option 2",
             children : [
               {
                 checkbox: true,
                 label: "Sub Option A",
                 children: [
                   {
                     label: "Third Level Nest Option 1",
                     checkbox : true
                   },
                   {
                     label: "Third Level Nest Option 2",
                     checkbox : true
                   }
                 ]
               },
               {
                 checkbox: true,
                 label: "Sub Option B"
               }
             ]
           }];

      return <TreeMenu
        onTreeNodeClick={...}
        onTreeNodeCollapseChange={...}
        onTreeNodeCheckChange={...}
        data={data} />;

```

## `<TreeMenu/>` Style Guide

To style `<TreeMenu/>`, use the following props:

* [classNamePrefix](#classnameprefixstring)
* [expandIconClass](#expandiconclassstring)
* [collapseIconClass](#collapseiconclassstring)

See the [example CSS](example/tree-view.css) for how this works.

## `<TreeMenu/>` Props

### `stateful={<Boolean>}`

If you need it, you can make `<TreeMenu/`> keep track of its own state. That being said, `react-tree-menu` was designed to
fit inside Flux architecture, which encourages components to render based on props passed from the Controller-View. Defaults to false.

### `classNamePrefix={<String>}`

The prefix to put in front of all the CSS classes for nested element (like the container for the menu, the checkbox, etc)

### `identifier={<String>}`

Optional prop/field to use for the node identifier. Defaults to Array index

### `collapsible={<Boolean>}`

Whether or not nested <TreeNode/> components are collapsible. Defaults to true.

### `expandIconClass={<String>}`

The CSS class to give the expand icon component. Empty by default.

### `collapseIconClass={<String>}`

The CSS class to give the collapse icon component. Empty by default

### `onTreeNodeClick={<Function>}`

Function handler for click event on <TreeNode /> components. See [Callback API](#callback-api-for-treemenu-event-handler-props). Defaults to noop.

### `onTreeNodeCollapseChange={<Function>}`

Function handler for collapse change event on <TreeNode /> components. See [Callback API](#callback-api-for-treemenu-event-handler-props). Defaults to noop.

### `onTreeNodeCheckChange={<Function>}`

Function handler for checkbox change event on <TreeNode /> components. See [Callback API](#callback-api-for-treemenu-event-handler-props). Defaults to noop.

### `data={<Array>}`

The data to use when building <TreeNode/> components dynamically. Required if there aren't any nested `<TreeNode/>` elements declared.

Sample format:

```

    [{label : "Option 1"},
     {
      label : "Option 2",
      children : [
        {
         checkbox: true,
         label: "Sub Option A",
         children: [{
                     label: "Third Level Nest Option 1",
                     checkbox : true,
                     children : {...},
                   }]
               },
        {
         checkbox: true,
         label: "Sub Option B"
        }]}]

```

## Callback API for `<TreeMenu/>` event handler props

`<TreeMenu/>` callbacks will receive an array representation of the node. Example:

```

    var onClick = function(node) {

        //node is in format: [<topLevelId>, [...<nodeId>,] <nodeId>]
        //where <nodeId> is the <TreeNode/> that sourced the event
        //...
    }

    return <TreeMenu onTreeNodeClick={onClick} />;

```


## `<TreeNode />` Props

### `label={<String>}`

The node label. Required.

### `checkbox={<Boolean>}`

Whether or not the node has a checkbox. Defaults to false. If the node checkbox={true}, clicking on the label also fires the `onTreeNodeCheckChange` function

### `checked={<Boolean>}`

If the node has a checkbox, whether or not the node is checked. If the node checkbox={true}, clicking on the label also fires the `onTreeNodeCheckChange`
function instead od the `onTreeNodeClick` function

### `collapsible={<Boolean>}`

Whether or not the node is collapsible. If the node has no children, this value has no effect. Defaults to true.
This value is overridden by the `collapsible` prop value set on the root `<TreeMenu/>`

### `collapsed={<Boolean>}`

If the node is collapsible, whether or not the node is collapsed. Defaults to false.






