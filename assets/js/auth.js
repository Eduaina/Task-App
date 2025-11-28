const loginModule = document.querySelector("#login");

loginModule.addEventListener("click", (e) => {
  if (e.target.matches(".bttn.one")) console.log("Login clicked");
  if (e.target.matches(".bttn.two")) console.log("Sign Up clicked");
});

// document.addEventListener("DOMContentLoaded", () => {
//   const authWrapper = document.querySelector(".auth-wrapper");
//   const loginSection = authWrapper.querySelector(".login");
//   const signupSection = authWrapper.querySelector(".signup");

//   const loginButtons = authWrapper.querySelectorAll(".login-btn");
//   const signupButtons = authWrapper.querySelectorAll(".signup-btn");

//   const toggleSection = (sectionToShow) => {
//     if (sectionToShow === "login") {
//       loginSection.classList.add("active");
//       signupSection.classList.remove("active");
//       loginButtons.forEach((btn) => btn.classList.add("active"));
//       signupButtons.forEach((btn) => btn.classList.remove("active"));
//     } else {
//       loginSection.classList.remove("active");
//       signupSection.classList.add("active");
//       loginButtons.forEach((btn) => btn.classList.remove("active"));
//       signupButtons.forEach((btn) => btn.classList.add("active"));
//     }
//   };

//   loginButtons.forEach((btn) => {
//     btn.addEventListener("click", () => toggleSection("login"));
//   });

//   signupButtons.forEach((btn) => {
//     btn.addEventListener("click", () => toggleSection("signup"));
//   });
// });
