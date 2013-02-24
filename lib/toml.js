var TOML = {
  parse: function(document) {
    var tree = TOML.DocumentParser.parse(document);
    if (!tree) throw TOML.DocumentParser.lastError;
    return tree.interpret();
  }
};

if (typeof window !== 'undefined') {
  window.TOML = TOML;
} else if (typeof exports === 'object') {
  exports.parse = TOML.parse;
  exports = undefined;
}

