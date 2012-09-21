var union    = require('union')
  , ecstatic = require('ecstatic')
  , director = require('director')

var router    = new director.http.Router()

var server = union.createServer({
  before: [
    ecstatic(__dirname + '/public'),
    function (req, res) {
      router.dispatch(req,res)
    }
  ]
})

server.listen(8080)
