function hasAccess(role) {
 // var path = window.location.pathname.split("/").pop().replace(".html", "");
  if (role === "ROLE_ADMIN") {
	  
		  window.location.replace("/static/backup/admin/dashboard.html");
}
 if (role === "ROLE_DOCTOR") {
		  window.location.replace("/static/backup/doctor/doctordashboard.html");
	  
 }
  if (role === "ROLE_USER") {
		  window.location.replace("/static/backup/receptionist/recepdashboard.html");
	  
 }
  if (role === "ROLE_ACCOUNT") {
		  window.location.replace("/static/backup/account/account-dashboard.html");
	  
 }
 }
 
  function authentic() {
    	    var username = document.getElementById("userName").value;
    	    var password = document.getElementById("password").value;
    	    
    	    if(username == "" && password == ""){
				alert("Please Enter UserName & password")
			}
			else{
    	    var data = {
    	        username: username,
    	        password: password
    	    };
    	    
    	    var xhr = new XMLHttpRequest();
    	    
    	    xhr.open("POST", "api/auth/login", true);
    	    
    	    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    	    
    	    xhr.onload = function() {
				if (xhr.status === 401){
					alert("Please check username & password");
				}
    	        if (xhr.status === 200) {
    	            var responseJson = JSON.parse(xhr.responseText);
    	         
    	            var roles = responseJson.roles;
if(hasAccess(roles)==false ){
	 window.location.replace("/static/backup/error-500.html");
 }
    	    
    	   }
    	   } 
    	    // Send the data as JSON string in the request body
    	    xhr.send(JSON.stringify(data));
    	
}
 }
 
 
