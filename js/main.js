$("#appointment-form").hide();
$("#schedule_form").hide();
$("#employees_form").hide();
$("#employee_page1").hide();
$("#department-form").hide();
$("#employee_change").hide();
$("#leaves_change").hide();
$("#holiday_change").hide();
$("#attendance_change").hide();
$("#invoice_content").hide();

function dashboardPage() {
  $("#dashboard_page").show();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#doctor_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#dashboard_li").addClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}
function doctorPage() {
  $("#dashboard_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#doctor_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#doctor_li").addClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function patientPage() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#patient_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#patient_li").addClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function appointmentPage() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#appointment_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#appointment_li").addClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function schedulePage() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#schedule_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#schedule_li").addClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function departmentPage() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#department_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").addClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function addDoctor() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_patient_page").hide();
  $("#add_doctor_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").addClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function addPatient() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").show();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").addClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function Employeespage() {
  // $("#dashboard_page").hide();
  // $("#employee_page1").hide();
  // $("#doctor_page").hide();
  // $("#patient_page").hide();
  // $("#appointment_page").hide();
  // $("#schedule_page").hide();
  // $("#department_page").hide();
  // $("#add_doctor_page").hide();
  // $("#add_patient_page").hide();
  // $("#employee_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").addClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function Employeeslistbar() {
  $("#employee_change").show();
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#Employeeslist1").addClass("active");
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function leaveslist() {
  $("#leaves_change").show();
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").addClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("Invoice").removeClass("active");
  $("payment").removeClass("active");
  $("payrolls").removeClass("active");
}

function holidayslist() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").show();
  $("#attendance_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").addClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function attendancelist() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#leaves_change").hide();
  $("#holiday_change").hide();
  $("#attendance_change").show();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").addClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function Accountspage() {
  // $("#dashboard_page").hide();
  // $("#doctor_page").hide();
  // $("#patient_page").hide();
  // $("#appointment_page").hide();
  // $("#schedule_page").hide();
  // $("#department_page").hide();
  // $("#add_doctor_page").hide();
  // $("#add_patient_page").hide();
  // $("#employee_page1").hide();
  // $("#employee_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").addClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function Invoices() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#invoice_content").show();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").addClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").removeClass("active");
}

function payments() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").addClass("active");
  $("#payrolls").removeClass("active");
}

function payrollpage() {
  $("#dashboard_page").hide();
  $("#doctor_page").hide();
  $("#patient_page").hide();
  $("#appointment_page").hide();
  $("#schedule_page").hide();
  $("#department_page").hide();
  $("#add_doctor_page").hide();
  $("#add_patient_page").hide();
  $("#employee_page1").hide();
  $("#employee_change").hide();
  $("#dashboard_li").removeClass("active");
  $("#doctor_li").removeClass("active");
  $("#patient_li").removeClass("active");
  $("#appointment_li").removeClass("active");
  $("#schedule_li").removeClass("active");
  $("#department_li").removeClass("active");
  $("#employee_li").removeClass("active");
  $("#Employeeslist1").removeClass("active");
  $("#Leavesnow").removeClass("active");
  $("#holiday").removeClass("active");
  $("#attendance").removeClass("active");
  $("#Accounts-li").removeClass("active");
  $("#Invoice").removeClass("active");
  $("#payment").removeClass("active");
  $("#payrolls").addClass("active");
}
//appoinmentformshowhide
function formappoinment() {
  $("#appointment-form").show();
  $("#appointment-tabal").hide();
  $("#Appointmentbtn").hide();
}
function backappointmentform() {
  $("#appointment-form").hide();
  $("#appointment-tabal").show();
  $("#Appointmentbtn").show();
}
//scheduleformshowhide
function addscheduleform() {
  $("#schedule_form").show();
  $("#schedule_table").hide();
  $("#schedule_btn").hide();
}
function backToSchedule() {
  $("#schedule_form").hide();
  $("#schedule_table").show();
  $("#schedule_btn").show();
}

//departmentformshowhide
function departmentform() {
  $("#department-form").show();
  $("#department-table").hide();
  $("#department-btn").hide();
}
function backToDepartment() {
  $("#department-form").hide();
  $("#department-table").show();
  $("#department-btn").show();
}

//emploeesformshowhide
function Employeestap() {
  $("#employees_form").show();
  $("#Employees_tab").hide();
  $("#Employees_btn").hide();
}

function Employeesbackbtn() {
  $("#employees_form").hide();
  $("#Employees_tab").show();
  $("#Employees_btn").show();
}

function saveDoctor() {
  var obj = {
    firstname: $("#doctor-firstname").val(),
    lastname: $("#doctor-lastname").val(),
    email: $("#doctor-email").val(),
    gender: $("#doctor-gender input[type='radio']:checked").val(),
    mobile: $("#doctor_mobile").val(),
    photo: $("#doctor-photo input[type='radio']:checked").val(),
    dateofbirth: $("#doctor-dob").val(),
    age: $("#doctor-age").val(),
    address: $("#doctor-address").val(),
    department: $("#doctor-department").val(),
    designation: $("#doctor-designation").val(),
    status: $("#doctor-status input[type='radio']:checked").val(),
  };
  console.log(obj);
}

///patientform data in console
function savePatient() {
  var obj = {
    firstname: $("#patient-firstname").val(),
    lastname: $("#patient-lastname").val(),
    photo: $("#patient-photo input[type='radio']:checked").val(),
    teppreture: $("#patint-tempreture").val(),
    email: $("#patint-email").val(),
    age: $("#patint-age").val(),
    mobile: $("#patint-mobile").val(),
    status: $("#patint-status input[type='radio']:checked").val(),
    aadharno: $("#patint-aadharNo").val(),
    gender: $("#patint-gender input[type='radio']:checked").val(),
    weight: $("#patint-weight").val(),
    height: $("#patint-height").val(),
    address: $("#patint-address").val(),
  };

  console.log(obj);
}

///appointmentform data in console
function saveappointmentform() {
  var obj = {
    AppointmentID: $("#appointmentID-val").val(),
    PatientName: $("#appointment-PatientName").val(),
    Department: $("#appointment-Department").val(),
    Doctor: $("#appointment-Doctor").val(),
    date: $("#appointment-date").val(),
    time: $("#datetimepicker3").val(),
    PatientEmail: $("#appointment-PatientEmail").val(),
    PatientPhoneNumber: $("#appointment-PatientPhoneNumber").val(),
    message: $("#appointment-message").val(),
    status: $("#Appointment-Status input[type='radio']:checked").val(),
  };

  console.log(obj);
}

//scheduleform data in console
function saveschedule() {
  var obj = {
    DoctorName: $("#schdule-doctorname").val(),
    AvailableDays: $("#schdule-availabledays").val(),
    StartTime: $("#schdule-datetimepicker3").val(),
    EndTime: $("#schdule-datetimepicker4").val(),
    message: $("#schdule-message").val(),
    schdulestatus: $("#schdule-status input[type='radio']:checked").val(),
  };
  console.log(obj);
}

///Departmentform data in consol//
function savedepartment() {
  var object = {
    Department: $("#department-name").val(),
    description: $("#department-description").val(),
    DepartmentStatus: $("#Department-Status input[type='radio']:checked").val(),
  };
  // if(obj.Department==""){

  //     $("#department-name").addClass("error");
  //     return;
  // }
  // else{
  //     $("#department-name").removeClass("error");
  // }
  console.log(object);
}
