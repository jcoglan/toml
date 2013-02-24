TOML.DocumentParser.Boolean = {
  interpret: function() {
    return this.textValue === 'true';
  }
};

