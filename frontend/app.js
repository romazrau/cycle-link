var express = require('express');
var app = express();

const open = require('open');


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.send('./public/index.htmls');
})


app.use('/', function (req, res) {
  res.redirect('/');
});



app.listen(5502, function () {
  console.log('App listening on port 5502!');
  (async () => {
    // Opens the URL in the default browser.
    await open("http://localhost:5502");
  })();
});
