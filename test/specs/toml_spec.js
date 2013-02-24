TomlSpec = JS.Test.describe("TOML", function() { with(this) {
  before(function() {
    this.result = TOML.parse('\
      s = "something"\n\
      i = 42\n\
      f = -3.14      # a comment\n\
      b = true\n\
      d = 2013-02-24T08:29:30Z\n\
\n\
      a1 = [1, 2, 3]\n\
      a2 = [ ["a", "b"], [1, 2], [], [3.14, 2.718], [false, true] ]\n\
\n\
      [namespace]\n\
      string = "toml"\n\
\n\
      [deep.namespace]\n\
      age = 29\n\
      ')
  })

  it("parses strings", function() { with(this) {
    assertEqual( "something", result.s )
  }})

  it("parses integers", function() { with(this) {
    assertEqual( 42, result.i )
  }})

  it("parses floats", function() { with(this) {
    assertEqual( -3.14, result.f )
  }})

  it("parses booleans", function() { with(this) {
    assertEqual( true, result.b )
  }})

  it("parses datetimes", function() { with(this) {
    assertEqual( 2013, result.d.getFullYear() )
    assertEqual( 1, result.d.getMonth() )
    assertEqual( 29, result.d.getMinutes() )
  }})

  it("parses arrays", function() { with(this) {
    assertEqual( [1, 2, 3], result.a1 )
    assertEqual( [ ["a", "b"], [1, 2], [], [3.14, 2.718], [false, true] ], result.a2 )
  }})

  it("parses namespaced values", function() { with(this) {
    assertEqual( "toml", result.namespace.string )
  }})

  it("parses deeply namespaced values", function() { with(this) {
    assertEqual( 29, result.deep.namespace.age )
  }})
}})

