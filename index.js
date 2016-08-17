// # A Button for node-enocean
// created By Holger Will (h.will@klimapartner.de)
// created for [Klimapartner GmbH](http://klimapartner.de/)
// this code is published under GPL v3.0
// use this function as a constructor for a new Button Object.
// it implements the EEP f6-02-03
// app should be an node-enocean Object,
// and id should be a number between 0 and 255.
var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports      = function ( app , id ) {
	// the header for single Byte telegrams is allways the same for all EEPs
	this.head       = "55000707017a"
	// the address or senderId is the base address of the used sending device plus the id passed to this function
	this.address    = ( parseInt( app.base , 16 ) + parseInt( id ) ).toString( 16 )
	// this.DataByte is a little helper function to create the telegram strings for all button states
	this.DataByte   = function ( Byte0 ) {
		// f6 means this is an RPS telegram Byte0 is the state of the button we like to send,
		// this. address is the senderId
		// 3001 is fixed for all RPS telegrams, ffffffff is the receiver address. all ff means this is a broudcast telegram.
		// ff00 is signal strength and repeater count. both are fixed to ff and 00 for the send case.
		var tmp     = "f6" + Byte0 + this.address + "3001ffffffffff00"
		// calculating the checksum of the message body
		tmp        += app.crc( new Buffer( tmp , "hex" ) ).toString(16)
		// return the complete message as a string
		return  this.head + tmp
	}
	// compute the codes for all possible events
	// channel B
	this.B0upCode   = this.DataByte("00") // Button B0 is released
	this.B0downCode = this.DataByte("70") // Button B0 is pressed
	this.B1upCode   = this.DataByte("00") // Button B1 is released
	this.B1downCode = this.DataByte("50") // Button B1 is pressed
	// channel A
	this.A0upCode   = this.DataByte("00") // Button A0 is released
	this.A0downCode = this.DataByte("30") // Button A0 is pressed
	this.A1upCode   = this.DataByte("00") // Button A1 is released
	this.A1downCode = this.DataByte("10") // Button A1 is pressed
	// interface for invoking the Button events
	this.B0 = {
		click : async (function () {
			// for a click event call down() and the up()
			await (this.B0.down())
			await (this.B0.up())
		}.bind( this )),
		down  : async(function () {
			await (app.send(this.B0downCode))
		}.bind(this)),
		up    : async (function () {
			await (app.send(this.B0upCode))
		}.bind(this))
	}
	//  do the same for the rest of the buttons...
	this.B1 = {
		click : async (function () {
			// for a click event call down() and the up()
			await (this.B1.down())
			await (this.B1.up())
		}.bind( this )),
		down  : async(function () {
			await (app.send(this.B1downCode))
		}.bind(this)),
		up    : async (function () {
			await (app.send(this.B1upCode))
		}.bind(this))
	}

	this.A0 = {
		click : async (function () {
			// for a click event call down() and the up()
			await (this.A0.down())
			await (this.A0.up())
		}.bind( this )),
		down  : async(function () {
			await (app.send(this.A0downCode))
		}.bind(this)),
		up    : async (function () {
			await (app.send(this.A0upCode))
		}.bind(this))
	}

	this.A1 = {
		click : async (function () {
			// for a click event call down() and the up()
			await (this.A1.down())
			await (this.A1.up())
		}.bind( this )),
		down  : async(function () {
			await (app.send(this.A1downCode))
		}.bind(this)),
		up    : async (function () {
			await (app.send(this.A1upCode))
		}.bind(this))
	}
}
