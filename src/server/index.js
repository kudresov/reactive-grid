"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var netjet = require("netjet");
var exphbs = require("express-handlebars");
var ramda_1 = require("ramda");
var routes_1 = require("../shared/routes");
var render = require('../../dist/server-renderer').render;
if (!render) {
    throw new Error('Render not found try compiling the server first');
}
var STATIC_RESOURCE_CACHE_PERIOD = '1y'; // 1 year
var app = express();
app.use(netjet());
var isProd = process.env.NODE_ENV === 'production';
var clientPath = path.join(__dirname, '../../dist');
var viewsPath = path.join(__dirname, '../../dist', 'views');
var port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', viewsPath);
app.set('view engine', '.hbs');
app.use(express.static(clientPath, { maxAge: STATIC_RESOURCE_CACHE_PERIOD }));
app.get(ramda_1.values(routes_1["default"]), function (req, res) {
    var innerHtml = render('/');
    // res.setHeader('Cache-Control', 'public, max-age=14400');
    res.render('index', { body: innerHtml });
    // res.send('hi!');
});
app.listen(port, function () {
    console.log("Listening on port " + port);
});
