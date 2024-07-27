
 var hasAdminAccess=["doctors","patients","holidays","activities","add-appointment","add-asset","add-doctor","add-department","add-patient","add-leave",
 "departments","appointments","add-schedule","add-holidays","schedule","employees","expense-reposrts","expenses","invoices","invoice-reports",
 "salary","provident-fund","add-role","setting","calendar","leaves","create-invoice","payments","taxes","add-tax","add-provident-fund"
 ,"salary-view","assets","index",""
 ];
 
 
 var hasDoctorAccess=["doctor-add-appointment","doctor-add-patient","doctor-add-schedule","doctor-appointments","doctordashboard"
 ,"doctor-patients","doctor-schedule"];
 
 var hasReceptionistAccess=["assets.html","attended.html","blank-page.html","blog-details.html","calendar.html","doctordashboard.html","doctor-patients.html","doctor-schedule.html",
 "edit-appointment.html","add-recep-appointments.html","add-recep-department.html","add-recep-doctor.html","add-recep-patients.html"
 ,"add-recep-schedule.html","recep-appointments.html","recepdashboard.html","recep-departments.html","recep-doctor.html",
 "recep-employees.html","recep-patients.html","recep-schedule.html"]
 
function hasAccess(role) {
  var path = window.location.pathname.split("/").pop().replace(".html", "");
  if (role === "ROLE_ADMIN") {
    return hasAdminAccess.includes(path);
  }
if(role =="ROLE_DOCTOR"){
	var path = window.location.pathname.split("/").pop().replace(".html", "");
	return hasDoctorAccess.includes(path)
}


if(role =="ROLE_USER"){
	var path = window.location.pathname.split("/").pop().replace(".html", "");
	return hasReceptionistAccess.includes(path)
}
   else{
	   window.location.replace("/Hospital_services/static/backup/error-500.html");
   }
   
}



 
 function backToDoctor(){
			 window.location.replace("/Hospital_services/static/backup/admin/doctors.html");
		 }
		 
 function backToPatient()
{
	 window.location.replace("/static/backup/admin/patients.html");
}
var rest=window.origin+"/hospital";
function ShowForm(){
    document.getElementById("div-list").classList.add("hidden");
    document.getElementById("div-form").classList.remove("hidden");
}

function ShowList(){
    document.getElementById("div-list").classList.remove("hidden");
    document.getElementById("div-form").classList.add("hidden");
}


var id="";
var globalID;
var globalData;

function ListEmployee() {
   
        var xhr = new XMLHttpRequest();
        xhr.open("POST", rest + "list_employee", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "-Requested-With");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
        BusyCursor();
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText.toString().trim());
              
               

            }
        });
  
}




function showAlert(message) {
    $(".alert").removeClass("hidden");
    document.querySelector(".alert").textContent = message;

    setTimeout(function() {
        $(".alert").addClass("hidden");
    }, 5000);
}




/*
 
<<<<<<<<<<<<<<<<<< POST CALLS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 


 
 */



//Function For Creating Doctor......
function saveDoctor() {
  const fileInput = document.getElementById("filephoto");
  const file = fileInput.files[0];

  if (!file) {
    showAlert("No file selected. Please choose a file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const photoData = event.target.result.split(',')[1];
    const selectedRadioButton = document.querySelector('input[name="gender"]:checked');
    const statusButton = document.querySelector('input[name="status"]:checked');

    const data = {
      firstname: getValue("firstname"),
      lastname: getValue("lastname"),
      email: getValue("email"),
      age: parseInt(getValue("age")),
      dob: getValue("dob"),
      mobile: getValue("mobile"),
      image: photoData,
      address: getValue("address"),
      designation: getValue("designation"),
      department: getValue("department"),
      gender: selectedRadioButton ? selectedRadioButton.value : "",
      status: statusButton ? statusButton.value : "",
    };

    // Validate required fields
    if (!data.firstname || !data.lastname || !data.email || !data.designation) {
      showAlert("Please fill in all required fields.");
      return;
    }

    // Validate age as a positive number
    if (isNaN(data.age) || data.age <= 0) {
      showAlert("Age must be a valid positive number.");
      return;
    }

    // If all validations pass, proceed with further processing
    console.log("Form data is valid. Data object:", data);

    // Send data to the server via AJAX
    sendDataToServer(data);
  };

  reader.onerror = function () {
    showAlert("An error occurred while reading the file.");
  };

  reader.readAsDataURL(file);
}

function getValue(elementId) {
  return document.getElementById(elementId).value.trim();
}




function sendDataToServer(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/savedoctor", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onload = function () {
    if (xhr.status === 201) {

showAlert("Doctor Detail Save Successfully");
  setTimeout(function() {
       window.location.href = "/static/backup/admin/doctors.html";
    }, 600);


        
    } else {
      // Handle server response or error
    }
  };

  xhr.onerror = function () {
    showAlert("An error occurred while making the request.");
  };

  xhr.send(JSON.stringify(data));
}

//Update doctor details

 function updateDoctor(id)
 {
var fileInput = document.getElementById("filephoto");
var file = fileInput.files[0];

var reader = new FileReader();

reader.onload = function(event) {
    var photoData = event.target.result;
    var imageStr = photoData.split(',')[1];

    var data = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        image: imageStr,
        age: document.getElementById("age").value,
        mobile: document.getElementById("mobile").value,
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value,
        designation: document.getElementById("designation").value,
        department: document.getElementById("department").value,
        gender: document.getElementById("gender").value,
        status: document.getElementById("status").value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Hospital_services/updatedoctordetailbyid/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));

    xhr.onload = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 201) {
                    showAlert("Doctor Details Saved Successfully");
                    window.location.replace("/Hospital_services/static/backup/admin/doctors.html");
                } else {
                     showAlert("Doctor Details Saved Successfully");
                      window.location.replace("/Hospital_services/static/backup/admin/doctors.html");
                }
            } else {
                showAlert("An error occurred while saving Doctor Details. Please try again.");
            }
        }
    };

    xhr.onerror = function() {
        showAlert("An error occurred while making the request.");
    };
};

reader.onerror = function() {
    showAlert("An error occurred while reading the file.");
};

if (file) {
    reader.readAsDataURL(file);
} else {
    showAlert("No file selected. Please choose a file.");
}

 }







//save patient call.....
function savePatient() {
    var fileInput = document.getElementById("img");
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoData = event.target.result;
      var  imageStr = photoData.split(',')[1];
        var selectedRadioButton = document.querySelector('input[name="gender"]:checked');
        var statusButton = document.querySelector('input[name="status"]:checked');

        if (document.getElementById("firstname").value == "" || 
            document.getElementById("lastname").value == "" || 
            imageStr == "" || 
            document.getElementById("tempreture").value == "" || 
            document.getElementById("email").value == "" || 
            document.getElementById("age").value == "" || 
            document.getElementById("mobile").value == "" || 
            document.getElementById("gender").value == "" ||
            document.getElementById("status").value == "" ||
            document.getElementById("weight").value == "" ||
            document.getElementById("address").value == "" ||
            document.getElementById("height").value == "")  {
            showAlert("Please fill all details.");
        } else {
            var data = {
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                image: imageStr,
                tempreture: document.getElementById("tempreture").value,
                email: document.getElementById("email").value,
                age: document.getElementById("age").value,
                mobile: document.getElementById("mobile").value,
                weight: document.getElementById("weight").value,
                height: document.getElementById("height").value,
                address: document.getElementById("address").value,
                adhaarno: document.getElementById("aadharNo").value,
                gender: selectedRadioButton.value,
                status: statusButton.value
            };

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/savepatientdetails", true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

            xhr.onreadystatechange = function () {
                    if (xhr.status === 201) {
                            showAlert("Patient saved successfully");
                            setTimeout(function() {
          window.location.href = "/static/backup/admin/patients.html";
    }, 600);
                         
                     }else {
                            showAlert("Failed to save patient. Somthing went wrong please try again.");
                        }
                
            };

            xhr.send(JSON.stringify(data));
        }
    };

    reader.readAsDataURL(file);
}


function AddEmployee() {
	var selectedRadioButton = document.querySelector('input[name="gender"]:checked');
	var statusButton= document.querySelector('input[name="status"]:checked');
   if (document.getElementById("firstname").value == "" || 
    document.getElementById("lastname").value == "" || 
    document.getElementById("email").value == "" || 
    document.getElementById("mobile").value == "" || 
    document.getElementById("address").value == "" || 
    document.getElementById("dob").value == "" || 
    document.getElementById("designation").value == "" || 
    document.getElementById("joiningdate").value == "") {
        showAlert("Please Enter Valid Detail.");
    } else {

        
      
        var data = {
           // txtId: document.getElementById("txtId").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            mobile: document.getElementById("mobile").value,
            address: document.getElementById("address").value,
            dob: document.getElementById("dob").value,
            designation: document.getElementById("designation").value,
            joiningdate: document.getElementById("joiningdate").value,
            gender: selectedRadioButton.value,
            status:statusButton.value
        }
        
        console.log(data);
        var xhr = new XMLHttpRequest();
xhr.open("POST", "/Hospital_services/saveemployeedetails", true);
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
       // BusyCursor();
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
            if (xhr.status === 201) {
                console.log(xhr.responseText.toString().trim());
              
                var jobj = JSON.parse(xhr.responseText.toString().trim());
                if (jobj["data"] == "success") {
                    showAlert("Employee Save Successfully");
                    window.location.reload();
                } else {
                    showAlert("Employee Not Save Try Again");
                }

            }
        });
    }
}


function fetchData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/get", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
	  showAlert(xhr.status);
    if (xhr.status === 200) {
		showAlert(xhr.responseText);
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
      // Process the response data here
    }
  };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
  
  
  // Show busy cursor here
}


//Ajax Post call for save patient Details
function createPatient(){
	
	var selectedRadioButton = document.querySelector('input[name="gender"]:checked');
	var statusButton= document.querySelector('input[name="status"]:checked');
	
	
	
	
	
        var data = {
           // txtId: document.getElementById("txtId").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value,
             dob: document.getElementById("dob").value,
            address: document.getElementById("address").value,
            mobile: document.getElementById("mobile").value,
            gender: selectedRadioButton.value,
            status:statusButton.value
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Hospital_services/savepatientdetails", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
       // BusyCursor();
       
       
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
			showAlert( xhr.status)
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText.toString().trim());
              
                var jobj = JSON.parse(xhr.responseText.toString().trim());
                if (jobj["data"] == "success") {
                    showAlert("Doctor Details Save Successfully");
                   // window.location.reload();
                } else {
                    showAlert("Doctor Details Not Save Try Again");
                }

            }
        });
    
	
}

/*
Ajax Post call for save appointment
*/
function saveAppointment() {
    var statusButton = document.querySelector('input[name="status"]:checked');

    const data = {
        department: document.getElementById("department").value,
        doctor: document.getElementById("doctor").value,
        date: document.getElementById("date").value,
        datetimepicker3: document.getElementById("datetimepicker3").value,
        email: document.getElementById("Patient_Email").value,
        mobile: document.getElementById("Patient_Phone_Number").value,
        message: document.getElementById("message").value,
        status: statusButton.value,
        patient: {
            id: document.getElementById("PatientId").value,
        }
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/saveappointment", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    xhr.addEventListener("loadend", function () {
        if (xhr.status === 500) {
            showAlert("Please check Patient ID");
        }
    });

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                var jobj = JSON.parse(xhr.responseText.trim());
                if (jobj["data"] === "success") {
                    showAlert("Appointment Details Saved Successfully");
                    setTimeout(function () {
                        window.location.href = "/static/backup/admin/appointments.html";
                    }, 600);
                } else {
                    showAlert("Appointment Details Saved Successfully");
                     setTimeout(function () {
                        window.location.href = "/static/backup/admin/appointments.html";
                    }, 600);
                }
            } else {
                showAlert("Failed to save appointment details. Please check Patient ID.");
            }
        }
    });

    xhr.send(JSON.stringify(data));
}



function saveSchedule(){
	
	
	var statusButton= document.querySelector('input[name="status"]:checked');
	
	
	
	var selectedDay = document.getElementById("available_days");
    var selectedValues = [];

   for (var i = 0; i < selectedDay.options.length; i++) {
    var option = selectedDay.options[i];
  
  if (option.selected) {
    selectedValues.push(option.value);
  }
}


        var data = {
            available_days: selectedValues,
            doctor: document.getElementById("doctor").value,
            datetimepicker3: document.getElementById("datetimepicker3").value,
            datetimepicker4: document.getElementById("datetimepicker4").value,
            message: document.getElementById("message").value,
            status:statusButton.value
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/savedoctorschedule", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
       // BusyCursor();
       
       
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
			//showAlert( xhr.status)
            if (xhr.status === 201) {
				                 showAlert("Schedule saved successfully");
                            setTimeout(function() {
          window.location.replace("/static/backup/admin/schedule.html");
    }, 600);
                   
                } else {
                    showAlert("Doctor Details Not Save Try Again");
                }

            
        });
	
	
	
		
	
}


function saveDepartment()
{
	
	var statusButton= document.querySelector('input[name="status"]:checked');
	

        var data = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            status:statusButton.value
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/savedepartment", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
       // BusyCursor();
       
       
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
            if ( xhr.status === 201) {
				showAlert("Department Detail Save Successfully");
  setTimeout(function() {
        window.location.replace("/static/backup/admin/departments.html");
    }, 600);
                   
                } else {
                    showAlert("Department Not Save Try Again");
                }

            
        });
	
}

/*
 
<<<<<<<<<<<<<<<<<< GET CALLS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
 
 */
function getDoctorDetails() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getdocterdetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
      
// Get the container element where the dynamic content will be added
var container = document.querySelector('.doctor-grid');
var data='';
// Iterate over the doctors array and create the dynamic HTML structure
for (var i = 0; i < responseData.length; i++) {
	var doctor = responseData[i];
		// Create a new Image object
var image = new Image();

// Set the source of the image object to the data URL of the image
image.src = doctor.image;
data=data+'<div class="col-md-4 col-sm-4  col-lg-3">\
                            <div class="profile-widget">\
                                <div class="doctor-img">\
                                    <a class="avatar" href="javascript:void(0)"><img alt="" src="data:image/jpeg;base64,' + doctor.image + '" onClick=getDoctorById("' + doctor.id + '")></a>\
                                </div>\
                                <div class="dropdown profile-action">\
                                    <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>\
                                    <div class="dropdown-menu dropdown-menu-right">\
                                        <a class="dropdown-item" href="javascript:void(0)" onClick=getFormForUpdateDoctorDetail("' + btoa(JSON.stringify(doctor)) + '")><i class="fa fa-pencil m-r-5"></i> Edit</a>\
                                       	<a class="dropdown-item data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onClick=deleteDoctorById("' + doctor.id + '")><i class="fa fa-trash-o m-r-5"></i> Delete</a>\
		 </div>\
                                </div>\
                               <h4 class="doctor-name text-ellipsis"><a href="profile.html">Dr. '+doctor.firstname+'</a></h4>\
                                <div class="doc-prof">'+doctor.lastname+'</div>\
                                <div class="user-country">\
                                    <i class="fa fa-map-marker"></i> '+doctor.address+'<br>\
                                    <i class="fa fa-mobile"></i> '+doctor.mobile+'\
                                </div>\
                            </div>\
                        </div>';
                        container.innerHTML=data;

  }    
    }
  };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();

  // Show busy cursor here
}


function getPatientDetails(){
	var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getpatientdetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
      
      
      
// Get the table body element
var tableBody = document.querySelector(".table tbody");
var searchInput = document.getElementById("searchInput");

// Create a search input element
var searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("id", "searchInput");
searchInput.setAttribute("placeholder", "Search...");

// Find the parent element where you want to append the search input
var parentElement = document.getElementById("parentContainer"); // Replace "parentContainer" with the actual ID of the parent element

// Append the search input to the parent element
parentElement.appendChild(searchInput);


// Function to generate table rows based on patient data

function generateTable(){
  tableBody.innerHTML = ""; // Clear existing rows
var searchTerm = searchInput.value.trim().toLowerCase();
  responseData.forEach(function(patient) {
	  
	   if (
            patient.firstname.toLowerCase().includes(searchTerm) ||
            patient.lastname.toLowerCase().includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchTerm) ||
            patient.mobile.toLowerCase().includes(searchTerm)
          ){
	 var datetime= patient.created_at;
	var dateOnly = datetime.split('T')[0];  
	  
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var date = document.createElement("td");
    var ageCell = document.createElement("td");
    var addressCell = document.createElement("td");
    var phoneCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var temp = document.createElement("td");
    var weight = document.createElement("td");
    var height = document.createElement("td");
    var status = document.createElement("td");
      var patientID = document.createElement("td");
    var actionCell = document.createElement("td");
//showAlert(patient.id)
 nameCell.innerHTML = `<img width="28" height="28" src="data:image/jpeg;base64,${patient.image}" class="rounded-circle m-r-5" alt=""> ${patient.firstname}`;
 date.textContent = dateOnly;
    ageCell.textContent = patient.age;
    addressCell.textContent = patient.address;
    phoneCell.textContent = patient.mobile;
    emailCell.textContent = patient.adhaarno;
    temp.textContent = patient.tempreture;
    weight.textContent = patient.weight;
    height.textContent = patient.height;
    status.textContent = patient.status;
      patientID.textContent = patient.id;

   actionCell.innerHTML = `
  <div class="dropdown dropdown-action">
    <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
      <i class="fa fa-ellipsis-v"></i>
    </a>
    <div class="dropdown-menu dropdown-menu-right">
      <a class="dropdown-item data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onClick="deletePatientDetailById('${patient.id}')">
        <i class="fa fa-trash-o m-r-5"></i> Delete
      </a>
      <a class="dropdown-item" href="javascript:void(0)" onClick="getFormForUpdatePatientDetail('${btoa(JSON.stringify(patient))}')">
        <i class="fa fa-pencil m-r-5"></i> Edit
      </a>
    </div>
  </div>`;


    row.appendChild(nameCell);
     row.appendChild(date);
    row.appendChild(ageCell);
    row.appendChild(addressCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);
    row.appendChild(temp);
    row.appendChild(weight);
    row.appendChild(height);
    row.appendChild(status);
       row.appendChild(patientID);
    row.appendChild(actionCell);
    

    tableBody.appendChild(row);
    }
  });

   }   
       generateTable();
        // Listen for input changes and update the table
      searchInput.addEventListener("input", generateTable);
      }
	 };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
}




function getAppointmentDetail(){
	 var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getappointmentdetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
 var container = document.querySelector('.table tbody');
var data='';
  console.log(xhr.status);
  xhr.onload = function () {
    if (xhr.status === 200) {
		var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
		for (var i = 0; i < responseData.length; i++) {
      
      var appointment = responseData[i];
      data=data+'	<tr>\
										<td>APT-'+appointment.id+'</td>\
										<td>'+appointment.patient.id+'</td>\
										<td>'+appointment.patient.age+'</td>\
										<td>'+appointment.doctor+'</td>\
										<td>'+appointment.department+'</td>\
										<td>'+appointment.date+'</td>\
										<td>'+appointment.datetimepicker3+'</td>\
										<td><span class="custom-badge status-red">'+appointment.status+'</span></td>\
										<td class="text-right">\
											<div class="dropdown dropdown-action">\
												<a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>\
												<div class="dropdown-menu dropdown-menu-right">\
												<a class="dropdown-item" href="#" onClick=getPatientReport('+appointment.patient.id+')><i class="fa fa-pencil m-r-5"></i> Attend</a>\
													<a class="dropdown-item"  onClick=updateAppointmentById("' + btoa(JSON.stringify(appointment)) + '")><i class="fa fa-pencil m-r-5"></i> Edit</a>\
													<a class="dropdown-item data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onClick=deleteAppointmentById('+appointment.id+')><i class="fa fa-trash-o m-r-5"></i>\ Delete</a>\
												</div>\
											</div>\
										</td>\
									</tr>';
      container.innerHTML=data;
 
}
	
	}     
	 };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
}
	
	function getAppointmentDetailsforreceptionist(){
		
		 var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getappointmentdetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
 var container = document.querySelector('.table tbody');
var data='';
  console.log(xhr.status);
  xhr.onload = function () {
    if (xhr.status === 200) {
		var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
		for (var i = 0; i < responseData.length; i++) {
      
      var appointment = responseData[i];
      data=data+'	<tr>\
										<td>APT-'+appointment.id+'</td>\
										<td>'+appointment.patientname+'</td>\
										<td>30</td>\
										<td>'+appointment.doctor+'</td>\
										<td>'+appointment.department+'</td>\
										<td>'+appointment.date+'</td>\
										<td>'+appointment.datetimepicker3+'</td>\
										<td><span class="custom-badge status-red">'+appointment.status+'</span></td>\
										<td class="text-right">\
											<div class="dropdown dropdown-action">\
												<a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>\
												<div class="dropdown-menu dropdown-menu-right">\
													<a class="dropdown-item" href="edit-appointment.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>\
													<a class="dropdown-item" href="#"   onClick=deleteAppointmentById('+appointment.id+')><i class="fa fa-trash-o m-r-5"></i>\ Delete</a>\
												</div>\
											</div>\
										</td>\
									</tr>';
      container.innerHTML=data;
 
}
	
	}     
	 };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
		
	}
	
	function openModal(){
		document.getElementById("mymodel").style.display="block";
	}
	
	function attendAppointmentById(data){
		var attendappointment=JSON.parse(atob(data))
		
		'<!DOCTYPE html>\
<html lang="en">\
<head>\
    <meta charset="UTF-8">\
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\
    <title>Document</title>\
</head>\
<body>\
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">\
        <div class="modal-dialog">\
          <div class="modal-content">\
            <div class="modal-header">\
              <h5 class="modal-title" id="exampleModalLabel">New message</h5>\
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
              </button>\
            </div>\
            <div class="modal-body">\
              <form>\
                <div class="form-group">\
                  <label for="recipient-name" class="col-form-label">Recipient:</label>\
                  <input type="text" class="form-control" id="recipient-name">\
                </div>\
                <div class="form-group">\
                  <label for="message-text" class="col-form-label">Message:</label>\
                  <textarea class="form-control" id="message-text"></textarea>\
                </div>\
              </form>\
            </div>\
            <div class="modal-footer">\
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
              <button type="button" class="btn btn-primary">Send message</button>\
            </div>\
          </div>\
        </div>\
      </div>\
</body>\
</html>';
		
	}
	
	
function updateAppointmentById(appointmentData){
	
	//var parentContainer = document.getElementById("parentContainer");
//parentContainer.style.display = "none";
	  var appointment=JSON.parse(atob(appointmentData));
	  var container = document.querySelector('.doctor-grid');
	  fetchDoctors();
	  fetchDepartments();
	  var data='<div class="col-lg-8 offset-lg-2">\
	  <div class="row">\
                                <div class="col-md-6">\
                                    <div class="form-group">\
										<label>Appointment ID</label>\
										<input class="form-control" type="text" value='+appointment.id+' readonly="">\
									</div>\
                                </div>\
                                <div class="col-md-6">\
									<div class="form-group">\
										<label>Patient Name</label>\
										<input class="form-control" type="text" value='+appointment.patientname+' >\
									</div>\
                                </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Department</label>\
                                        <select class="select" id="department">\
                                            <option>'+appointment.department+'</option>\
                                        </select>\
                                    </div>\
                                    </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Doctor</label>\
                                        <select class="select" id="doctorname">\
                                        <option>'+appointment.doctor+'</option>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Date</label>\
                                        <div class="cal-icon">\
                                            <input type="text" class="form-control datetimepicker" value='+appointment.date+'>\
                                        </div>\
                                    </div>\
                                    </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Time</label>\
                                        <div class="time-icon">\
                                            <input type="text" class="form-control" id="datetimepicker3" value='+appointment.datetimepicker3+'>\
                                        </div>\
                                    </div>\
                            </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Patient Email</label>\
                                        <input class="form-control" type="email" value='+appointment.email+'>\
                                    </div>\
                                </div>\
                                <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Patient Phone Number</label>\
                                        <input class="form-control" type="text" value='+appointment.mobile+'>\
                                    </div>\
                                </div>\
                                <div class="col-md-6">\
                            <div class="form-group">\
                                <label>Message</label>\
                                <textarea cols="30" rows="4" class="form-control" value='+appointment.message+'></textarea>\
                            </div>\
                              </div>\
                               <div class="col-md-6">\
                            <div class="form-group">\
                                <label class="display-block">Appointment Status</label>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status" id="product_active" value='+appointment.status+'>\
									<label class="form-check-label" for="product_active">\
									Active\
									</label>\
								</div>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status" id="product_inactive" value="option2" value='+appointment.status+'>\
									<label class="form-check-label" for="product_inactive">\
									Inactive\
									</label>\
								</div>\
                            </div>\
                            </div>\
                            <div class="m-t-20 text-center">\
                               <button  type="button" class="btn btn-primary submit-btn" onclick="saveAppointment()">Save Appointment</button>\
                                <button type="button" class="btn btn-secondary submit-btn" >Back</button>\
                            </div>\
                    </div>\
                </div>';
	 container.innerHTML=data;
	
}	
	
	
	
function getSchedule(){
	
	var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getdoctorscheduledetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      
      
      
// Get the table body element
var tableBody = document.querySelector(".table tbody");

// Function to generate table rows based on patient data

  tableBody.innerHTML = ""; // Clear existing rows

  responseData.forEach(function(schedule) {
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var daysCell = document.createElement("td");
    var timeCell = document.createElement("td");
    var statusCell = document.createElement("td");
    var actionCell = document.createElement("td");

    nameCell.innerHTML =  schedule.doctor;
    daysCell.textContent = schedule.available_days;
    timeCell.textContent = schedule.datetimepicker3 + ', ' + schedule.datetimepicker4;
    if(schedule.status==1){
    statusCell.textContent = "Active";
    statusCell.classList.add('custom-badge', 'status-green');
    }
    else{
		statusCell.textContent = "Deactive";
		statusCell.classList.add('custom-badge', 'status-red');
	}
    
    statusCell.style.fontSize = '10px';


    actionCell.innerHTML = `
      <div class="dropdown dropdown-action">
        <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="edit-patient.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
          <a class="dropdown-item data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onClick=deleteScheduleById("` + schedule.id + `")><i class="fa fa-trash-o m-r-5"></i> Delete</a>
        </div>
      </div>
    `;

    row.appendChild(nameCell);
    row.appendChild(daysCell);
    row.appendChild(timeCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

      
      
      }
	 };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
}







function getDepartment() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getdepartmentdetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  // xhr.setRequestHeader("Api-Key", getToken());

  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);

      var tableBody = document.querySelector(".table tbody");

      // Create a search input element
      var searchInput = document.createElement("input");
      searchInput.setAttribute("type", "text");
      searchInput.setAttribute("id", "searchInput");
      searchInput.setAttribute("placeholder", "Search...");

      // Find the parent element where you want to append the search input
      var parentElement = document.getElementById("parentContainer"); // Replace "parentContainer" with the actual ID of the parent element

      // Append the search input to the parent element
      parentElement.appendChild(searchInput);

      // Function to generate table rows based on department data
      function generateTable(searchTerm) {
        tableBody.innerHTML = ""; // Clear existing rows
        var count = 0;

        responseData.forEach(function (department) {
          if (department.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            var row = document.createElement("tr");
            var noCell = document.createElement("td");
            var nameCell = document.createElement("td");
            var statusCell = document.createElement("td");
            var actionCell = document.createElement("td");

            nameCell.textContent = department.name;
            noCell.textContent = ++count;
            statusCell.innerHTML = `<span class="custom-badge ${department.status === "Active" ? "status-green" : "status-red"}">${department.status}</span>`;

            actionCell.innerHTML = `
              <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="edit-appointment.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                  <a class="dropdown-item data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onClick="deleteDepartmentById('${department.id}')"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                </div>
              </div>
            `;

            row.appendChild(noCell);
            row.appendChild(nameCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
          }
        });
      }

      // Generate the initial table
      generateTable("");

      // Listen for input changes and update the table
      searchInput.addEventListener("input", function () {
        var searchTerm = searchInput.value.trim();
        generateTable(searchTerm);
      });
    } else {
      showAlert("Failed to fetch department details. Please try again.");
    }
  };

  xhr.onerror = function () {
    showAlert("An error occurred while making the request.");
  };

  xhr.send();
}


function getEmployeeDetails(){
	
	var xhr = new XMLHttpRequest();
  xhr.open("GET", "/Hospital_services/getemployeedetails", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
      
      
      
// Get the table body element
var tableBody = document.querySelector(".table tbody");

// Function to generate table rows based on patient data

  tableBody.innerHTML = ""; // Clear existing rows

  responseData.forEach(function(employee) {
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var empIDCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var phoneCell = document.createElement("td");
    var joiningdateCell = document.createElement("td");
    var roleCell = document.createElement("td");
    var actionCell = document.createElement("td");

    nameCell.innerHTML = `${employee.firstname}`;
    empIDCell.textContent = employee.id;
    emailCell.textContent = employee.email;
    phoneCell.textContent = employee.mobile;
    joiningdateCell.textContent = employee.joiningdate;
     roleCell.textContent = employee.designation;

    actionCell.innerHTML = `
      <div class="dropdown dropdown-action">
        <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="edit-patient.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>
          <a class="dropdown-item" href="#" onClick=deleteEmployeeById("` + employee.id + `")><i class="fa fa-trash-o m-r-5"></i> Delete</a>
        </div>
      </div>
    `;

    row.appendChild(nameCell);
    row.appendChild(empIDCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(joiningdateCell);
    row.appendChild(roleCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

      
      
      }
	 };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  xhr.send();
}



function getDoctorById(id){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/Hospital_services/finddocterdetailsbyid/"+id, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
      
      
      var responseData = JSON.parse(xhr.responseText);
console.log(responseData);

// Get the container element where the dynamic content will be added
var container = document.querySelector('.doctor-grid');
var data='';
// Iterate over the doctors array and create the dynamic HTML structure
for (var i = 0; i < responseData.length; i++) {
	var doctor = responseData[i];

	data=data+'<div class="col-md-12">\
                            <div class="profile-view">\
                                <div class="profile-img-wrap">\
                                    <div class="profile-img">\
                                        <a href="#"><img class="avatar" src="/Hospital_services/static/img/doctor-03.jpg" alt=""></a>\
                                    </div>\
                                </div>\
                                <div class="profile-basic">\
                                    <div class="row">\
                                        <div class="col-md-5">\
                                            <div class="profile-info-left">\
                                                <h3 class="user-name m-t-0 mb-0" id="name">'+doctor.firstname+' '+doctor.lastname+'</h3>\
                                                <small class="text-muted" id="designation">'+doctor.designation+'</small>\
                                                <div class="staff-id" id="empID">EMPLOYEE ID:'+doctor.id+'</div>\
                                                <div class="staff-msg"><a href="chat.html" class="btn btn-primary">Send Message</a></div>\
                                            </div>\
                                        </div>\
                                        <div class="col-md-7">\
                                            <ul class="personal-info">\
                                                <li>\
                                                    <span class="title" >Phone:</span>\
                                                    <span class="text"><a href="#" id="mobile">'+doctor.mobile+'</a></span>\
                                                </li>\
                                                <li>\
                                                    <span class="title">Email:</span>\
                                                    <span class="text"><a href="#" id="email">'+doctor.email+'</a></span>\
                                                </li>\
                                                <li>\
                                                    <span class="title" >Birthday:</span>\
                                                    <span class="text" id="dob">'+doctor.dob+'</span>\
                                                </li>\
                                                <li>\
                                                    <span class="title">Address:</span>\
                                                    <span class="text" id="address">'+doctor.address+'</span>\
                                                </li>\
                                                <li>\
                                                    <span class="title">Gender:</span>\
                                                    <span class="text" id="gender">'+doctor.gender+'</span>\
                                                </li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
                    


container.innerHTML=data;

}
}
      };
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  
  xhr.send();
  }
  

  
  function deleteDoctorById(id){
globalID=id

	
  }
  function confirmDoctorDelete(){
	$('.btn.btn-secondary[data-dismiss="modal"]').click();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deletedocterdetailsbyid/" + globalID, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            showAlert("Doctor details deleted successfully.");
            setTimeout(function() {
         location.reload();
    }, 600);
          
        } else {
            showAlert("Failed to delete doctor details.");
        }
    };

    xhr.onerror = function () {
        showAlert("Something went wrong. Please try again.");
    };

    xhr.send();
  }
  
  function getFormForUpdateDoctorDetail(strdata){
	   
	   fetchDepartments();
	  var doctor=JSON.parse(atob(strdata));
	  document.addEventListener('DOMContentLoaded', function () {
    const doctor = {
        image: doctor.image
    };

    // Get the image and file input elements
    const previewImage = document.getElementById('previewImage');
    const fileInput = document.getElementById('filephoto');

    // Set the current image as the preview
    previewImage.src = 'data:image/jpeg;base64,' + doctor.image;

    // Handle file input change to update the preview
    fileInput.addEventListener('change', function (event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                // Update the preview image source
                previewImage.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            // Reset the preview image
            previewImage.src = 'data:image/jpeg;base64,' + doctor.image;
        }
    });
});

	 // showAlert(doctor.id);
	 var image = new Image();

// Set the source of the image object to the data URL of the image
image.src = doctor.image;
	  var container = document.querySelector('.doctor-grid');
	var data='<div class="col-lg-8 offset-lg-2">\
                        <form onsubmit="return false;">\
                            <div class="row">\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>First Name <span class="text-danger">*</span></label>\
                                        <input class="form-control" type="text" id="firstname" value='+doctor.firstname+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Last Name</label>\
                                        <input class="form-control" type="text" id="lastname" value='+doctor.lastname+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Email <span class="text-danger">*</span></label>\
                                        <input class="form-control" type="email" id="email" value='+doctor.email+'></div>\
                                </div>\
                                      <div class="col-sm-6">\
                                    <div class="form-group gender-select">\
                                        <label class="gen-label">Gender:</label>\
                                        <div class="form-check-inline"><label class="form-check-label">\
                                            <input type="radio" id="gender" name="gender" class="form-check-input" value="Male"'+(doctor.gender === 'Male' ? ' checked' : '')+'/>Male</label>\
                                            </div>\
                                        <div class="form-check-inline">\
                                            <label path="gender" class="form-check-label">\
                                                <input path="gender" id="gender" type="radio" name="gender" class="form-check-input" value="Female"'+(doctor.gender === 'Female' ? ' checked' : '')+'/>Female\
                                            </label></div></div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Mobile No: <span class="text-danger">*</span></label>\
                                        <input class="form-control" type="text" id="mobile" value='+doctor.mobile+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
    <div class="form-group">\
        <label>Photo</label>\
        <div class="profile-upload">\
        <img id="previewImage" src="data:image/jpeg;base64,' + doctor.image + '" alt="Preview" style="max-width: 10%; height: 10%;">\
        <div class="upload-input">\
            <input type="file" class="form-control" id="filephoto">\
        </div>\
    </div>\
      </div>\
    </div>\
<div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Date of Birth</label>\
                                        <div class="cal-icon">\
                                            <input type="text" class="form-control datetimepicker" id="dob" value='+doctor.dob+'>\
                                        </div>\
                                    </div>\
                                </div>\
                                 <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Age <span class="text-danger">*</span></label>\
                                        <input class="form-control" type="text" id="age" value='+doctor.age+'>\
                                    </div>\
                                </div>\
								<div class="col-sm-12">\
									<div class="row">\
										<div class="col-sm-12">\
											<div class="form-group">\
												<label>Address</label>\
												<input type="text" class="form-control " id="address" value='+doctor.address+'>\
											</div>\
										</div>\
									</div>\
								</div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Department</label>\
                                        <select class="form-control " id="department">\
                                       <option value="">' + (doctor.department || 'Select') + '</option>\
                                        </select>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Designation</label>\
                                        <input class="form-control" type="text" id="designation" value='+doctor.designation+'>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="form-group">\
                                <label class="display-block">Status</label>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status" id="status" value="1" checked>\
									<label class="form-check-label" for="employee_active">\
									Active\
									</label>\
								</div>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status"  id="status"  value="0">\
									<label class="form-check-label" for="employee_inactive">\
									Inactive\
									</label>\
								</div>\
                            </div>\
                            <div class="m-t-20 text-center">\
                               <button  type="button" class="btn btn-primary submit-btn" onclick=updateDoctor('+doctor.id+')>Update Doctor</button>\
                                <button type="button" class="btn btn-secondary submit-btn" onclick=backToDoctor() >Back</button>\
                            </div>\
                        </form>\
                    </div>';
container.innerHTML=data;


   }
 
 
 function getFormForUpdatePatientDetail(patientData){
	
       document.getElementById("addPatientBtn").classList.add("hidden");
    

var parentContainer = document.getElementById("parentContainer");
parentContainer.style.display = "none";
	  var patient=JSON.parse(atob(patientData));
	
	  var container = document.querySelector('.doctor-grid');
	  
	  var data='<div class="row">\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>First Name <span \class="text-danger">*</span></label>\
                                        <input class="form-control" id="firstname" type="text" value='+patient.firstname+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Last Name</label>\
                                        <input class="form-control" id="lastname" type="text" value='+patient.lastname+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Tempreture <span \class="text-danger">*</span></label>\
                                        <input class="form-control" type="text"  id="tempreture" value='+patient.tempreture+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Email <span class="text-danger">*</span></label>\
                                        <input class="form-control" type="email" id="email" value='+patient.email+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Age</label>\
                                            <input type="text" id="age" class="form-control" value='+patient.age+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Phone </label>\
                                        <input class="form-control" type="text" id="mobile" value='+patient.mobile+'>\
                                    </div>\
                                </div>\
                                <div class="col-sm-6">\
									<div class="form-group gender-select">\
										<label class="gen-label">Gender:</label>\
										<div class="form-check-inline">\
											<label class="form-check-label">\
												<input type="radio" name="gender" id="gender" class="form-check-input"   value="Male"'+(patient.gender === 'Male' ? ' checked' : '')+'/>Male</label>\
										</div>\
										<div class="form-check-inline">\
											<label class="form-check-label">\
												<input type="radio" name="gender" id="gender" class="form-check-input"  value="Female"'+(patient.gender === 'Female' ? ' checked' : '')+' />Female</label>\
										</div>\
									</div>\
                                </div>\
                                <div class="col-sm-6">\
                                <div class="form-group">\
                                <label class="display-block">Status</label>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status" id="status" value="1" checked>\
									<label class="form-check-label" for="product_active">\
									Active\
									</label>\
								</div>\
								<div class="form-check form-check-inline">\
									<input class="form-check-input" type="radio" name="status"  id="status" value="0">\
									<label class="form-check-label" for="product_inactive">\
									Inactive\
									</label>\
								</div>\
                            </div>\
                            </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Weight</label>\
                                            <input type="text" id="weight" class="form-control" value='+patient.weight+'>\
                                        </div>\
                                    </div>\
                                <div class="col-sm-6">\
                                    <div class="form-group">\
                                        <label>Height</label>\
                                            <input type="text" id="height" class="form-control" value='+patient.height+'>\
                                        </div>\
                                    </div>\
                                <div class="col-sm-6">\
                                     <input style="display:none;" path="photo" id="photo" class="form-control" type="text" />\
                                    <div class="form-group">\
                                        <img src="data:image/jpeg;base64,' + patient.image + '" alt="Preview" style="max-width: 10%; height: 10%;">\
                                        <label>Photo</label>\
                                        <div class="profile-upload">\
                                            <div class="upload-input">\
                                                <input type="file" class="form-control" id="img" )">\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
								<div class="col-sm-12">\
											<div class="form-group">\
												<label>Address</label>\
												<input type="text" class="form-control" value='+patient.address+' id="address" >\
											</div>\
									</div>\
                             <div class="m-t-20 text-center">\
                                <button  type="button" class="btn btn-primary submit-btn" onclick=updatePatient('+patient.id+')>Update Patient</button>\
                                <button type="button" class="btn btn-secondary submit-btn" onclick=backToPatient() >Back</button>\
                            </div>\
                </div>\
                </div>';
	 container.innerHTML=data;
 }
 
 
 
 
 
 function deletePatientDetailById(id){
	 globalID=id;
 }
 function confirmPatientDelete(){
	    $('.btn.btn-secondary[data-dismiss="modal"]').click();
	 var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deletepatientdetailsbyid/" + globalID, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = function () {
		if(xhr.status >= 500 ){
			showAlert("Please Check is there any appointment Book for this Patient");
		}
        if (xhr.status >= 200 && xhr.status < 300) {
		 showAlert("Patients details deleted successfully.");
            
             setTimeout(function() {
         location.reload();
    }, 600);
          
        } else {
            showAlert("Please Check is there any appointment Book for this Patient.");
        }
    };

    xhr.onerror = function () {
        showAlert("Something went wrong. Please try again.");
    };

    xhr.send();
 }
 
 
 function deleteAppointmentById(id){
	 
globalID=id;
 }
 function confirmAppointmentDelete(){
	     $('.btn.btn-secondary[data-dismiss="modal"]').click();
	 var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deleteappointmentdetailsbyid/" + globalID, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = function () {	
        if (xhr.status >= 200 && xhr.status < 300) {
		 showAlert("Appointment  deleted successfully.");
            
             setTimeout(function() {
         location.reload();
    }, 600);
          
        } else {
            showAlert("Please Check is there any appointment Book for this Patient.");
        }
    };

    xhr.onerror = function () {
        showAlert("Something went wrong. Please try again.");
    };

    xhr.send();

	 
 }
 
 function deleteScheduleById(id){
	 
globalID=id;
	 
 }
 function confirmScheduleDelete(){
	 $('.btn.btn-secondary[data-dismiss="modal"]').click();
var xhr = new XMLHttpRequest();
xhr.open("POST", "/deletedoctorscheduledetailsbyid/" + globalID, true);
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            showAlert("Schdule Deleted Successfully..");
            setTimeout(function() {
       location.reload();
    }, 600);
           
        } else {
            // Request failed
            showAlert("Something went wrong. Please try again.");
        }
    }
};

xhr.send();

   
 }
 
 
 function deleteDepartmentById(id){
	 
 globalID=id;
 }
 function confirmDepartmentDelete(){
	 $('.btn.btn-secondary[data-dismiss="modal"]').click();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/deletedepartmentdetailsbyid/" + globalID, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            showAlert("Department details deleted successfully.");
            setTimeout(function() {
         location.reload();
    }, 600);
          
        } else {
            showAlert("Failed to delete Department details.");
        }
    };

    xhr.onerror = function () {
        showAlert("Something went wrong. Please try again.");
    };

    xhr.send();
 }
 
 
 
 function deleteEmployeeById(id){
	   if (confirm("Are you sure want to delete this Appointment Details!")) {
    
 
	  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/Hospital_services/deleteemployeedetailsbyid/"+id, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	  
	  
	
  xhr.onerror = function () {
    showAlert("Something went wrong. Please try again.");
  };
  
  xhr.send();
  location.reload();
   } else {
      location.reload();
  }
 }
 
 /*
 
 ------------------------UPDATE CALL------------------
 
 */

 
 
 function updatePatient(id){
	 var data = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value,
             mobile: document.getElementById("mobile").value,
             tempreture: document.getElementById("tempreture").value,
            address: document.getElementById("address").value,
            weight: document.getElementById("weight").value,
            height: document.getElementById("height").value,
           gender: document.getElementById("gender").value,
           status: document.getElementById("status").value
        }
         var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Hospital_services/updatepatientdetailbyid/"+id, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
       // BusyCursor();
       
       
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText.toString().trim());
              
                var jobj = JSON.parse(xhr.responseText.toString().trim());
                if (jobj["data"] == "success") {
                    showAlert("Patient Details Save Successfully");
                   // window.location.reload();
                } else {
                    showAlert("Patient Details Not Save Try Again");
                }

            }
        });
 }
 
 
 function fetchDiagnosis() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var responseData = JSON.parse(xhr.responseText);

                    var diagnosisDropdown = document.getElementById('diagnosis'); // Change ID if necessary
                    var diagnosisOptions = responseData; // Adjust this based on your actual response structure

                    // Clear existing options
                    diagnosisDropdown.innerHTML = '';

                    // Populate Diagnosis dropdown
                    for (var i = 0; i < diagnosisOptions.length; i++) {
                        var option = document.createElement('option');
                        option.value = diagnosisOptions[i].diagnosisname; // Replace with the actual value from your service
                        option.text = diagnosisOptions[i].diagnosisname;   // Replace with the actual text from your service
                        diagnosisDropdown.add(option);
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                }
            } else {
                console.error('Error fetching diagnosis details:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', '/getdiagnosis', true);
    xhr.send();
}

function fetchSymtoms() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var responseData = JSON.parse(xhr.responseText);

                    var diagnosisDropdown = document.getElementById('symptoms'); // Change ID if necessary
                    var diagnosisOptions = responseData; // Adjust this based on your actual response structure

                    // Clear existing options
                    diagnosisDropdown.innerHTML = '';

                    // Populate Diagnosis dropdown
                    for (var i = 0; i < diagnosisOptions.length; i++) {
                        var option = document.createElement('option');
                        option.value = diagnosisOptions[i].symtomsName; // Replace with the actual value from your service
                        option.text = diagnosisOptions[i].symtomsName;   // Replace with the actual text from your service
                        diagnosisDropdown.add(option);
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                }
            } else {
                console.error('Error fetching diagnosis details:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', '/getsymptoms', true);
    xhr.send();
}

function fetchPrescription() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var responseData = JSON.parse(xhr.responseText);

                    var diagnosisDropdown = document.getElementById('prescription'); // Change ID if necessary
                    var diagnosisOptions = responseData; // Adjust this based on your actual response structure

                    // Clear existing options
                    diagnosisDropdown.innerHTML = '';

                    // Populate Diagnosis dropdown
                    for (var i = 0; i < diagnosisOptions.length; i++) {
                        var option = document.createElement('option');
                      option.value = diagnosisOptions[i].prescriptionname + " " + "dosage" + " " + diagnosisOptions[i].dosage; // Replace with the actual value from your service
                        option.text = diagnosisOptions[i].prescriptionname + " " + "dosage" + " " + diagnosisOptions[i].dosage;   // Replace with the actual text from your service
                        diagnosisDropdown.add(option);
                    }
                } catch (error) {
                    console.error('Error parsing JSON response:', error);
                }
            } else {
                console.error('Error fetching diagnosis details:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', '/getprescription', true);
    xhr.send();
}
 
 function getPatientReport(id)
 {
var xhr = new XMLHttpRequest();
  xhr.open("GET", "/getpatienthistory/"+id, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    var container = document.querySelector('.patient-report');
  //xhr.setRequestHeader("Api-Key", getToken());
  xhr.onload = function () {
    if (xhr.status === 200) {
var responseData = JSON.parse(xhr.responseText);
fetchDoctors() ;
fetchDiagnosis();
fetchSymtoms();
fetchPrescription();
  var data = '<div class="row">\
    <div class="col-md-12">\
        <div class="card">\
            <div class="card-body">\
                <div class="row custom-invoice">\
                    <div class="col-6 col-sm-6 m-b-20">\
                        <img src="/Hospital_services/static/img/logo-dark.png" class="inv-logo" alt="">\
                        <ul class="list-unstyled">\
                            <li>PreClinic</li>\
                            <li>3864 Quiet Valley Lane,</li>\
                            <li>Sherman Oaks, CA, 91403</li>\
                            <li>GST No:</li>\
                        </ul>\
                    </div>\
                    <div class="col-6 col-sm-6 m-b-20">\
                        <div class="invoice-details">\
                            <h3 class="text-uppercase">Patien ID:'+id+'</h3>\
                            <ul class="list-unstyled">\
                                <li>Registration Date:<span>'+responseData[0].created_at+'</span></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-6 col-lg-6 m-b-20">\
                        <h5>Patient Details:</h5>\
                        <ul class="list-unstyled">\
                            <li>\
                                <h5><strong>Name:'+responseData[0].firstname+' '+responseData[0].lastname+'</strong></h5>\
                            </li>\
                            <li><span>Mobile:'+responseData[0].mobile+'</span></li>\
                            <li>Tempreture:'+responseData[0].tempreture+'</li>\
                            <li>Weight:'+responseData[0].weight+'</li>\
                            <li>Height:'+responseData[0].height+'</li>\
                            <li>Age:'+responseData[0].age+'</li>\
                            <li>Email:'+responseData[0].email+'</li>\
                            <li>Address:'+responseData[0].address+'</li>\
                        </ul>\
                    </div>\
 <div class="col-md-6">\
                                    <div class="form-group">\
                                        <label>Doctor</label>\
                                        <select class="form-control " id="doctorname">\
                                        </select>\
                                    </div>\
							<div class="form-group">\
                            <label>Symptoms</label>\
                            <select class="form-control" multiple id="symptoms">\
                                <option>Select Symptoms</option>\
        <option>Cold</option>\
                            </select>\
                        </div>\
                        <div class="form-group">\
                            <label>Diagnosis</label>\
                            <select class="form-control" multiple id="diagnosis">\
                                <option>Select Diagnosis</option>\
                                <option>AFI- Acute febrile illness</option>\
                            </select>\
                        </div>\
                         <div class="form-group">\
                            <label>Prescription</label>\
                            <select class="form-control" multiple id="prescription">\
                                <option>Select prescription</option>\
                                <option>AFI- Acute febrile illness</option>\
                            </select>\
                        </div>\
                        <div class="form-group">\
                            <label>Bill Amount<span class="text-danger">*</span></label>\
                            <input class="form-control" id="amount" type="text" >\
                        </div>\
                        <div class="form-group">\
                            <button class="btn btn-primary submit-btn" id="btn" >add</button>\
                        </div>\
</div>';
var tableHTML = '<div class="table-responsive">' +
                '<table class="table table-striped table-hover">' +
                '<thead>' +
                '<tr>' +
                '<th>#</th>' +
                '<th>Date</th>' +
                '<th>Symptoms</th>' +
                '<th>Diagnosis</th>' +
                '<th>Prescription</th>' +
                '<th>Doctor Name</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

 for (var i = 0; i < responseData[0].patientHistory.length; i++) {
  var entry = responseData[0].patientHistory[i];
  tableHTML += '<tr>' +
               '<td>' + (i + 1) + '</td>' +
               '<td>' + entry.created_at + '</td>' +
               '<td>' + entry.symptoms + '</td>' +
               '<td>' + entry.diagnosis + '</td>' +
               '<td>' + entry.prescription + '</td>' +
               '<td>' + entry.doctor_name + '</td>' +
               '</tr>';
}

tableHTML += '</tbody>' +
             '</table>' +
             '</div>';

var container = document.querySelector('.patient-report');
data += tableHTML;
container.innerHTML = data;

    	 var select2Script = document.createElement('script');
select2Script.src = '/static/js/select2.min.js';
select2Script.onload = function() {
  // Initialize Select2 on the dynamically generated selectElement
  const selectElement1 = document.getElementById('symptoms');
  $(selectElement1).select2();
  const selectElement2 = document.getElementById('diagnosis');
  $(selectElement2).select2();
  const selectElement3 = document.getElementById('prescription');
  $(selectElement3).select2();
  
};

document.head.appendChild(select2Script);



       }
       
       //add patient history data at table
 document.getElementById("btn").onclick = function() {
      
      var selectedsymptoms = document.getElementById("symptoms");
    var symptoms = [];
       for (var i = 0; i < selectedsymptoms.options.length; i++) {
    var option = selectedsymptoms.options[i];
  
  if (option.selected) {
    symptoms.push(option.value);
  }
}

  var selecteddiagnosis = document.getElementById("diagnosis");
    var diagnosis = [];
       for (var i = 0; i < selecteddiagnosis.options.length; i++) {
    var option = selecteddiagnosis.options[i];
  
  if (option.selected) {
    diagnosis.push(option.value);
  }
}
 var selectedprescription= document.getElementById("prescription");
    var prescription = [];
       for (var i = 0; i < selectedprescription.options.length; i++) {
    var option = selectedprescription.options[i];
  
  if (option.selected) {
    prescription.push(option.value);
  }
}
      
       var data = {
		   symptoms: symptoms,
		   diagnosis: diagnosis,
            prescription: prescription,
            doctor_name: document.getElementById("doctorname").value,
             bill_amount: document.getElementById("amount").value,
            patient: {
    id: id
  }
        }
         var xhr = new XMLHttpRequest();
        xhr.open("POST", "/savepatienthistory", true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhr.setRequestHeader("Api-Key", getToken());
        xhr.send(JSON.stringify(data));
         showAlert("Patient Details  Save Successfully");
    window.location.reload();
       
       
        xhr.addEventListener("loadend", function () {
           
        });
        xhr.addEventListener("error", function () {
           
            showAlert("Something Went Wrong, Tray Again.");
        });
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText.toString().trim());
              
                var jobj = JSON.parse(xhr.responseText.toString().trim());
                if (jobj["data"] == "success") {
                } else {
                    showAlert("Patient Details  Not Save Try Again");
                }
   
            }
        });
 
      
      
    };
    
 

       };
  xhr.send();

 }


        function fetchDepartments() {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);

                        // 'data' should be an array of department objects returned by the service.
                        // Assuming 'data' is an array, you can iterate through it and append
                        // each department name as an <option> element to the select element.
                        const selectElement = document.getElementById('department');
                        data.forEach(department => {
                            const option = document.createElement('option');
                            option.value = department.name; // You can use department ID as the value if needed.
                            option.text = department.name; // Use the department name as the option text.
                            selectElement.appendChild(option);
                        });
                    } else {
                        console.error('Error fetching departments:', xhr.statusText);
                    }
                }
            };

            xhr.open('GET', "/getdepartmentdetails", true);
            xhr.send();
        }

        // Call the function to fetch departments when the page loads or whenever appropriate.
        document.addEventListener('DOMContentLoaded', function () {
            fetchDepartments();
        });


 function isNumberKey(evt) {
		       var charCode = (evt.which) ? evt.which : evt.keyCode;

    // Allow digits (0-9), backspace (8), and decimal point (46 or 110)
    if ((charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 46 || charCode === 110) {
        return true;
    }

    // Prevent any other character input
    return false;
		    }
		    
		     function previewImage(event) {
        const fileInput = event.target;
        const photoPreview = document.getElementById("photoPreview");

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageDataUrl = e.target.result;
                const img = document.createElement("img");
                img.setAttribute("src", imageDataUrl);
                img.setAttribute("style", "max-width: 100%; max-height: 200px;"); // Set max width and height for the preview
                photoPreview.innerHTML = ""; // Clear any previous preview
                photoPreview.appendChild(img); // Append the image preview to the container
            };

            reader.readAsDataURL(fileInput.files[0]);
        } else {
            photoPreview.innerHTML = ""; // Clear the preview if no file selected
        }
    }

    // Simulating the image string received from the server
    const imageStringFromServer = "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"; // Replace this with the actual image string received from the server
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", imageStringFromServer);
    imgElement.setAttribute("style", "max-width: 100%; max-height: 200px;"); // Set max width and height for the preview
    document.getElementById("photoPreview").appendChild(imgElement);

    

    // Function to fetch doctor data from the service
    function fetchDoctors() {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const selectElement = document.getElementById('doctorname');

                    data.forEach(doctor => {
                        const option = document.createElement('option');
                        option.value = doctor.firstname; // Use the doctor's ID as the value if needed.
                        option.textContent = doctor.firstname + ' ' + doctor.lastname; // Combine first and last names.
                        selectElement.appendChild(option);
                    });
                } else {
                    console.error('Error fetching doctor details:', xhr.statusText);
                }
            }
        };

        xhr.open('GET', '/getdocterdetails', true);
        xhr.send();
    }


function searchPatient() {
    var patientIdString = document.getElementById("patientId").value;
    var patientId = parseInt(patientIdString, 10);
    if (isNaN(patientId)) {
        showAlert("Please enter a valid patient ID.");
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (Object.keys(data).length === 0) {
                    showAlert("Patient not found !  with this ID ");
                document.getElementById("name").value = "";
                document.getElementById("mobile").value ="";
                document.getElementById("email").value = "";
                document.getElementById("address").value = "";
                document.getElementById("invoicedate").value = "";
                document.getElementById("amount").value = "";
                }
            const lastPatientHistory = data[0].patientHistory[data[0].patientHistory.length - 1];
            const lastBillAmount = lastPatientHistory.bill_amount;
                document.getElementById("name").value =  data[0].firstname + " "  +data[0].lastname ;
                document.getElementById("mobile").value =data[0].mobile;
                document.getElementById("email").value = data[0].email;
                document.getElementById("address").value = data[0].address;
                document.getElementById("amount").value = lastBillAmount;

                console.log(data);
            } else {
                console.error('Error fetching patient details:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', '/getpatienthistory/' + patientId, true);
    xhr.send();
}



/*

function getValues(){
	let rowCount = 0;
    const tableBody = document.querySelector('tbody');
    const newRow = document.querySelector('tr').cloneNode(true);
    
    // Increment the row count and update the "id" attribute of the "amount" field
    rowCount++;
    newRow.querySelector('#amount0').id = `amount${rowCount}`;
    
    // Clear the input values in the cloned row if needed
    newRow.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    
    tableBody.appendChild(newRow);
}

function removeRow(element) {
    element.closest('tr').remove();
}*/

function amount(row) {
    // Retrieve the value of the "amount" field for a specific row
    const amountField = document.getElementById(`amount${row}`);
    const amountValue = amountField.value;
    showAlert(`Amount for Row ${row}: ${amountValue}`);
}
/*
function validateNumber(input) {
    // Your number validation logic here
}*/


function amount(){
      // Get all the rows within the table
    const rows = document.querySelectorAll('table tr');

    // Loop through each row (skip the first row with headers)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const inputs = row.querySelectorAll('input[type="text"]');

        // Get the input elements for td3, td4, and td5
        const td3Input = inputs[2];
        const td4Input = inputs[3];
        const td5Input = inputs[4];

        // Parse the values from the input elements as integers
        const td3Value = parseInt(td3Input.value, 10) || 0; // Use 0 if value is not a valid integer
        const td4Value = parseInt(td4Input.value, 10) || 0;

        // Calculate the product of td3 and td4
        const product = td3Value * td4Value;

        // Set the calculated product in td5
        td5Input.value = product;
    }
}


function saveInvoice(callback) {
	
  var data = {
    patientId: document.getElementById("patientId").value,
    billing_address: document.getElementById("billingaddress").value,
    patientname: document.getElementById("name").value,
    patient_no: document.getElementById("mobile").value,
    patient_email: document.getElementById("email").value,
    patient_address: document.getElementById("address").value,
    grand_total: document.getElementById("amount").value
  };


console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/saveinvoice", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.addEventListener("loadend", function () {
    // This event is fired when the request has completed (whether it was successful or not).
    // You can use it for cleanup or additional logic.
  });

  xhr.addEventListener("error", function () {
    showAlert("Something Went Wrong, Try Again.");
  });

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
          callback();
        
      } else {
        showAlert("Request failed with status: " + xhr.status);
      }
    }
  });

  xhr.send(JSON.stringify(data));
}

  
function savePrint() {
  // Call saveInvoice() with a callback
  saveInvoice(function () {
    var id = document.getElementById("patientId").value;

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the request method (GET) and the URL you want to fetch
    xhr.open('GET', "/generatePdf/" + id, true);

    // Set up an event handler to handle the response
    xhr.responseType = 'blob'; // Set the response type to Blob
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { // Check if the request is complete
        if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
          // The response is available in xhr.response
          var blob = xhr.response;

          // Create a URL for the blob
          var url = window.URL.createObjectURL(blob);

          // Create a link element for downloading the PDF
          var a = document.createElement('a');
          a.href = url;
          a.download = 'generated.pdf'; // Specify the file name

          // Trigger a click event on the link to start the download
          a.click();

          // Clean up by revoking the URL
          window.URL.revokeObjectURL(url);

          // Continue with any other code you want to execute after the download
          // This is where you can place code to execute after the download is complete
        } else {
          // Handle the error, xhr.status contains the HTTP status code
          console.error('Request failed with status:', xhr.status);
        }
      }
    };

    // Send the request
    xhr.send();
  });
}

function getInvoice() {
  var xhr = new XMLHttpRequest();
  var container = document.getElementById('container'); // Assuming you have an HTML element with id 'container' to display the data
  var data='';
  xhr.open("GET", "/getinvoice", true);
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);
        for (var i = 0; i < responseData.length; i++) {
	var invoice = responseData[i];
	
        data=data+' <tr>\
                                        <td>'+invoice.id+'</td>\
                                        <td><a href="invoice-view.html">INV-'+invoice.id+'</a></td>\
                                        <td>'+invoice.patientname+'</td>\
                                        <td>'+invoice.created_at+'</td>\
                                        <td>'+invoice.grand_total+'</td>\
                                        <td class="text-right">\
                                            <div class="dropdown dropdown-action">\
                                                <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>\
                                                <div class="dropdown-menu dropdown-menu-right">\
                                                    <a class="dropdown-item" href="edit-invoice.html"><i class="fa fa-pencil m-r-5"></i> Edit</a>\
                                                    <a class="dropdown-item" href="invoice-view.html"><i class="fa fa-eye m-r-5"></i> View</a>\
                                                   <a class="dropdown-item"  onClick=downloadPdfById('+invoice.id+')><i class="fa fa-file-pdf-o m-r-5" ></i> Download</a>\
													<a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_invoice"><i class="fa fa-trash-o m-r-5"></i> Delete</a>\
                                                </div>\
                                            </div>\
                                        </td>\
                                    </tr>';
        container.innerHTML=data;
        
     }   
        
      } else {
        console.error("Request failed with status: " + xhr.status);
      }
    }
  };

  xhr.send();
}


function downloadPdfById(id){
	showAlert(id);
	var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "/generatePdfById/"+id);

    // Set up an event handler to handle the response
    xhr.responseType = 'blob'; // Set the response type to Blob
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { // Check if the request is complete
        if (xhr.status === 200) { // Check if the request was successful (HTTP status code 200)
          // The response is available in xhr.response
          var blob = xhr.response;

          // Create a URL for the blob
          var url = window.URL.createObjectURL(blob);

          // Create a link element for downloading the PDF
          var a = document.createElement('a');
          a.href = url;
          a.download = 'generated.pdf'; // Specify the file name

          // Trigger a click event on the link to start the download
          a.click();

          // Clean up by revoking the URL
          window.URL.revokeObjectURL(url);

          // Continue with any other code you want to execute after the download
          // This is where you can place code to execute after the download is complete
        } else {
          // Handle the error, xhr.status contains the HTTP status code
          console.error('Request failed with status:', xhr.status);
        }
      }
    };

    // Send the request
    xhr.send();
  }

//--------------------------------Add details--------------------------------
function checkSelection() {
    // Get the selected value
    var selectedValue = document.getElementById("SelectType").value;

    // Check the selected value
    switch (selectedValue) {
      case "Select":
        console.log("Please select an option");
        break;
      case "Add Symptoms":
        console.log("Add Symptoms selected");
         var container = document.getElementById('addData'); 
         var data='';
        
         data=data+'<div class="form-group">\
                                        <label>Add Symptoms</label>\
                                        <input class="form-control" type="text" id="symptoms" required>\
                                        <button  class="btn btn-primary  data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onclick=\'addSymptomsRecord("symptoms")\' >Add</button>\
                                    </div>';
        container.innerHTML=data;
        break;
      case "Add Diagnosis":
        console.log("Add Diagnosis selected");
        var container = document.getElementById('addData'); 
         var data='';
        
         data=data+'<div class="form-group">\
                                        <label>Add Diagnosis</label>\
                                        <input class="form-control" type="text" id="diagnosis" required>\
                                        <button  class="btn btn-primary  data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onclick=\'addSymptomsRecord("diagnosis")\'>Add</button>\
                                    </div>';
        container.innerHTML=data;
        break;
      case "Add Prescription":
        console.log("Add Prescription selected");
        var container = document.getElementById('addData'); 
         var data='';
        
         data=data+'<div class="form-group">\
                                        <label>Add prescription </label>\
                                        <input class="form-control" type="text" id="Prescription" required>\
                                        <label>Dosage </label>\
                             <input class="form-control" type="text" id="Dosage" required onkeypress="return onlyNumberKey(event)">\
                                        <button   class="btn btn-primary  data-toggle="modal" data-target="#confirmationModal" href="#" data-toggle="modal" data-target="#delete_schedule" onclick=\'addSymptomsRecord("prescription")\'>Add</button>\
                                    </div>';
        container.innerHTML=data;
        break;
      default:
        console.log("Invalid selection");
    }
  }
  function onlyNumberKey(evt) {
    // Check if the pressed key is a number
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      // Prevent the input if the key is not a number
      evt.preventDefault();
      return false;
    }
    return true;
  }
  
function addSymptomsRecord(data) {
	globalData=data;

}
function confirmRecords(){
	if(globalData === "symptoms"){
		  var symptomsValue = document.getElementById('symptoms').value;
  if(symptomsValue == ""){
	  showAlert("Enter Details!");
	  return;
  }
  console.log(symptomsValue);

  var data = {
    symtomsName: symptomsValue
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/savesymptoms", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
		  $('.btn.btn-secondary[data-dismiss="modal"]').click();
        showAlert("Details Added Sucessfully");
        document.getElementById('symptoms').value="";
      } else {
        showAlert("Failed to save patient. Something went wrong, please try again.");
      }
    }
  };

  xhr.send(JSON.stringify(data));
	}
	else if(globalData==="diagnosis"){
			var diagnosisValue = document.getElementById('diagnosis').value;
  if(diagnosisValue == ""){
	  showAlert("Enter Details!");
	  return;
  }
  console.log(diagnosisValue);

  var data = {
    diagnosisname: diagnosisValue
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/saveDiagnosis", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
		  $('.btn.btn-secondary[data-dismiss="modal"]').click();
        showAlert("Details Added Sucessfully");
        document.getElementById('diagnosis').value="";
      } else {
        showAlert("Failed to save patient. Something went wrong, please try again.");
      }
    }
  };

  xhr.send(JSON.stringify(data));
		
		
		
	}
	else{
	
		var prescriptionValue = document.getElementById('Prescription').value;
		var dosagesValue = document.getElementById('Dosage').value;
  if(prescriptionValue == "" || dosagesValue=="" ){
	  showAlert("Enter Details!");
	  return;
  }

  var data = {
    prescriptionname: prescriptionValue,
    dosage:dosagesValue
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/savePrescription", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
		  $('.btn.btn-secondary[data-dismiss="modal"]').click();
        showAlert("Details Added Sucessfully");
        document.getElementById('Prescription').value="";
         document.getElementById('Dosage').value="";
      } else {
        showAlert("Failed to save patient. Something went wrong, please try again.");
      }
    }
  };

  xhr.send(JSON.stringify(data));
		
	}
}
  


function logout() {
    // Remove the token from session storage or any other logout-related tasks
    sessionStorage.removeItem('token');
    
    // Redirect the user to port 8083 on localhost
    window.location.href = 'http://localhost:8083'; 
}

function registration() {
	$('#login').hide();
	$('#register').show();
	
   
}

function loginPage(){
	$('#login').show();
	$('#register').hide();
}
function signUp(){
	  var name=document.getElementById('name').value;
      var password=document.getElementById('password').value;
      var conPassword=document.getElementById('confirmPassword').value;
      var role=document.getElementById('role').value;
      // WARNING: For POST requests, body is set to null by browsers.
var data = JSON.stringify({
  "username": name,
  "password": password,
  "role": [
    role
  ],
  "active": 1
});

console.log(data);
return;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "/api/auth/signup");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
}


