TOML.DocumentParser.Document = {
  interpret: function() {
    var document = {}, groupName, values, i, j, m, n;
    for (i = 0, n = this.elements.length; i < n; i++) {
      groupName = this.elements[i].header.key_name;
      values = this.elements[i].values.elements;
      for (j = 0, m = values.length; j < m; j++) {
        this.assign(document, groupName, values[j]);
      }
    }
    return document;
  },

  assign: function(document, group, value) {
    var key  = (group ? group.textValue.split('.') : []).concat(value.name.textValue),
        full = key.slice(),
        last = key.pop(),
        next;

    for (var i = 0, n = key.length; i < n; i++) {
      next = key[i];
      if (typeof document[next] === 'undefined') {
        document[next] = {};
        document = document[next];
      } else if (typeof document[next] === 'object' && !(document[next] instanceof Array)) {
        document = document[next];
      } else {
        throw new Error('Duplicate key: ' + key.slice(0, i).join('.'));
      }
    }
    if (typeof document[last] !== 'undefined')
      throw new Error('Duplicate key: ' = full.join('.'));

    document[last] = value.value.interpret();
  }
};

