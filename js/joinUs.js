import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
const joinApp = initializeApp(firebaseConfig);
const joinDB = getDatabase(joinApp);

const joinBtn = document.getElementById("join");


joinBtn?.addEventListener("click", function (e) {
  e.preventDefault();
  let joinUsFullname = document.getElementById("joinUsFullname").value.trim();
  let joinUsEmail = document.getElementById("joinUsEmail").value.trim();

  if(!joinUsFullname || !joinUsEmail){
    alert("Please fill in all fields!")
  }else if(!isValidEmail(joinUsEmail)){
    alert("Please enter a valid email address!");
  }
  else{
    const joinData = {
    fullName: joinUsFullname,
    email: joinUsEmail
  };
  push(ref(joinDB, 'Join'), joinData);
  document.getElementById("joinUsFullname").value = "";
  document.getElementById("joinUsEmail").value = "";
  alert("successful")
  console.log(joinData);
  }
});
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}