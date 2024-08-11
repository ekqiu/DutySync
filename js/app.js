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
