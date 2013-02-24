TOML.DocumentParser.Array = {
  interpret: function() {
    if (!this.head) return [];

    var array = [this.head.interpret()];

    for (var i = 0, n = this.tail.elements.length; i < n; i++)
      array.push(this.tail.elements[i].value.interpret());

    return array;
  }
};

