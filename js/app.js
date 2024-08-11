const content = document.querySelector(".content");
const allocations = [
  { date: "8/11/2024", deployment: [
    { name: "Foyer", member: "John" },
    { name: "Canteen", member: "Jane" },
    { name: "Library", member: "Mike" },
    { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
    { name: "Side Gate", member: "David" },
    { name: "Main Gate", member: "Sarah" },
    { name: "Corridor", member: "Alex" },
    { name: "Hall", member: "Olivia" },
    { name: "Staircase", member: "Daniel" }
  ]}
];

const displayAllocations = () => {
  if (allocations[0]) {
    let output = `<div><h2>${allocations[0].date}</h2></div>`;
    allocations[0].deployment.forEach(({ name, member }) => {
      output += `
        <div class="card">
          <h1 class="card--title">${name}</h1>
          <p class="card--member">${member}</p>
        </div>
      `;
    });
    content.innerHTML = output;
  }
};

if (window.location.href.includes("dashboard.html")) {
  document.addEventListener("DOMContentLoaded", displayAllocations);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  // Redirect to dashboard.html
  window.location.href = "dashboard.html";

  // Store the response payload in localStorage
  localStorage.setItem("responsePayload", JSON.stringify(responsePayload));
}

function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
document.addEventListener("DOMContentLoaded", () => {
  askNotificationPermission();
  subscribeUserToPush();
});

// Ensure the Google Sign-In button is properly initialized
document.addEventListener("DOMContentLoaded", () => {
  const responsePayload = JSON.parse(localStorage.getItem("responsePayload"));
  if (responsePayload) {
    const contentElement = document.getElementById("welcome");
    contentElement.innerHTML = `
    <div>
      <p><h1>Welcome, ${responsePayload.name}!</h1> <img src="${responsePayload.picture}" alt="Profile Image"></p>
    </div>
    `;
  }
});

function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function signOut() {
  localStorage.removeItem("responsePayload");
  location.reload();
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMt0uRtKOH7rLX_kQNbLtZ8gtBUZ9r818",
    authDomain: "dutifysg.firebaseapp.com",
    projectId: "dutifysg",
    storageBucket: "dutifysg.appspot.com",
    messagingSenderId: "123316970403",
    appId: "1:123316970403:web:859e1f3f3df7d0ed18f016",
    measurementId: "G-807BWSW5JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission to send notifications
function askNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            getToken();
        } else {
            console.log("Notification permission denied.");
        }
    });
}

// Get FCM token
function getToken() {
    messaging.getToken({ vapidKey: "BKeqWzJkekLZMjVhY5rEcqmTLqs5eqfGVgk9e0gybu_vNnPE85aJMGjulDfCqJfu_BNWZTmJHJANVEaUt9Oe1c4" }).then((currentToken) => {
        if (currentToken) {
            console.log("FCM Token:", currentToken);
            // Send the token to your server
        } else {
            console.log("No registration token available. Request permission to generate one.");
        }
    }).catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
    });
}

// Call the function to ask for notification permission
askNotificationPermission();