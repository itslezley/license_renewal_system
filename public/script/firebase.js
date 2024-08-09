  const firebaseConfig = {
    apiKey: "AIzaSyBtixkxG21cUY4mPd9RkeLBhSpHoXT_9EA",
    authDomain: "website-aef8e.firebaseapp.com",
    projectId: "website-aef8e",
    storageBucket: "website-aef8e.appspot.com",
    messagingSenderId: "903805711591",
    appId: "1:903805711591:web:8d05ae515581040e291e42",
    measurementId: "G-F36TXSTNE1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.database();


//Event var
const loginBtn = document.getElementById("loginButton");
const checkLog = document.querySelector("#cardLoading");
const signBtn = document.getElementById("signUpBtn");

//Events
if(loginBtn !==null){
loginBtn.addEventListener("click", logIn);
}else if(checkLog !==null)
{
  console.log("here");
window.addEventListener("load", checkLogin);
}else if(signBtn!==null)
{
  signBtn.addEventListener("click",signUp);
}


function signUp()
{
const email = document.getElementById("uname").value;
const pass = document.getElementById("psw").value;


auth.createUserWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in 
    if(userCredential==null)
    {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Please fill the details",
        footer: '<a href="#">Click here to go back</a>'
        });
    }else{
    var user = userCredential.user;
  
	
var id= email.split("@");

//saving to db
db.ref("user/"+id[0]).set({
  username: document.getElementById("uname").value,
  password: document.getElementById("psw").value,


},(error)=>{
  var errorCode = error.code;
  var errorMessage = error.message;
  
  Swal.fire({
    icon: "error",
    title: "Error...",
    text: errorMessage,
    footer: '<a href="#">Click here to go back</a>'
    });
});


	  }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    Swal.fire({
			icon: "error",
			title: "Error...",
			text: errorMessage,
			footer: '<a href="#">Click here to go back</a>'
		  });
	
  });

  Swal.fire({
    title: "Good job!",
    text: "successfully registered!",
    icon: "success",
    button: "OK"
  }).then((isOkay)=>{
    if(isOkay){
      window.location.href = 'Login.html';
    }
  }); 
}



function logIn()
{

  const email = document.getElementById("uname").value;
  const pass = document.getElementById("psw").value;


  auth.signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    const person = {Email: email,Password: pass};
    sessionStorage.setItem("user",person);

    Swal.fire({
      title: "Good job!",
      text: "successfully Loggedin!",
      icon: "success",
      button: "OK"
    }).then((isOkay)=>{
      if(isOkay){
        window.location.href = 'mycard.html';
      }
    });
   
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Swal.fire({
			icon: "error",
			title: "Error...",
			text: errorMessage,
			footer: '<a href="#">Click here to go back</a>'
		  });
  });

}


function signOut()
{
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}



function checkLogin()
{

  console.log("smae");
  const user = sessionStorage.get;

  if(user!==null)
  {
    const email = user.email;
    const password = user.password;
    const uid = user.uid;

    console.log("email"+email+"password"+password);
    console.log(user)
  }else{
    window.location.href = "Login.html";
  }

}
