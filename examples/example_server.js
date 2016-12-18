// ########################################################################
// # Example of using the button with koa                                 #
// # ------------------------------------                                 #
// #                                                                      #
// # created By Holger Will (h.will@klimapartner.de)                      #
// # created for [Klimapartner GmbH](http://klimapartner.de/)             #
// # this code is published under GPL v3.0                                #
// ########################################################################


// run this server and then open http://localhost:3000 in a browser

var koa = require('koa');
var app = koa()
var enocean = require("node-enocean")();           // require node-enocean
var Button = require("../");                     // require the Button impl.

app.use(function *(ctx,next){
	var button = new Button(enocean,1)
	if(this.query.c == "on"){
		yield button.A1.click()
		this.body = makehtml("On")
	}else{
		yield button.A0.click()
		this.body = makehtml("Off")
	}
});

function makehtml(state){
	return `<html><body>Button A was switched ${state} <div><a href="/?c=on">On</a>/<a href="/?c=off">Off</a></div></body></html>`
}

enocean.listen("/dev/ttyUSB0");
app.listen(3000);
