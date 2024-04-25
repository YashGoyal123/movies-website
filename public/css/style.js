const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
 loginForm.style.marginLeft = "-50%";
 loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
 loginForm.style.marginLeft = "0%";
 loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
 signupBtn.click();
 return false;
});

function validateForm() {
    var email = document.forms["signupForm"]["email"].value;
    var firstName = document.forms["signupForm"]["firstName"].value;
    var lastName = document.forms["signupForm"]["lastName"].value;
    var gender = document.forms["signupForm"]["gender"].value;
    var phone = document.forms["signupForm"]["phone"].value;
    var password = document.forms["signupForm"]["password"].value;
    var confirmPassword = document.forms["signupForm"]["confirmPassword"].value;

    if (email == "" || firstName == "" || lastName == "" || phone == "" || password == "" || confirmPassword == "" ||gender=="" ) {
      alert("All fields must be filled out");
      return false;
    }
    if (phone.length != 10) {
      alert("Phone number must be exactly 10 digits long");
      return false;
    }
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
  }