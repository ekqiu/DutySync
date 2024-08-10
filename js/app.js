const content = document.querySelector(".content");
const coffees = [
  { name: "Foyer"},
  { name: "Canteen"},
  { name: "Library"},
  { name: "Carpark"},
  { name: "Side Gate"},
  { name: "Main Gate" },
  { name: "Corridor"},
  { name: "Hall"},
  { name: "Staircase"},
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name }) =>
      (output += `
              <div class="card">
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">View Members On-Duty</a>
              </div>
              `)
  );
  content.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  document.getElementById("content").innerHTML = `
    <div>
      <p>ID: ${profile.getId()}</p>
      <p>Name: ${profile.getName()}</p>
      <p>Image URL: ${profile.getImageUrl()}</p>
      <p>Email: ${profile.getEmail()}</p>
    </div>
  `;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
    // Check if the window is closed
    if (window.opener) {
      window.opener.postMessage("signedOut", "*");
    }
  });
}