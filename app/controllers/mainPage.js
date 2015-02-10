/*
 * 
 * 
 * 
 * Title:
 * Description: 
 * 
 * ChangeLog: 
 * 
 * 
 * 
 */

//===========================================================================
// PROPERTIES
//===========================================================================	
var args = arguments[0] || {};

exports.baseController = "baseView";
$.main.add($.mainPage);

var Cloud = require("ti.cloud");
var sessionId = "";
var loadedOnce = Ti.App.Properties.getBool("loadOnce", false);

var usernameInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var passwrodInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var HotelIDInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

var HotelnameInput = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
  color: '#336699',
  left:"5%",
  top: "5%",
  width: 100, 
  height: Ti.UI.SIZE,
});

$.line1.add(usernameInput);
$.line2.add(passwrodInput);
$.display.add(HotelIDInput);
$.display.add(HotelnameInput);

function init(){ 
	if(loadedOnce == false){
		// Cloud.Users.create({
	        // username : "Ronn",
	        // password : "123456",
	        // password_confirmation : "123456"
	    // }, function(e) {
	        // if (e.success) {
	            // alert(e.users[0].username + " is enrolled.");
	            // Ti.App.Properties.setBool("loadOnce", true);
	        // } else {
	            // alert("Error: " + e.message);
	        // }
	    // });
	    createUser("Ronn","123456");
	    createUser("Lutarez","654321");
	    Ti.App.Properties.setBool("loadOnce", true);
	}
}

function createUser(name,pwd){
	Cloud.Users.create({
	        username : name,
	        password : pwd,
	        password_confirmation : pwd,
	    }, function(e) {
	        if (e.success) {
	            alert(e.users[0].username + " is enrolled.");
	            // Ti.App.Properties.setBool("loadOnce", true);
	        } else {
	            alert("Error: " + e.message);
	        }
	});
}

init();

$.login.addEventListener('click',function(){
	loginUser();
});

function loginUser(e){
	Cloud.Users.login({
	    login: usernameInput.value,
	    password: passwrodInput.value,
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        sessionId = e.meta.session_id;
	        alert(e.meta.session_id);
	        // alert('Success:\n' +
	            // 'id: ' + user.id + '\n' +
	            // 'sessionId: ' + Cloud.sessionId + '\n' +
	            // 'first name: ' + user.first_name + '\n' +
	            // 'last name: ' + user.last_name);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function createHotel(e,hid,hname){
	Cloud.Objects.create({
		session_id:sessionId,
	    classname: 'hotels',
	    // fields: {
	        // make: 'nissan',
	        // color: 'blue',
	        // year: 2005
	    // }
	    fields:{
	    	hid: hid,
	    	name: hname,
	    }
	}, function (e) {
	    if (e.success) {
	        var hotel = e.hotels[0];
	        // alert('Success:\n' +
	            // 'id: ' + car.id + '\n' +
	            // 'make: ' + car.make + '\n' +
	            // 'color: ' + car.color + '\n' +
	            // 'year: ' + car.year + '\n' +
	            // 'created_at: ' + car.created_at);
	            alert('Success:\n' +
	            'hid: ' + hotel.hid + '\n' +
	            'name: ' + hotel.name + '\n' +
	            'created_at: ' + hotel.created_at);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

$.insert.addEventListener('click',function(e){
	createHotel(e,HotelIDInput.value,HotelnameInput.value);
});

function queryData(e){
	Cloud.Objects.query({
	    classname: 'hotels',
	    page: 1,
	    per_page: 10,
	    // where: {
	        // color: 'blue'
	    // }
	}, function (e) {
	    if (e.success) {
	        alert('Success:\n' +
	            'Count: ' + e.hotels.length);
	        for (var i = 0; i < e.hotels.length; i++) {
	            var hotel = e.hotels[i];
	            alert('hid: ' + hotel.hid + '\n' +
	                'name: ' + hotel.name + '\n' +
	                'created_at: ' + hotel.created_at);
	            
	            DisplayHotel(hotel.hid,hotel.name);
	            // deleteHotel(e,hotel.id);
	        }
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function DisplayHotel(hid,hname){
	var hidLabel = Ti.UI.createLabel({
		text:hid,
		left:"5%",
		width:"30%",
		height:Ti.UI.SIZE,
	});
	
	var hnameLabel = Ti.UI.createLabel({
		text:hname,
		left:"40%",
		width:"30%",
		height:Ti.UI.SIZE,
	});
	
	var viewline = Ti.UI.createView({
		top:0,
		width:"100%",
		height:"10%",
	});
	
	viewline.add(hidLabel);
	viewline.add(hnameLabel);
	$.display2.add(viewline);
}

$.query.addEventListener('click',function(e){
	queryData(e);
});

function deleteHotel(e,id){
	Cloud.Objects.remove({
	session_id:sessionId,
    classname: 'hotels',
    id: id,
	}, function (e) {
	    if (e.success) {
	        alert('Success');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}


//===========================================================================
// END OF PROPERTIES
//===========================================================================	
//===========================================================================
// END OF PROPERTIES
//===========================================================================	


//===========================================================================
// HANDLERS
//===========================================================================	

//===========================================================================
// END OF HANDLERS
//===========================================================================	


//===========================================================================
// SERVICE RESPONSES
//===========================================================================	

//===========================================================================
// END OF SERVICE RESPONSES
//===========================================================================	


//===========================================================================
// SERVICE REQUESTS
//===========================================================================	

//===========================================================================
// END OF SERVICE REQUESTS
//===========================================================================	


//===========================================================================
// FUNCTIONS
//===========================================================================

//===========================================================================
// END OF FUNCTIONS
//===========================================================================	


//===========================================================================
// LOGICS
//===========================================================================

//===========================================================================
// END OF LOGICS
//===========================================================================

//===========================================================================
// END OF LOGICS
//===========================================================================	


//===========================================================================
// EXPORTS
//===========================================================================

//===========================================================================
// END OF EXPORTS
//===========================================================================
