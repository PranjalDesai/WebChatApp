/*
Note: some of the firebase code was taken from
URL: https://www.firebase.com/docs/web/guide/login/password.html
BY: Harsh Patel, 11/26/2015 12:45 AM
Note: some of the code in the sendMessage function was taken from
URL:  https://www.firebase.com/tutorial/#session/xc6q34py2fc
URL:  http://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
BY: Pranjal Desai, 11/30/2015
*/

// connecting to firebase
var ref = new Firebase("https://vivid-inferno-1520.firebaseio.com/");

// getting the user name and password.
var email;
var password;
var messageField = $('#message');
var messageList = $('#messageLists');


// checking for login info, if correct, slide off.
function checkLoginInfo()
{
	email = document.getElementById('email').value;
	password = document.getElementById('password').value;
	// checking if the user has entered an email and a password.
	if(email == null || email == "")
	{
		alert("Please type a username");
	}
	else if (password == null || password == "")
	{
		alert("Please type a password");
	}
	else
	{
	// send in the user and email that was entered and see what was returned,
		ref.authWithPassword(
		{
		email    : email,
		password : password
		}, 
		function(error, authData) 
		{
			if (error) {
				alert("Login Failed!");
			} else {
				moveOut();
			}
		});
	}
}
// fades out the app so the chat can be started.
function moveOut()
{
	// fade out all the webapp.
	$('.logInInfo').fadeOut("slow");
	$('.chatRoom').fadeIn("show");
}
// creates an account.
function createAnAccount()
{
	var newEmail = document.getElementById("newEmail").value;
	var newPassword = document.getElementById("newPassword").value;
	
	if(newEmail == null || newEmail == "")
	{
		alert("Please enter an email");
	}
	else if(newPassword == null || newPassword == "")
	{
		alert("Please enter a password");
	}
	else
	{
		// create the user.
		ref.createUser(
		{
		  email    : newEmail,
		  password : newPassword
		}, function(error, userData) 
		{
		  if (error) 
		  {
			alert("Error creating user:");
		  } else
		  {
			alert("Account Has been created!!! :)");
		  }
		});
	}
}
// sends the message.
function sendMessage(messageField)
{
	var selectBox = document.getElementById("messageList");
	selectBox.innerHTML = "";
	var messageElement;
	if(messageField == null || messageField == "")
	{
		alert("Please enter a message");
	}
	else
	{
		var date = new Date();								
		var hours = date.getHours();
  		var minutes = date.getMinutes();
  		var ampm = hours >= 12 ? 'pm' : 'am';
  		hours = hours % 12;
  		hours = hours ? hours : 12; // the hour '0' should be '12'
  		minutes = minutes < 10 ? '0'+minutes : minutes;
  		var currTime = hours + ':' + minutes + ' ' + ampm;
  
		
		ref.push({text:messageField, email: email, date: date.toDateString(), time: currTime});
		ref.limitToLast(25).on('child_added', function (snapshot) {
    	//GET DATA
    	var data = snapshot.val();
    	var message = data.text;
    	var userEmail = data.email;
    	var time= data.time;
    	var date= data.date;
    	//alert(message);

    	messageList.append(email+": "+message);
		$('#messageList').append("<li id = 'messagedisplay' >"+ userEmail+ ": " +message+ 
									"<br><p id = 'timeDisplay' >"+ time+ ", "+ date+"</p></li>");
   
    	});	
    	document.getElementById("message").value = "";
    	
    }	 	  
}



