var union    = require('union')
  , ecstatic = require('ecstatic')
  , director = require('director')
  , nano     = require('nano')('https://empirejs.iriscouch.com')

var router    = new director.http.Router()
  , empire_db = nano.db.use('proposals')

var server = union.createServer({
  before: [
    ecstatic(__dirname + '/public'),
    function (req, res) {
      router.dispatch(req,res)
    }
  ]
})

router.post(/\//, function () {
  var self = this
  var data = this.req.body

  empire_db.insert({details: data}, function (err, body, headers) {
    self.res.writeHead(200, { 'Content-Type': 'text/plain' })
    if (err) {
      self.res.end('Error submitting proposal. Please try again later.')
      return
    }
    self.res.end('Talk Proposal Submitted')
  })

})

server.listen(8080)
