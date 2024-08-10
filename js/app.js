const content = document.querySelector(".content");
const allocations = [
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

const displayAllocations = () => {
  let output = "";
  allocations.forEach(
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

  window.location.href = "dashboard.html";
  document.addEventListener("DOMContentLoaded", () => {
    const contentElement = document.getElementById("welcome");
    contentElement.innerHTML = `
    <div>
      <h1>Welcome, ${responsePayload.name}!</h1> <img src="${responsePayload.picture}" alt="Profile Image"></p>
    </div>
    `;
  });
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
  localStorage.removeItem("responsePayload");
  location.reload();
}