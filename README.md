# node-enocean-button
this button is meant to be used with [node-enocean](https://github.com/Holger-Will/node-enocean)
it implements the f6-02-03 eep
## installation
`npm install node-enocean-button`
## usage

index.js
```
var enocean = require("node-enocean")();
var Button = require("../")
enocean.listen("/dev/ttyUSB0")                 
enocean.on("ready",function(){
	var button = new Button(enocean,1)
	if(process.argv[2] == "on"){
		button.A1.click().then(enocean.close)
	}else{
		button.A0.click().then(enocean.close)
	}
});
```

\* call this from the command line with `node index on` or `node index off`

## usage with async await
```
var enocean = require("node-enocean")();
var Button = require("../")
enocean.listen("/dev/ttyUSB0")                 
enocean.on("ready",function(){
	var button = new Button(enocean,1)
	if(process.argv[2] == "on"){
		await button.A1.click()
	}else{
		await button.A0.click()
	}
	enocean.close()
});
```

\* call this from the command line with `node index on` or `node index off` for node version < 8.0 use `node --harmony-async-await ...` flag

## usage with [koa](https://github.com/koajs/koa)

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

\* with koa2 you can use await instead of yield

the following buttons are available:

* `.A0`
* `.A1`
* `.B0`
* `.B1`

the following methods can be used to invoke an event.

* `.down()`
* `.up()`
* `.click()`

you can check the generated telegrams with:

* `.B0upCode`
* `.B0downCode`
* `.B1upCode`
* `.B1downCode`
* `.A0upCode`
* `.A0downCode`
* `.A1upCode`
* `.A1downCode`

the actual address can be retrieved with

`.address`

see the examples for more info.
