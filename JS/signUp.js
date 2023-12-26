/*
 * Route - Frontend
 * JS program Week 8
 * Smart Login Web APP
 * JS + Bootstrap
 * 23/12/2023
 * SignUp page JS
 */

// Global varaibles
var signNameInput = document.getElementById("signNameInput");
var signEmailInput = document.getElementById("signEmailInput");
var signPassInput = document.getElementById("signPassInput");
var signBtn = document.getElementById("signBtn"); // Sign up button
var warningBoxSignout = document.getElementById("warningBox-signout"); //Validation MSG Box after pressin' sign out
var warningBoxMsgSignout = document.getElementById("warningBoxMsg-signout");
// Array from Parts of full name guiding msgs for the user
var nameSpanArr = Array.from(document.querySelectorAll(".namecheck"));
var usersArr = []; //Array to save registered users
if (localStorage.getItem("users") != null) {
  usersArr = JSON.parse(localStorage.getItem("users"));
}

// RegeX
var nameRegex = /^[a-zA-Z]{3,}\s(?:[a-zA-Z]{3,}\s?){2,3}$/; // Full name at least 3 letters each
var emailRegex = /^[\w-\.]+@([\w-]{2,}\.)+[\w-]{2,4}$/;
//Password regex 8 characters - numbers - lower & uppercase
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Signup Listener <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
signBtn.addEventListener("click", () => {
  var userObject = {
    userName: signNameInput.value.trim(),
    userEmail: signEmailInput.value.trim(),
    userPass: signPassInput.value.trim(),
  };
  if (signupValidation() === true) {
    usersArr.push(userObject);
    localStorage.setItem("users", JSON.stringify(usersArr));
    alertMsg("Registered Successfully");
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Automation Functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//.......................................... Validation function .....................................
function signupValidation() {
  if (!signNameInput.value) {
    alertMsg("Please Enter Your Name");
    return false;
  } else if (nameRegex.test(signNameInput.value) == false) {
    alertMsg("Please Enter Your Full Name");
    return false;
  }
  if (!signEmailInput.value) {
    alertMsg("Please enter your email");
    return false;
  } else if (emailRegex.test(signEmailInput.value) == false) {
    alertMsg("Please enter a valid email");
    return false;
  }
  if (!signPassInput.value) {
    alertMsg("Please enter your Password");
    return false;
  } else if (passRegex.test(signPassInput.value) == false) {
    alertMsg("Please enter a valid password");
    return false;
  } else {
    return true;
  }
}

signNameInput.addEventListener("keydown", (e) => {
  //............................................ for on name parts msgs ...........................................
  for (var i = 0; i < document.querySelectorAll(".namecheck").length; i++) {
    var namePart = signNameInput.value.split(" ")[i]; //part of the fullname after each space

    //if name 3 letters & not undified - bcase if still didn't enter the full name we will have undefined values while keydown
    if (/^[a-zA-Z]{3,}/.test(namePart) && namePart != undefined) {
      nameSpanArr[i].style.color = "lightgreen"; // Green means correct
    } else {
      nameSpanArr[i].style.color = "white";
      if (!signNameInput.value) {
        nameSpanArr[i].style.color = "white";
      }
    }
  }
});

//......................... with every keyup check also - to check and not wait till the next key down .............
signNameInput.addEventListener("keyup", (e) => {
  for (var i = 0; i < document.querySelectorAll(".namecheck").length; i++) {
    if (!signNameInput.value) {
      nameSpanArr[i].style.color = "white";
    }
  }
});

//................................................ same story but for the email...................................
signEmailInput.addEventListener("keydown", (e) => {
  var emailSpan = document.getElementById("emailSpan");
  if (emailRegex.test(signEmailInput.value)) {
    emailSpan.style.color = "lightgreen";
  } else {
    emailSpan.style.color = "white !important";
    if (!signNameInput.value) {
      emailSpan.style.color = "white !important";
    }
  }
});

//....................................................... Also on the keyup ..........................................
signEmailInput.addEventListener("keyup", (e) => {
  var emailSpan = document.getElementById("emailSpan");
  if (emailRegex.test(signEmailInput.value)) {
    emailSpan.style.color = "lightgreen";
  } else {
    emailSpan.style.color = "white !important";
    if (!signNameInput.value) {
      emailSpan.style.color = "white !important";
    }
  }
});

//.................................................. same story but for the password ...............................
signPassInput.addEventListener("keyup", (e) => {
  //Must have numbers
  if (/(.?\d.?)+/.test(signPassInput.value)) {
    document.querySelector(".passcheck-numbers").style.color = "lightgreen";
  } else {
    document.querySelector(".passcheck-numbers").style.color = "";
  }
  //More than 7 characters
  if (signPassInput.value.length > 7) {
    document.querySelector(".passcheck-8-or-more").style.color = "lightgreen";
  } else {
    document.querySelector(".passcheck-8-or-more").style.color = "";
  }
  //Must lower and upper cases
  if (
    /.?[A-Z]+.?/.test(signPassInput.value) &&
    /.?[a-z]+.?/.test(signPassInput.value)
  ) {
    document.querySelector(".passcheck-upper-lower").style.color = "lightgreen";
  } else {
    document.querySelector(".passcheck-upper-lower").style.color = "";
  }
});

//.................................................... Also on the keydown .......................................
signPassInput.addEventListener("keydown", (e) => {
  if (/(.?\d.?)+/.test(signPassInput.value) === false) {
    document.querySelector(".passcheck-numbers").style.color = "";
  }
  if (signPassInput.value.length < 8) {
    document.querySelector(".passcheck-8-or-more").style.color = "";
  }
  if (
    /.?[A-Z]+.?/.test(signPassInput.value) === false ||
    /.?[a-z]+.?/.test(signPassInput.value) === false
  ) {
    document.querySelector(".passcheck-upper-lower").style.color = "";
  }
});

//.................................................. To show validation msg t user ..............................
function alertMsg(msg) {
  warningBoxMsgSignout.innerHTML = msg;
  warningBoxSignout.classList.add("display");
  setTimeout(() => {
    warningBoxSignout.classList.remove("display");
    warningBoxMsgSignout.innerHTML = "";
  }, "3000");
}
