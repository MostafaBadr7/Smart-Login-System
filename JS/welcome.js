/*
 * Route - Frontend
 * JS program Week 8
 * Smart Login Web APP
 * JS + Bootstrap
 * 23/12/2023
 * Welcome page JS
 */

// Layer till the page loaded
document.getElementById("white-loadingLayer").classList.add("layer-display");

// Delay 1s till the page loaded
setTimeout(function () {
  //Global Variables
  var logOut = document.getElementById("btn-logOut");

  // if user not logged - display layer on the page then transfer to login page
  if (sessionStorage.getItem("userLogin") == null) {
    document
      .getElementById("white-loadingLayer")
      .classList.add("layer-display");
    window.open("index.html", "_self");
  } else {
    document
      .getElementById("white-loadingLayer")
      .classList.add("layer-dissappear");
    document.getElementById(
      "userName-welcomePage"
    ).innerHTML = `${sessionStorage.getItem("userLogin")}`; // Display user name on welcome page
  }

  logOut.addEventListener("click", () => {
    // If logout pressed
    sessionStorage.clear();
    logOut.innerHTML = "Log in"; // Change button to log in button
    window.open("index.html", "_self"); // Transfer to login page
  });
}, 1000);
