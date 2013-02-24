TOML.DocumentParser.String = {
  interpret: function() {
    return eval(this.textValue);
  }
};

