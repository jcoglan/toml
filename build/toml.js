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


(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__document: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["document"] = this._nodeCache["document"] || {};
      var cached = this._nodeCache["document"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        address1 = this.__consume__key_group();
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "Document");
        address0 = new klass0(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["document"][index0] = address0;
    },
    __consume__key_group: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["key_group"] = this._nodeCache["key_group"] || {};
      var cached = this._nodeCache["key_group"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__header_line();
      if (address1) {
      } else {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.header = address1;
        var address2 = null;
        var remaining0 = 1, index3 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__value_line();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index3;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.values = address2;
          var address4 = null;
          address4 = this.__consume__ignore();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.ignore = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "KeyGroup");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["key_group"][index0] = address0;
    },
    __consume__header_line: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["header_line"] = this._nodeCache["header_line"] || {};
      var cached = this._nodeCache["header_line"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__ignore();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.ignore = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "[") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("[", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__key_name();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.key_name = address3;
            var address4 = null;
            var slice2 = null;
            if (this._input.length > this._offset) {
              slice2 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice2 = null;
            }
            if (slice2 === "]") {
              var klass1 = this.constructor.SyntaxNode;
              var type1 = null;
              address4 = new klass1("]", this._offset, []);
              if (typeof type1 === "object") {
                extend(address4, type1);
              }
              this._offset += 1;
            } else {
              address4 = null;
              var slice3 = null;
              if (this._input.length > this._offset) {
                slice3 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice3 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
              }
            }
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
              var address5 = null;
              address5 = this.__consume__line_end();
              if (address5) {
                elements0.push(address5);
                text0 += address5.textValue;
                labelled0.line_end = address5;
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = null;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["header_line"][index0] = address0;
    },
    __consume__key_name: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["key_name"] = this._nodeCache["key_name"] || {};
      var cached = this._nodeCache["key_name"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__key_segment();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.key_segment = address1;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          if (slice0 === ".") {
            var klass0 = this.constructor.SyntaxNode;
            var type0 = null;
            address4 = new klass0(".", this._offset, []);
            if (typeof type0 === "object") {
              extend(address4, type0);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            address5 = this.__consume__key_segment();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.key_segment = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(text2, this._offset, elements2, labelled1);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["key_name"][index0] = address0;
    },
    __consume__key_segment: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["key_segment"] = this._nodeCache["key_segment"] || {};
      var cached = this._nodeCache["key_segment"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[^\[\]\.]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address1 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address1, type0);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\\[\\]\\.]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address0 = new klass1(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["key_segment"][index0] = address0;
    },
    __consume__value_line: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["value_line"] = this._nodeCache["value_line"] || {};
      var cached = this._nodeCache["value_line"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__ignore();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.ignore = address1;
        var address2 = null;
        address2 = this.__consume__name();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.name = address2;
          var address3 = null;
          var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            address4 = this.__consume__ws();
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index2;
            var klass0 = this.constructor.SyntaxNode;
            var type0 = null;
            address3 = new klass0(text1, this._offset, elements1);
            if (typeof type0 === "object") {
              extend(address3, type0);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address5 = null;
            var slice0 = null;
            if (this._input.length > this._offset) {
              slice0 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice0 = null;
            }
            if (slice0 === "=") {
              var klass1 = this.constructor.SyntaxNode;
              var type1 = null;
              address5 = new klass1("=", this._offset, []);
              if (typeof type1 === "object") {
                extend(address5, type1);
              }
              this._offset += 1;
            } else {
              address5 = null;
              var slice1 = null;
              if (this._input.length > this._offset) {
                slice1 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice1 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"=\""};
              }
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              var address6 = null;
              var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address7 = true;
              while (address7) {
                address7 = this.__consume__ws();
                if (address7) {
                  elements2.push(address7);
                  text2 += address7.textValue;
                  remaining1 -= 1;
                }
              }
              if (remaining1 <= 0) {
                this._offset = index3;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address6 = new klass2(text2, this._offset, elements2);
                if (typeof type2 === "object") {
                  extend(address6, type2);
                }
                this._offset += text2.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements0.push(address6);
                text0 += address6.textValue;
                var address8 = null;
                address8 = this.__consume__value();
                if (address8) {
                  elements0.push(address8);
                  text0 += address8.textValue;
                  labelled0.value = address8;
                  var address9 = null;
                  address9 = this.__consume__line_end();
                  if (address9) {
                    elements0.push(address9);
                    text0 += address9.textValue;
                    labelled0.line_end = address9;
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["value_line"][index0] = address0;
    },
    __consume__name: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["name"] = this._nodeCache["name"] || {};
      var cached = this._nodeCache["name"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var index2 = this._offset, elements1 = [], labelled0 = {}, text1 = "";
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__ws();
        this._offset = index3;
        if (!(address2)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 0;
        } else {
          address2 = null;
        }
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          var address3 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          var temp0 = slice0;
          if (temp0 === null) {
            address3 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
            }
          } else {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(temp0, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address1 = new klass2(text1, this._offset, elements1, labelled0);
          if (typeof type2 === "object") {
            extend(address1, type2);
          }
          this._offset += text1.length;
        } else {
          address1 = null;
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["name"][index0] = address0;
    },
    __consume__value: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["value"] = this._nodeCache["value"] || {};
      var cached = this._nodeCache["value"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__string();
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__datetime();
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__float();
          if (address0) {
          } else {
            this._offset = index1;
            address0 = this.__consume__integer();
            if (address0) {
            } else {
              this._offset = index1;
              address0 = this.__consume__boolean();
              if (address0) {
              } else {
                this._offset = index1;
                address0 = this.__consume__array();
                if (address0) {
                } else {
                  this._offset = index1;
                }
              }
            }
          }
        }
      }
      return this._nodeCache["value"][index0] = address0;
    },
    __consume__array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["array"] = this._nodeCache["array"] || {};
      var cached = this._nodeCache["array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__empty_array();
      if (address0) {
        var type0 = find(this.constructor, "Array");
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
      } else {
        this._offset = index1;
        address0 = this.__consume__string_array();
        if (address0) {
          var type1 = find(this.constructor, "Array");
          if (typeof type1 === "object") {
            extend(address0, type1);
          }
        } else {
          this._offset = index1;
          address0 = this.__consume__datetime_array();
          if (address0) {
            var type2 = find(this.constructor, "Array");
            if (typeof type2 === "object") {
              extend(address0, type2);
            }
          } else {
            this._offset = index1;
            address0 = this.__consume__float_array();
            if (address0) {
              var type3 = find(this.constructor, "Array");
              if (typeof type3 === "object") {
                extend(address0, type3);
              }
            } else {
              this._offset = index1;
              address0 = this.__consume__integer_array();
              if (address0) {
                var type4 = find(this.constructor, "Array");
                if (typeof type4 === "object") {
                  extend(address0, type4);
                }
              } else {
                this._offset = index1;
                address0 = this.__consume__boolean_array();
                if (address0) {
                  var type5 = find(this.constructor, "Array");
                  if (typeof type5 === "object") {
                    extend(address0, type5);
                  }
                } else {
                  this._offset = index1;
                  address0 = this.__consume__array_array();
                  if (address0) {
                    var type6 = find(this.constructor, "Array");
                    if (typeof type6 === "object") {
                      extend(address0, type6);
                    }
                  } else {
                    this._offset = index1;
                  }
                }
              }
            }
          }
        }
      }
      return this._nodeCache["array"][index0] = address0;
    },
    __consume__string: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["string"] = this._nodeCache["string"] || {};
      var cached = this._nodeCache["string"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\"") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\"", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\"\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset;
          var index4 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "\\") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address4 = new klass1("\\", this._offset, []);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            address5 = this.__consume__escape_char();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.escape_char = address5;
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2) {
            this._offset = index4;
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address3 = new klass2(text2, this._offset, elements2, labelled1);
            if (typeof type2 === "object") {
              extend(address3, type2);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
          } else {
            this._offset = index3;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 && /^[^"]/.test(slice4)) {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address3 = new klass3(slice4, this._offset, []);
              if (typeof type3 === "object") {
                extend(address3, type3);
              }
              this._offset += 1;
            } else {
              address3 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\"]"};
              }
            }
            if (address3) {
            } else {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4(text1, this._offset, elements1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address6 = null;
          var slice6 = null;
          if (this._input.length > this._offset) {
            slice6 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice6 = null;
          }
          if (slice6 === "\"") {
            var klass5 = this.constructor.SyntaxNode;
            var type5 = null;
            address6 = new klass5("\"", this._offset, []);
            if (typeof type5 === "object") {
              extend(address6, type5);
            }
            this._offset += 1;
          } else {
            address6 = null;
            var slice7 = null;
            if (this._input.length > this._offset) {
              slice7 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice7 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\"\""};
            }
          }
          if (address6) {
            elements0.push(address6);
            text0 += address6.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass6 = this.constructor.SyntaxNode;
        var type6 = find(this.constructor, "String");
        address0 = new klass6(text0, this._offset, elements0, labelled0);
        if (typeof type6 === "object") {
          extend(address0, type6);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["string"][index0] = address0;
    },
    __consume__escape_char: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["escape_char"] = this._nodeCache["escape_char"] || {};
      var cached = this._nodeCache["escape_char"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("0", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      if (address0) {
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "t") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address0 = new klass1("t", this._offset, []);
          if (typeof type1 === "object") {
            extend(address0, type1);
          }
          this._offset += 1;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"t\""};
          }
        }
        if (address0) {
        } else {
          this._offset = index1;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === "n") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address0 = new klass2("n", this._offset, []);
            if (typeof type2 === "object") {
              extend(address0, type2);
            }
            this._offset += 1;
          } else {
            address0 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"n\""};
            }
          }
          if (address0) {
          } else {
            this._offset = index1;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice6 = null;
            }
            if (slice6 === "r") {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address0 = new klass3("r", this._offset, []);
              if (typeof type3 === "object") {
                extend(address0, type3);
              }
              this._offset += 1;
            } else {
              address0 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"r\""};
              }
            }
            if (address0) {
            } else {
              this._offset = index1;
              var slice8 = null;
              if (this._input.length > this._offset) {
                slice8 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice8 = null;
              }
              if (slice8 === "\"") {
                var klass4 = this.constructor.SyntaxNode;
                var type4 = null;
                address0 = new klass4("\"", this._offset, []);
                if (typeof type4 === "object") {
                  extend(address0, type4);
                }
                this._offset += 1;
              } else {
                address0 = null;
                var slice9 = null;
                if (this._input.length > this._offset) {
                  slice9 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice9 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\"\""};
                }
              }
              if (address0) {
              } else {
                this._offset = index1;
                var slice10 = null;
                if (this._input.length > this._offset) {
                  slice10 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice10 = null;
                }
                if (slice10 === "\\") {
                  var klass5 = this.constructor.SyntaxNode;
                  var type5 = null;
                  address0 = new klass5("\\", this._offset, []);
                  if (typeof type5 === "object") {
                    extend(address0, type5);
                  }
                  this._offset += 1;
                } else {
                  address0 = null;
                  var slice11 = null;
                  if (this._input.length > this._offset) {
                    slice11 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice11 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
                  }
                }
                if (address0) {
                } else {
                  this._offset = index1;
                }
              }
            }
          }
        }
      }
      return this._nodeCache["escape_char"][index0] = address0;
    },
    __consume__integer: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["integer"] = this._nodeCache["integer"] || {};
      var cached = this._nodeCache["integer"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "-") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("-", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"-\""};
        }
      }
      if (address1) {
      } else {
        this._offset = index2;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address1 = new klass1("", this._offset, []);
        if (typeof type1 === "object") {
          extend(address1, type1);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[1-9]/.test(slice2)) {
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(slice2, this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[1-9]"};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 && /^[0-9]/.test(slice4)) {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address4 = new klass3(slice4, this._offset, []);
              if (typeof type3 === "object") {
                extend(address4, type3);
              }
              this._offset += 1;
            } else {
              address4 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var klass4 = this.constructor.SyntaxNode;
            var type4 = null;
            address3 = new klass4(text1, this._offset, elements1);
            if (typeof type4 === "object") {
              extend(address3, type4);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = find(this.constructor, "Integer");
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["integer"][index0] = address0;
    },
    __consume__float: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["float"] = this._nodeCache["float"] || {};
      var cached = this._nodeCache["float"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__integer();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.integer = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === ".") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0(".", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var slice2 = null;
            if (this._input.length > this._offset) {
              slice2 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice2 = null;
            }
            if (slice2 && /^[0-9]/.test(slice2)) {
              var klass1 = this.constructor.SyntaxNode;
              var type1 = null;
              address4 = new klass1(slice2, this._offset, []);
              if (typeof type1 === "object") {
                extend(address4, type1);
              }
              this._offset += 1;
            } else {
              address4 = null;
              var slice3 = null;
              if (this._input.length > this._offset) {
                slice3 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice3 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index2;
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address3 = new klass2(text1, this._offset, elements1);
            if (typeof type2 === "object") {
              extend(address3, type2);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "Float");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["float"][index0] = address0;
    },
    __consume__boolean: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["boolean"] = this._nodeCache["boolean"] || {};
      var cached = this._nodeCache["boolean"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 4);
      } else {
        slice0 = null;
      }
      if (slice0 === "true") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("true", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 4;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"true\""};
        }
      }
      if (address0) {
        var type1 = find(this.constructor, "Boolean");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 5);
        } else {
          slice2 = null;
        }
        if (slice2 === "false") {
          var klass1 = this.constructor.SyntaxNode;
          var type2 = null;
          address0 = new klass1("false", this._offset, []);
          if (typeof type2 === "object") {
            extend(address0, type2);
          }
          this._offset += 5;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"false\""};
          }
        }
        if (address0) {
          var type3 = find(this.constructor, "Boolean");
          if (typeof type3 === "object") {
            extend(address0, type3);
          }
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["boolean"][index0] = address0;
    },
    __consume__datetime: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["datetime"] = this._nodeCache["datetime"] || {};
      var cached = this._nodeCache["datetime"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
      var address2 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[1-9]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address2 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address2, type0);
        }
        this._offset += 1;
      } else {
        address2 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[1-9]"};
        }
      }
      if (address2) {
        elements1.push(address2);
        text1 += address2.textValue;
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[0-9]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 && /^[0-9]/.test(slice4)) {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2(slice4, this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
            }
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            var address5 = null;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice6 = null;
            }
            if (slice6 && /^[0-9]/.test(slice6)) {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address5 = new klass3(slice6, this._offset, []);
              if (typeof type3 === "object") {
                extend(address5, type3);
              }
              this._offset += 1;
            } else {
              address5 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address5) {
              elements1.push(address5);
              text1 += address5.textValue;
            } else {
              elements1 = null;
              this._offset = index2;
            }
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
      } else {
        elements1 = null;
        this._offset = index2;
      }
      if (elements1) {
        this._offset = index2;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address1 = new klass4(text1, this._offset, elements1, labelled1);
        if (typeof type4 === "object") {
          extend(address1, type4);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.year = address1;
        var address6 = null;
        var slice8 = null;
        if (this._input.length > this._offset) {
          slice8 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice8 = null;
        }
        if (slice8 === "-") {
          var klass5 = this.constructor.SyntaxNode;
          var type5 = null;
          address6 = new klass5("-", this._offset, []);
          if (typeof type5 === "object") {
            extend(address6, type5);
          }
          this._offset += 1;
        } else {
          address6 = null;
          var slice9 = null;
          if (this._input.length > this._offset) {
            slice9 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice9 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"-\""};
          }
        }
        if (address6) {
          elements0.push(address6);
          text0 += address6.textValue;
          var address7 = null;
          var index3 = this._offset, elements2 = [], labelled2 = {}, text2 = "";
          var address8 = null;
          var slice10 = null;
          if (this._input.length > this._offset) {
            slice10 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice10 = null;
          }
          if (slice10 && /^[0-9]/.test(slice10)) {
            var klass6 = this.constructor.SyntaxNode;
            var type6 = null;
            address8 = new klass6(slice10, this._offset, []);
            if (typeof type6 === "object") {
              extend(address8, type6);
            }
            this._offset += 1;
          } else {
            address8 = null;
            var slice11 = null;
            if (this._input.length > this._offset) {
              slice11 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice11 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
            }
          }
          if (address8) {
            elements2.push(address8);
            text2 += address8.textValue;
            var address9 = null;
            var slice12 = null;
            if (this._input.length > this._offset) {
              slice12 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice12 = null;
            }
            if (slice12 && /^[0-9]/.test(slice12)) {
              var klass7 = this.constructor.SyntaxNode;
              var type7 = null;
              address9 = new klass7(slice12, this._offset, []);
              if (typeof type7 === "object") {
                extend(address9, type7);
              }
              this._offset += 1;
            } else {
              address9 = null;
              var slice13 = null;
              if (this._input.length > this._offset) {
                slice13 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice13 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address9) {
              elements2.push(address9);
              text2 += address9.textValue;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var klass8 = this.constructor.SyntaxNode;
            var type8 = null;
            address7 = new klass8(text2, this._offset, elements2, labelled2);
            if (typeof type8 === "object") {
              extend(address7, type8);
            }
            this._offset += text2.length;
          } else {
            address7 = null;
          }
          if (address7) {
            elements0.push(address7);
            text0 += address7.textValue;
            labelled0.month = address7;
            var address10 = null;
            var slice14 = null;
            if (this._input.length > this._offset) {
              slice14 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice14 = null;
            }
            if (slice14 === "-") {
              var klass9 = this.constructor.SyntaxNode;
              var type9 = null;
              address10 = new klass9("-", this._offset, []);
              if (typeof type9 === "object") {
                extend(address10, type9);
              }
              this._offset += 1;
            } else {
              address10 = null;
              var slice15 = null;
              if (this._input.length > this._offset) {
                slice15 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice15 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"-\""};
              }
            }
            if (address10) {
              elements0.push(address10);
              text0 += address10.textValue;
              var address11 = null;
              var index4 = this._offset, elements3 = [], labelled3 = {}, text3 = "";
              var address12 = null;
              var slice16 = null;
              if (this._input.length > this._offset) {
                slice16 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice16 = null;
              }
              if (slice16 && /^[0-9]/.test(slice16)) {
                var klass10 = this.constructor.SyntaxNode;
                var type10 = null;
                address12 = new klass10(slice16, this._offset, []);
                if (typeof type10 === "object") {
                  extend(address12, type10);
                }
                this._offset += 1;
              } else {
                address12 = null;
                var slice17 = null;
                if (this._input.length > this._offset) {
                  slice17 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice17 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                }
              }
              if (address12) {
                elements3.push(address12);
                text3 += address12.textValue;
                var address13 = null;
                var slice18 = null;
                if (this._input.length > this._offset) {
                  slice18 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice18 = null;
                }
                if (slice18 && /^[0-9]/.test(slice18)) {
                  var klass11 = this.constructor.SyntaxNode;
                  var type11 = null;
                  address13 = new klass11(slice18, this._offset, []);
                  if (typeof type11 === "object") {
                    extend(address13, type11);
                  }
                  this._offset += 1;
                } else {
                  address13 = null;
                  var slice19 = null;
                  if (this._input.length > this._offset) {
                    slice19 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice19 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                  }
                }
                if (address13) {
                  elements3.push(address13);
                  text3 += address13.textValue;
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass12 = this.constructor.SyntaxNode;
                var type12 = null;
                address11 = new klass12(text3, this._offset, elements3, labelled3);
                if (typeof type12 === "object") {
                  extend(address11, type12);
                }
                this._offset += text3.length;
              } else {
                address11 = null;
              }
              if (address11) {
                elements0.push(address11);
                text0 += address11.textValue;
                labelled0.day = address11;
                var address14 = null;
                var slice20 = null;
                if (this._input.length > this._offset) {
                  slice20 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice20 = null;
                }
                if (slice20 === "T") {
                  var klass13 = this.constructor.SyntaxNode;
                  var type13 = null;
                  address14 = new klass13("T", this._offset, []);
                  if (typeof type13 === "object") {
                    extend(address14, type13);
                  }
                  this._offset += 1;
                } else {
                  address14 = null;
                  var slice21 = null;
                  if (this._input.length > this._offset) {
                    slice21 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice21 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"T\""};
                  }
                }
                if (address14) {
                  elements0.push(address14);
                  text0 += address14.textValue;
                  var address15 = null;
                  var index5 = this._offset, elements4 = [], labelled4 = {}, text4 = "";
                  var address16 = null;
                  var slice22 = null;
                  if (this._input.length > this._offset) {
                    slice22 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice22 = null;
                  }
                  if (slice22 && /^[0-9]/.test(slice22)) {
                    var klass14 = this.constructor.SyntaxNode;
                    var type14 = null;
                    address16 = new klass14(slice22, this._offset, []);
                    if (typeof type14 === "object") {
                      extend(address16, type14);
                    }
                    this._offset += 1;
                  } else {
                    address16 = null;
                    var slice23 = null;
                    if (this._input.length > this._offset) {
                      slice23 = this._input.substring(this._offset, this._offset + 1);
                    } else {
                      slice23 = null;
                    }
                    if (!this.error || this.error.offset <= this._offset) {
                      this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                    }
                  }
                  if (address16) {
                    elements4.push(address16);
                    text4 += address16.textValue;
                    var address17 = null;
                    var slice24 = null;
                    if (this._input.length > this._offset) {
                      slice24 = this._input.substring(this._offset, this._offset + 1);
                    } else {
                      slice24 = null;
                    }
                    if (slice24 && /^[0-9]/.test(slice24)) {
                      var klass15 = this.constructor.SyntaxNode;
                      var type15 = null;
                      address17 = new klass15(slice24, this._offset, []);
                      if (typeof type15 === "object") {
                        extend(address17, type15);
                      }
                      this._offset += 1;
                    } else {
                      address17 = null;
                      var slice25 = null;
                      if (this._input.length > this._offset) {
                        slice25 = this._input.substring(this._offset, this._offset + 1);
                      } else {
                        slice25 = null;
                      }
                      if (!this.error || this.error.offset <= this._offset) {
                        this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                      }
                    }
                    if (address17) {
                      elements4.push(address17);
                      text4 += address17.textValue;
                    } else {
                      elements4 = null;
                      this._offset = index5;
                    }
                  } else {
                    elements4 = null;
                    this._offset = index5;
                  }
                  if (elements4) {
                    this._offset = index5;
                    var klass16 = this.constructor.SyntaxNode;
                    var type16 = null;
                    address15 = new klass16(text4, this._offset, elements4, labelled4);
                    if (typeof type16 === "object") {
                      extend(address15, type16);
                    }
                    this._offset += text4.length;
                  } else {
                    address15 = null;
                  }
                  if (address15) {
                    elements0.push(address15);
                    text0 += address15.textValue;
                    labelled0.hour = address15;
                    var address18 = null;
                    var slice26 = null;
                    if (this._input.length > this._offset) {
                      slice26 = this._input.substring(this._offset, this._offset + 1);
                    } else {
                      slice26 = null;
                    }
                    if (slice26 === ":") {
                      var klass17 = this.constructor.SyntaxNode;
                      var type17 = null;
                      address18 = new klass17(":", this._offset, []);
                      if (typeof type17 === "object") {
                        extend(address18, type17);
                      }
                      this._offset += 1;
                    } else {
                      address18 = null;
                      var slice27 = null;
                      if (this._input.length > this._offset) {
                        slice27 = this._input.substring(this._offset, this._offset + 1);
                      } else {
                        slice27 = null;
                      }
                      if (!this.error || this.error.offset <= this._offset) {
                        this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\":\""};
                      }
                    }
                    if (address18) {
                      elements0.push(address18);
                      text0 += address18.textValue;
                      var address19 = null;
                      var index6 = this._offset, elements5 = [], labelled5 = {}, text5 = "";
                      var address20 = null;
                      var slice28 = null;
                      if (this._input.length > this._offset) {
                        slice28 = this._input.substring(this._offset, this._offset + 1);
                      } else {
                        slice28 = null;
                      }
                      if (slice28 && /^[0-9]/.test(slice28)) {
                        var klass18 = this.constructor.SyntaxNode;
                        var type18 = null;
                        address20 = new klass18(slice28, this._offset, []);
                        if (typeof type18 === "object") {
                          extend(address20, type18);
                        }
                        this._offset += 1;
                      } else {
                        address20 = null;
                        var slice29 = null;
                        if (this._input.length > this._offset) {
                          slice29 = this._input.substring(this._offset, this._offset + 1);
                        } else {
                          slice29 = null;
                        }
                        if (!this.error || this.error.offset <= this._offset) {
                          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                        }
                      }
                      if (address20) {
                        elements5.push(address20);
                        text5 += address20.textValue;
                        var address21 = null;
                        var slice30 = null;
                        if (this._input.length > this._offset) {
                          slice30 = this._input.substring(this._offset, this._offset + 1);
                        } else {
                          slice30 = null;
                        }
                        if (slice30 && /^[0-9]/.test(slice30)) {
                          var klass19 = this.constructor.SyntaxNode;
                          var type19 = null;
                          address21 = new klass19(slice30, this._offset, []);
                          if (typeof type19 === "object") {
                            extend(address21, type19);
                          }
                          this._offset += 1;
                        } else {
                          address21 = null;
                          var slice31 = null;
                          if (this._input.length > this._offset) {
                            slice31 = this._input.substring(this._offset, this._offset + 1);
                          } else {
                            slice31 = null;
                          }
                          if (!this.error || this.error.offset <= this._offset) {
                            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                          }
                        }
                        if (address21) {
                          elements5.push(address21);
                          text5 += address21.textValue;
                        } else {
                          elements5 = null;
                          this._offset = index6;
                        }
                      } else {
                        elements5 = null;
                        this._offset = index6;
                      }
                      if (elements5) {
                        this._offset = index6;
                        var klass20 = this.constructor.SyntaxNode;
                        var type20 = null;
                        address19 = new klass20(text5, this._offset, elements5, labelled5);
                        if (typeof type20 === "object") {
                          extend(address19, type20);
                        }
                        this._offset += text5.length;
                      } else {
                        address19 = null;
                      }
                      if (address19) {
                        elements0.push(address19);
                        text0 += address19.textValue;
                        labelled0.minute = address19;
                        var address22 = null;
                        var slice32 = null;
                        if (this._input.length > this._offset) {
                          slice32 = this._input.substring(this._offset, this._offset + 1);
                        } else {
                          slice32 = null;
                        }
                        if (slice32 === ":") {
                          var klass21 = this.constructor.SyntaxNode;
                          var type21 = null;
                          address22 = new klass21(":", this._offset, []);
                          if (typeof type21 === "object") {
                            extend(address22, type21);
                          }
                          this._offset += 1;
                        } else {
                          address22 = null;
                          var slice33 = null;
                          if (this._input.length > this._offset) {
                            slice33 = this._input.substring(this._offset, this._offset + 1);
                          } else {
                            slice33 = null;
                          }
                          if (!this.error || this.error.offset <= this._offset) {
                            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\":\""};
                          }
                        }
                        if (address22) {
                          elements0.push(address22);
                          text0 += address22.textValue;
                          var address23 = null;
                          var index7 = this._offset, elements6 = [], labelled6 = {}, text6 = "";
                          var address24 = null;
                          var slice34 = null;
                          if (this._input.length > this._offset) {
                            slice34 = this._input.substring(this._offset, this._offset + 1);
                          } else {
                            slice34 = null;
                          }
                          if (slice34 && /^[0-9]/.test(slice34)) {
                            var klass22 = this.constructor.SyntaxNode;
                            var type22 = null;
                            address24 = new klass22(slice34, this._offset, []);
                            if (typeof type22 === "object") {
                              extend(address24, type22);
                            }
                            this._offset += 1;
                          } else {
                            address24 = null;
                            var slice35 = null;
                            if (this._input.length > this._offset) {
                              slice35 = this._input.substring(this._offset, this._offset + 1);
                            } else {
                              slice35 = null;
                            }
                            if (!this.error || this.error.offset <= this._offset) {
                              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                            }
                          }
                          if (address24) {
                            elements6.push(address24);
                            text6 += address24.textValue;
                            var address25 = null;
                            var slice36 = null;
                            if (this._input.length > this._offset) {
                              slice36 = this._input.substring(this._offset, this._offset + 1);
                            } else {
                              slice36 = null;
                            }
                            if (slice36 && /^[0-9]/.test(slice36)) {
                              var klass23 = this.constructor.SyntaxNode;
                              var type23 = null;
                              address25 = new klass23(slice36, this._offset, []);
                              if (typeof type23 === "object") {
                                extend(address25, type23);
                              }
                              this._offset += 1;
                            } else {
                              address25 = null;
                              var slice37 = null;
                              if (this._input.length > this._offset) {
                                slice37 = this._input.substring(this._offset, this._offset + 1);
                              } else {
                                slice37 = null;
                              }
                              if (!this.error || this.error.offset <= this._offset) {
                                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                              }
                            }
                            if (address25) {
                              elements6.push(address25);
                              text6 += address25.textValue;
                            } else {
                              elements6 = null;
                              this._offset = index7;
                            }
                          } else {
                            elements6 = null;
                            this._offset = index7;
                          }
                          if (elements6) {
                            this._offset = index7;
                            var klass24 = this.constructor.SyntaxNode;
                            var type24 = null;
                            address23 = new klass24(text6, this._offset, elements6, labelled6);
                            if (typeof type24 === "object") {
                              extend(address23, type24);
                            }
                            this._offset += text6.length;
                          } else {
                            address23 = null;
                          }
                          if (address23) {
                            elements0.push(address23);
                            text0 += address23.textValue;
                            labelled0.second = address23;
                            var address26 = null;
                            var index8 = this._offset;
                            var index9 = this._offset, elements7 = [], labelled7 = {}, text7 = "";
                            var address27 = null;
                            var slice38 = null;
                            if (this._input.length > this._offset) {
                              slice38 = this._input.substring(this._offset, this._offset + 1);
                            } else {
                              slice38 = null;
                            }
                            if (slice38 === ".") {
                              var klass25 = this.constructor.SyntaxNode;
                              var type25 = null;
                              address27 = new klass25(".", this._offset, []);
                              if (typeof type25 === "object") {
                                extend(address27, type25);
                              }
                              this._offset += 1;
                            } else {
                              address27 = null;
                              var slice39 = null;
                              if (this._input.length > this._offset) {
                                slice39 = this._input.substring(this._offset, this._offset + 1);
                              } else {
                                slice39 = null;
                              }
                              if (!this.error || this.error.offset <= this._offset) {
                                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
                              }
                            }
                            if (address27) {
                              elements7.push(address27);
                              text7 += address27.textValue;
                              var address28 = null;
                              var remaining0 = 1, index10 = this._offset, elements8 = [], text8 = "", address29 = true;
                              while (address29) {
                                var slice40 = null;
                                if (this._input.length > this._offset) {
                                  slice40 = this._input.substring(this._offset, this._offset + 1);
                                } else {
                                  slice40 = null;
                                }
                                if (slice40 && /^[0-9]/.test(slice40)) {
                                  var klass26 = this.constructor.SyntaxNode;
                                  var type26 = null;
                                  address29 = new klass26(slice40, this._offset, []);
                                  if (typeof type26 === "object") {
                                    extend(address29, type26);
                                  }
                                  this._offset += 1;
                                } else {
                                  address29 = null;
                                  var slice41 = null;
                                  if (this._input.length > this._offset) {
                                    slice41 = this._input.substring(this._offset, this._offset + 1);
                                  } else {
                                    slice41 = null;
                                  }
                                  if (!this.error || this.error.offset <= this._offset) {
                                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                                  }
                                }
                                if (address29) {
                                  elements8.push(address29);
                                  text8 += address29.textValue;
                                  remaining0 -= 1;
                                }
                              }
                              if (remaining0 <= 0) {
                                this._offset = index10;
                                var klass27 = this.constructor.SyntaxNode;
                                var type27 = null;
                                address28 = new klass27(text8, this._offset, elements8);
                                if (typeof type27 === "object") {
                                  extend(address28, type27);
                                }
                                this._offset += text8.length;
                              } else {
                                address28 = null;
                              }
                              if (address28) {
                                elements7.push(address28);
                                text7 += address28.textValue;
                              } else {
                                elements7 = null;
                                this._offset = index9;
                              }
                            } else {
                              elements7 = null;
                              this._offset = index9;
                            }
                            if (elements7) {
                              this._offset = index9;
                              var klass28 = this.constructor.SyntaxNode;
                              var type28 = null;
                              address26 = new klass28(text7, this._offset, elements7, labelled7);
                              if (typeof type28 === "object") {
                                extend(address26, type28);
                              }
                              this._offset += text7.length;
                            } else {
                              address26 = null;
                            }
                            if (address26) {
                            } else {
                              this._offset = index8;
                              var klass29 = this.constructor.SyntaxNode;
                              var type29 = null;
                              address26 = new klass29("", this._offset, []);
                              if (typeof type29 === "object") {
                                extend(address26, type29);
                              }
                              this._offset += 0;
                            }
                            if (address26) {
                              elements0.push(address26);
                              text0 += address26.textValue;
                              labelled0.fraction = address26;
                              var address30 = null;
                              var slice42 = null;
                              if (this._input.length > this._offset) {
                                slice42 = this._input.substring(this._offset, this._offset + 1);
                              } else {
                                slice42 = null;
                              }
                              if (slice42 === "Z") {
                                var klass30 = this.constructor.SyntaxNode;
                                var type30 = null;
                                address30 = new klass30("Z", this._offset, []);
                                if (typeof type30 === "object") {
                                  extend(address30, type30);
                                }
                                this._offset += 1;
                              } else {
                                address30 = null;
                                var slice43 = null;
                                if (this._input.length > this._offset) {
                                  slice43 = this._input.substring(this._offset, this._offset + 1);
                                } else {
                                  slice43 = null;
                                }
                                if (!this.error || this.error.offset <= this._offset) {
                                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"Z\""};
                                }
                              }
                              if (address30) {
                                elements0.push(address30);
                                text0 += address30.textValue;
                              } else {
                                elements0 = null;
                                this._offset = index1;
                              }
                            } else {
                              elements0 = null;
                              this._offset = index1;
                            }
                          } else {
                            elements0 = null;
                            this._offset = index1;
                          }
                        } else {
                          elements0 = null;
                          this._offset = index1;
                        }
                      } else {
                        elements0 = null;
                        this._offset = index1;
                      }
                    } else {
                      elements0 = null;
                      this._offset = index1;
                    }
                  } else {
                    elements0 = null;
                    this._offset = index1;
                  }
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass31 = this.constructor.SyntaxNode;
        var type31 = find(this.constructor, "Datetime");
        address0 = new klass31(text0, this._offset, elements0, labelled0);
        if (typeof type31 === "object") {
          extend(address0, type31);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["datetime"][index0] = address0;
    },
    __consume__empty_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["empty_array"] = this._nodeCache["empty_array"] || {};
      var cached = this._nodeCache["empty_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "]") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2("]", this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["empty_array"][index0] = address0;
    },
    __consume__string_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["string_array"] = this._nodeCache["string_array"] || {};
      var cached = this._nodeCache["string_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__string();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__string();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["string_array"][index0] = address0;
    },
    __consume__integer_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["integer_array"] = this._nodeCache["integer_array"] || {};
      var cached = this._nodeCache["integer_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__integer();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__integer();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["integer_array"][index0] = address0;
    },
    __consume__float_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["float_array"] = this._nodeCache["float_array"] || {};
      var cached = this._nodeCache["float_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__float();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__float();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["float_array"][index0] = address0;
    },
    __consume__boolean_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["boolean_array"] = this._nodeCache["boolean_array"] || {};
      var cached = this._nodeCache["boolean_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__boolean();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__boolean();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["boolean_array"][index0] = address0;
    },
    __consume__datetime_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["datetime_array"] = this._nodeCache["datetime_array"] || {};
      var cached = this._nodeCache["datetime_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__datetime();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__datetime();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["datetime_array"][index0] = address0;
    },
    __consume__array_array: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["array_array"] = this._nodeCache["array_array"] || {};
      var cached = this._nodeCache["array_array"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__ws();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__array();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.head = address4;
            var address5 = null;
            var remaining1 = 0, index3 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var index4 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
              var address7 = null;
              var remaining2 = 0, index5 = this._offset, elements4 = [], text4 = "", address8 = true;
              while (address8) {
                address8 = this.__consume__ws();
                if (address8) {
                  elements4.push(address8);
                  text4 += address8.textValue;
                  remaining2 -= 1;
                }
              }
              if (remaining2 <= 0) {
                this._offset = index5;
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address7 = new klass2(text4, this._offset, elements4);
                if (typeof type2 === "object") {
                  extend(address7, type2);
                }
                this._offset += text4.length;
              } else {
                address7 = null;
              }
              if (address7) {
                elements3.push(address7);
                text3 += address7.textValue;
                var address9 = null;
                var slice2 = null;
                if (this._input.length > this._offset) {
                  slice2 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice2 = null;
                }
                if (slice2 === ",") {
                  var klass3 = this.constructor.SyntaxNode;
                  var type3 = null;
                  address9 = new klass3(",", this._offset, []);
                  if (typeof type3 === "object") {
                    extend(address9, type3);
                  }
                  this._offset += 1;
                } else {
                  address9 = null;
                  var slice3 = null;
                  if (this._input.length > this._offset) {
                    slice3 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice3 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
                  }
                }
                if (address9) {
                  elements3.push(address9);
                  text3 += address9.textValue;
                  var address10 = null;
                  var remaining3 = 0, index6 = this._offset, elements5 = [], text5 = "", address11 = true;
                  while (address11) {
                    address11 = this.__consume__ws();
                    if (address11) {
                      elements5.push(address11);
                      text5 += address11.textValue;
                      remaining3 -= 1;
                    }
                  }
                  if (remaining3 <= 0) {
                    this._offset = index6;
                    var klass4 = this.constructor.SyntaxNode;
                    var type4 = null;
                    address10 = new klass4(text5, this._offset, elements5);
                    if (typeof type4 === "object") {
                      extend(address10, type4);
                    }
                    this._offset += text5.length;
                  } else {
                    address10 = null;
                  }
                  if (address10) {
                    elements3.push(address10);
                    text3 += address10.textValue;
                    var address12 = null;
                    address12 = this.__consume__array();
                    if (address12) {
                      elements3.push(address12);
                      text3 += address12.textValue;
                      labelled1.value = address12;
                    } else {
                      elements3 = null;
                      this._offset = index4;
                    }
                  } else {
                    elements3 = null;
                    this._offset = index4;
                  }
                } else {
                  elements3 = null;
                  this._offset = index4;
                }
              } else {
                elements3 = null;
                this._offset = index4;
              }
              if (elements3) {
                this._offset = index4;
                var klass5 = this.constructor.SyntaxNode;
                var type5 = null;
                address6 = new klass5(text3, this._offset, elements3, labelled1);
                if (typeof type5 === "object") {
                  extend(address6, type5);
                }
                this._offset += text3.length;
              } else {
                address6 = null;
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index3;
              var klass6 = this.constructor.SyntaxNode;
              var type6 = null;
              address5 = new klass6(text2, this._offset, elements2);
              if (typeof type6 === "object") {
                extend(address5, type6);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.tail = address5;
              var address13 = null;
              var remaining4 = 0, index7 = this._offset, elements6 = [], text6 = "", address14 = true;
              while (address14) {
                address14 = this.__consume__ws();
                if (address14) {
                  elements6.push(address14);
                  text6 += address14.textValue;
                  remaining4 -= 1;
                }
              }
              if (remaining4 <= 0) {
                this._offset = index7;
                var klass7 = this.constructor.SyntaxNode;
                var type7 = null;
                address13 = new klass7(text6, this._offset, elements6);
                if (typeof type7 === "object") {
                  extend(address13, type7);
                }
                this._offset += text6.length;
              } else {
                address13 = null;
              }
              if (address13) {
                elements0.push(address13);
                text0 += address13.textValue;
                var address15 = null;
                var slice4 = null;
                if (this._input.length > this._offset) {
                  slice4 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice4 = null;
                }
                if (slice4 === "]") {
                  var klass8 = this.constructor.SyntaxNode;
                  var type8 = null;
                  address15 = new klass8("]", this._offset, []);
                  if (typeof type8 === "object") {
                    extend(address15, type8);
                  }
                  this._offset += 1;
                } else {
                  address15 = null;
                  var slice5 = null;
                  if (this._input.length > this._offset) {
                    slice5 = this._input.substring(this._offset, this._offset + 1);
                  } else {
                    slice5 = null;
                  }
                  if (!this.error || this.error.offset <= this._offset) {
                    this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
                  }
                }
                if (address15) {
                  elements0.push(address15);
                  text0 += address15.textValue;
                } else {
                  elements0 = null;
                  this._offset = index1;
                }
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass9 = this.constructor.SyntaxNode;
        var type9 = null;
        address0 = new klass9(text0, this._offset, elements0, labelled0);
        if (typeof type9 === "object") {
          extend(address0, type9);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["array_array"][index0] = address0;
    },
    __consume__line_end: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["line_end"] = this._nodeCache["line_end"] || {};
      var cached = this._nodeCache["line_end"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address2 = true;
      while (address2) {
        address2 = this.__consume__ws();
        if (address2) {
          elements1.push(address2);
          text1 += address2.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index2;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0(text1, this._offset, elements1);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += text1.length;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address3 = null;
        var index3 = this._offset;
        address3 = this.__consume__comment();
        if (address3) {
        } else {
          this._offset = index3;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1("", this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 0;
        }
        if (address3) {
          elements0.push(address3);
          text0 += address3.textValue;
          var address4 = null;
          var index4 = this._offset;
          var index5 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address5 = null;
          var index6 = this._offset;
          address5 = this.__consume__nl();
          this._offset = index6;
          if (!(address5)) {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address5 = new klass2("", this._offset, []);
            if (typeof type2 === "object") {
              extend(address5, type2);
            }
            this._offset += 0;
          } else {
            address5 = null;
          }
          if (address5) {
            elements2.push(address5);
            text2 += address5.textValue;
            var address6 = null;
            var slice0 = null;
            if (this._input.length > this._offset) {
              slice0 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice0 = null;
            }
            var temp0 = slice0;
            if (temp0 === null) {
              address6 = null;
              var slice1 = null;
              if (this._input.length > this._offset) {
                slice1 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice1 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
              }
            } else {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address6 = new klass3(temp0, this._offset, []);
              if (typeof type3 === "object") {
                extend(address6, type3);
              }
              this._offset += 1;
            }
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
            } else {
              elements2 = null;
              this._offset = index5;
            }
          } else {
            elements2 = null;
            this._offset = index5;
          }
          if (elements2) {
            this._offset = index5;
            var klass4 = this.constructor.SyntaxNode;
            var type4 = null;
            address4 = new klass4(text2, this._offset, elements2, labelled1);
            if (typeof type4 === "object") {
              extend(address4, type4);
            }
            this._offset += text2.length;
          } else {
            address4 = null;
          }
          this._offset = index4;
          if (!(address4)) {
            var klass5 = this.constructor.SyntaxNode;
            var type5 = null;
            address4 = new klass5("", this._offset, []);
            if (typeof type5 === "object") {
              extend(address4, type5);
            }
            this._offset += 0;
          } else {
            address4 = null;
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass6 = this.constructor.SyntaxNode;
        var type6 = null;
        address0 = new klass6(text0, this._offset, elements0, labelled0);
        if (typeof type6 === "object") {
          extend(address0, type6);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["line_end"][index0] = address0;
    },
    __consume__ignore: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["ignore"] = this._nodeCache["ignore"] || {};
      var cached = this._nodeCache["ignore"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var index2 = this._offset;
        address1 = this.__consume__comment();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__ws();
          if (address1) {
          } else {
            this._offset = index2;
            address1 = this.__consume__nl();
            if (address1) {
            } else {
              this._offset = index2;
            }
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["ignore"][index0] = address0;
    },
    __consume__comment: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["comment"] = this._nodeCache["comment"] || {};
      var cached = this._nodeCache["comment"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "#") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("#", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"#\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var index4 = this._offset;
          address4 = this.__consume__nl();
          this._offset = index4;
          if (!(address4)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address4 = new klass1("", this._offset, []);
            if (typeof type1 === "object") {
              extend(address4, type1);
            }
            this._offset += 0;
          } else {
            address4 = null;
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            var slice2 = null;
            if (this._input.length > this._offset) {
              slice2 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice2 = null;
            }
            var temp0 = slice2;
            if (temp0 === null) {
              address5 = null;
              var slice3 = null;
              if (this._input.length > this._offset) {
                slice3 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice3 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
              }
            } else {
              var klass2 = this.constructor.SyntaxNode;
              var type2 = null;
              address5 = new klass2(temp0, this._offset, []);
              if (typeof type2 === "object") {
                extend(address5, type2);
              }
              this._offset += 1;
            }
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address3 = new klass3(text2, this._offset, elements2, labelled1);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4(text1, this._offset, elements1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = null;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["comment"][index0] = address0;
    },
    __consume__ws: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["ws"] = this._nodeCache["ws"] || {};
      var cached = this._nodeCache["ws"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 && /^[ \t]/.test(slice0)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(slice0, this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[ \\t]"};
        }
      }
      return this._nodeCache["ws"][index0] = address0;
    },
    __consume__nl: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["nl"] = this._nodeCache["nl"] || {};
      var cached = this._nodeCache["nl"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "\r\n") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("\r\n", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 2;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\r\\n\""};
        }
      }
      if (address0) {
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "\r") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address0 = new klass1("\r", this._offset, []);
          if (typeof type1 === "object") {
            extend(address0, type1);
          }
          this._offset += 1;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\r\""};
          }
        }
        if (address0) {
        } else {
          this._offset = index1;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === "\n") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address0 = new klass2("\n", this._offset, []);
            if (typeof type2 === "object") {
              extend(address0, type2);
            }
            this._offset += 1;
          } else {
            address0 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\n\""};
            }
          }
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["nl"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__document();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
    if (typeof TOML !== "undefined") {
      TOML.Document = Grammar;
      TOML.DocumentParser = Parser;
      TOML.DocumentParser.formatError = formatError;
    }
  } else {
    var namespace = this;
    namespace = namespace.TOML = namespace.TOML || {};
    TOML.Document = Grammar;
    TOML.DocumentParser = Parser;
    TOML.DocumentParser.formatError = formatError;
  }
})();


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
      throw new Error('Duplicate key: ' + full.join('.'));

    document[last] = value.value.interpret();
  }
};


TOML.DocumentParser.KeyGroup = {

};


TOML.DocumentParser.String = {
  interpret: function() {
    return eval(this.textValue);
  }
};


TOML.DocumentParser.Integer = {
  interpret: function() {
    return eval(this.textValue);
  }
};


TOML.DocumentParser.Float = {
  interpret: function() {
    return eval(this.textValue);
  }
};


TOML.DocumentParser.Boolean = {
  interpret: function() {
    return this.textValue === 'true';
  }
};


TOML.DocumentParser.Datetime = {
  interpret: function() {
    var date = new Date();
    date.setFullYear(parseInt(this.year.textValue, 10));
    date.setMonth(parseInt(this.month.textValue, 10) - 1);
    date.setDate(parseInt(this.day.textValue, 10));
    date.setHours(parseInt(this.hour.textValue, 10));
    date.setMinutes(parseInt(this.minute.textValue, 10));
    date.setSeconds(parseInt(this.second.textValue + this.fraction.textValue, 10));
    return date;
  }
};


TOML.DocumentParser.Array = {
  interpret: function() {
    if (!this.head) return [];

    var array = [this.head.interpret()];

    for (var i = 0, n = this.tail.elements.length; i < n; i++)
      array.push(this.tail.elements[i].value.interpret());

    return array;
  }
};

