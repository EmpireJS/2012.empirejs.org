var union    = require('union')
  , ecstatic = require('ecstatic')
  , director = require('director')

var router    = new director.http.Router()

var port = process.env.PORT || 8090;

var server = union.createServer({
  before: [
    require('morgan')('combined'),
    ecstatic(__dirname + '/public'),
    function (req, res) {
      router.dispatch(req,res)
    }
  ]
})

server.listen(port, function (err) {
  if (err) { throw err; }
  console.log('2014.empirejs.org running on %s', port);
});
