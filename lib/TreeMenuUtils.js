
var TreeMenuUtils = {

  /**
   * //TODO: use immutable API here..this function mutates!
   *
   * @param lineage
   * @param prevState
   * @param mutatedProperty
   * @param identifier optional
   * @returns {*}
   */
  getNewTreeState: function (lineage, prevState, mutatedProperty, identifier) {

    function setPropState(node, value) {
      node[mutatedProperty] = value;
      var children = node.children;
      if (children) {
        node.children.forEach(function (childNode, ci) {
          setPropState(childNode, value);
        });
      }
    }

    function getUpdatedTreeState(state) {
      state = state || prevState;
      var id = lineage.shift();
      state.forEach(function (node, i) {
        var nodeId = identifier ? state[i][identifier] : i;
        if (nodeId === id) {
          if (!lineage.length) {
            setPropState(state[i], !state[i][mutatedProperty]);
          } else {
            state[i].children = getUpdatedTreeState(state[i].children);
          }
        }
      });

      return state;
    }

    return getUpdatedTreeState();
  }

};

module.exports = TreeMenuUtils;