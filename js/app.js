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

function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);

  console.log("ID: " + responsePayload.sub); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + responsePayload.name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email); // This is null if the 'email' scope is not present.

  // Ensure the element exists before setting its innerHTML
  const contentElement = document.getElementById("content");
  contentElement.innerHTML = `
    <div>
      <p>ID: ${responsePayload.sub}</p>
      <p>Name: ${responsePayload.name}</p>
      <p>Image URL: <img src="${responsePayload.picture}" alt="Profile Image"></p>
      <p>Email: ${responsePayload.email}</p>
    </div>
  `;
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

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}