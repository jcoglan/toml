TOML.DocumentParser.Integer = {
  interpret: function() {
    return eval(this.textValue);
  }
};

