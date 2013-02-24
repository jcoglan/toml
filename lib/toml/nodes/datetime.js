TOML.DocumentParser.Datetime = {
  interpret: function() {
    return new Date(this.textValue);
  }
};

