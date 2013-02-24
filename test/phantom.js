var Test   = require('../vendor/jstest').Test,
    page   = new WebPage(),
    report = new Test.Reporters.PhantomJS({}, page)

page.open('test/browser.html')

