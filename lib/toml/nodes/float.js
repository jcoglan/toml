TOML.DocumentParser.Float = {
  interpret: function() {
    return eval(this.textValue);
  }
};

