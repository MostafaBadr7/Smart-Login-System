/*
 * Route - Frontend
 * JS program Week 8
 * Smart Login Web APP
 * JS + Bootstrap
 * 23/12/2023
 * Login page JS
 */

// Layer till the page loaded
document.getElementById("white-loadingLayer").classList.add("layer-display");

// Delay 0.5s till the page loaded
setTimeout(function () {
  // if user  logged - keep display layer on the page then transfer to welcome page
  if (sessionStorage.getItem("userLogin") != null) {
    window.open("Welcome.html", "_self");
  } else {
    var users = JSON.parse(localStorage.getItem("users"));
    document
      .getElementById("white-loadingLayer")
      .classList.add("layer-dissappear");
  }
  //................................. Global varaibles ...............................
  var emailInput = document.getElementById("emailInput");
  var emailPass = document.getElementById("passInput");
  var loginBtn = document.getElementById("loginBtn");
  var emailRegex = /^[\w-\.]+@([\w-]{2,}\.)+[\w-]{2,4}$/;

  //.................................. Login validation ..............................
  loginBtn.addEventListener("click", () => {
    if (!emailInput.value || !emailPass.value) {
      alertMsg("Please fill all data");
      return false;
    } else if (emailRegex.test(emailInput.value) == false) {
      {
        alertMsg("Please enter a valid email");
      }
    } else {
      if (JSON.parse(localStorage.getItem("users") == null)) {
        alertMsg("Please register");
      } else {
        for (var i = 0; i < users.length; i++) {
          if (users[i].userEmail.includes(emailInput.value)) {
            if (users[i].userEmail == emailInput.value) {
              if (users[i].userPass == emailPass.value) {
                sessionStorage.setItem("userLogin", users[i].userName);
                window.open("Welcome.html", "_self");
                return true;
              } else {
                alertMsg("Wrong Password!");
                return false;
              }
            } else {
              alertMsg("Wrong Email");
            }
          } else {
            alertMsg("Your email is not exist!<br> Please register");
          }
        }
      }
    }
  });

  //................................ To show validation msg t user ....................
  function alertMsg(msg) {
    warningBoxMsg.innerHTML = msg;
    warningBox.classList.add("display");
    setTimeout(() => {
      warningBox.classList.remove("display");
      warningBoxMsg.innerHTML = "";
    }, "3000");
  }
}, 500);
