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
    setTimeout(() => {
      window.open("index.html");
    }, 2000);
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Automation Functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//.......................................... Validation function .....................................
function signupValidation() {
  if (!signNameInput.value) {
    alertMsg("Please Enter Your Name");
    return false;
  } else if (nameRegex.test(signNameInput.value) == false) {
    alertMsg("Please Enter a<br> valid & Full Name");
    return false;
  }
  if (!signEmailInput.value) {
    alertMsg("Please enter your email");
    return false;
  } else if (emailRegex.test(signEmailInput.value) == false) {
    alertMsg("Please enter<br> a valid email");
    return false;
  } else if (localStorage.getItem("users") != null) {
    console.log("hi1");

    for (let i = 0; i < usersArr.length; i++) {
      console.log(usersArr[i].userEmail);
      console.log(signEmailInput.value);
      if (usersArr[i].userEmail == signEmailInput.value) {
        console.log("hi");
        alertMsg("Email already exist!<br> Please sign in");
        return false;
      }
    }
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
    var checkIcons = document.querySelectorAll(".check-icon-names");

    //if name 3 letters & not undified - bcase if still didn't enter the full name we will have undefined values while keydown
    if (/^[a-zA-Z]{3,}/.test(namePart) && namePart != undefined) {
      nameSpanArr[i].style.color = "lightgreen"; // Green means correct
      checkIcons[i].style.opacity = 1;
      console.log(checkIcons[i]);
    } else {
      nameSpanArr[i].style.color = "white";
      checkIcons[i].style.opacity = 0;
      if (!signNameInput.value) {
        nameSpanArr[i].style.color = "white";
        checkIcons[i].style.opacity = 0;
      }
    }
  }
});

//......................... with every keyup check also - to check and not wait till the next key down .............
signNameInput.addEventListener("keyup", (e) => {
  for (var i = 0; i < document.querySelectorAll(".namecheck").length; i++) {
    if (!signNameInput.value) {
      nameSpanArr[i].style.color = "white";
      checkIcons[i].style.opacity = 0;
    }
  }
});

//................................................ same story but for the email...................................
signEmailInput.addEventListener("keydown", (e) => {
  var emailSpan = document.getElementById("emailSpan");
  var checkIcons = document.querySelectorAll(".check-icon-email");
  if (emailRegex.test(signEmailInput.value)) {
    emailSpan.style.color = "lightgreen";
    checkIcons[i].style.opacity = 1;
  } else {
    emailSpan.style.color = "white !important";
    checkIcons[i].style.opacity = 0;
    if (!signNameInput.value) {
      emailSpan.style.color = "white !important";
      checkIcons[i].style.opacity = 0;
    }
  }
});

//....................................................... Also on the keyup ..........................................
signEmailInput.addEventListener("keyup", (e) => {
  var emailSpan = document.getElementById("emailSpan");
  var checkIcons = document.querySelector(".check-icon-email");

  if (emailRegex.test(signEmailInput.value)) {
    emailSpan.style.color = "lightgreen";
    checkIcons.style.opacity = 1;
  } else {
    emailSpan.style.color = "white ";
    checkIcons.style.opacity = 0;
    if (!signNameInput.value) {
      emailSpan.style.color = "white ";
      checkIcons.style.opacity = 0;
    }
  }
});

//.................................................. same story but for the password ...............................
signPassInput.addEventListener("keyup", (e) => {
  var checkIcons = document.querySelectorAll(".check-icon-pwd");

  //Must have numbers
  if (/(.?\d.?)+/.test(signPassInput.value)) {
    document.querySelector(".passcheck-numbers").style.color = "lightgreen";
    checkIcons[1].style.opacity = 1;
  } else {
    document.querySelector(".passcheck-numbers").style.color = "";
    checkIcons[1].style.opacity = 0;
  }
  //More than 7 characters
  if (signPassInput.value.length > 7) {
    document.querySelector(".passcheck-8-or-more").style.color = "lightgreen";
    checkIcons[0].style.opacity = 1;
  } else {
    document.querySelector(".passcheck-8-or-more").style.color = "";
    checkIcons[0].style.opacity = 0;
  }
  //Must lower and upper cases
  if (
    /.?[A-Z]+.?/.test(signPassInput.value) &&
    /.?[a-z]+.?/.test(signPassInput.value)
  ) {
    document.querySelector(".passcheck-upper-lower").style.color = "lightgreen";
    checkIcons[2].style.opacity = 1;
  } else {
    document.querySelector(".passcheck-upper-lower").style.color = "";
    checkIcons[2].style.opacity = 0;
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
