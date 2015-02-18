## React Tree Menu Component

A stateless tree component with the following features:

* Checkboxes
* Collapsible nodes
* Dynamic tree generation
* Declarative tree menus

## Please check out the demo.

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



