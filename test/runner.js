JS.packages(function() { with(this) {
  var ROOT = JS.ENV.ROOT || '.'
  autoload(/^(.*)Spec$/, {from: ROOT + '/test/specs'})
}})

JS.require('TomlSpec', function() {
  JS.Test.autorun()
})

