var union    = require('union')
  , ecstatic = require('ecstatic')
  , director = require('director')
  , nano     = require('nano')('https://empirejs.iriscouch.com')

var router    = new director.http.Router()
  , empire_db = nano.db.use('proposals')
  , numbers_db = nano.db.use('numbers')

var server = union.createServer({
  before: [
    ecstatic(__dirname + '/public'),
    function (req, res) {
      router.dispatch(req,res)
    }
  ]
})

router.post(/phone/, function () {
  var self = this
  var data = this.req.body

  numbers_db.insert({number: data}, function (err, body, headers) {
    self.res.writeHead(200, { 'Content-Type': 'text/plain' })
    if (err) {
      self.res.end('Error submitting phone number. Please try again later.')
      return
    }
    self.res.end('Phone Number Submitted')
  })
})

server.listen(8080)
