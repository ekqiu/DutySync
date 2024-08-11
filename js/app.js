const content = document.getElementById("content");
const allocations = [
  {
    date: "11/8/2024",
    time: "8:00 AM",
    deployment: [
      { name: "Foyer", member: "John" },
      { name: "Canteen", member: "Jane" },
      { name: "Library", member: "Mike" },
      { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
      { name: "Side Gate", member: "David" },
      { name: "Main Gate", member: "Sarah" },
      { name: "Corridor", member: "Alex" },
      { name: "Hall", member: "Olivia" },
      { name: "Staircase", member: "Daniel" },
    ],
  },
  {
    date: "12/8/2024",
    time: "8:00 AM",
    deployment: [
      { name: "Foyer", member: "John" },
      { name: "Canteen", member: "Jane" },
      { name: "Library", member: "Mike" },
      { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
      { name: "Side Gate", member: "David" },
      { name: "Main Gate", member: "Sarah" },
      { name: "Corridor", member: "Alex" },
      { name: "Hall", member: "Olivia" },
      { name: "Staircase", member: "Daniel" },
    ],
  },
  {
    date: "13/8/2024",
    time: "8:00 AM",
    deployment: [
      { name: "Foyer", member: "John" },
      { name: "Canteen", member: "Jane" },
      { name: "Library", member: "Mike" },
      { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
      { name: "Side Gate", member: "David" },
      { name: "Main Gate", member: "Sarah" },
      { name: "Corridor", member: "Alex" },
      { name: "Hall", member: "Olivia" },
      { name: "Staircase", member: "Daniel" },
    ],
  },
  {
    date: "14/8/2024",
    time: "8:00 AM",
    deployment: [
      { name: "Foyer", member: "John" },
      { name: "Canteen", member: "Jane" },
      { name: "Library", member: "Mike" },
      { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
      { name: "Side Gate", member: "David" },
      { name: "Main Gate", member: "Sarah" },
      { name: "Corridor", member: "Alex" },
      { name: "Hall", member: "Olivia" },
      { name: "Staircase", member: "Daniel" },
    ],
  },
  {
    date: "15/8/2024",
    time: "8:00 AM",
    deployment: [
      { name: "Foyer", member: "John" },
      { name: "Canteen", member: "Jane" },
      { name: "Library", member: "Mike" },
      { name: "Carpark", member: "Evan Khee Bo Han (Bpghs)" },
      { name: "Side Gate", member: "David" },
      { name: "Main Gate", member: "Sarah" },
      { name: "Corridor", member: "Alex" },
      { name: "Hall", member: "Olivia" },
      { name: "Staircase", member: "Daniel" },
    ],
  },
];

const displayAllocations = () => {
  allocations.forEach(({ date, time, deployment }) => {
    let output = `
      <div>
        <h2>${date} ${time}</h2>
      </div>
      <div class="content">
    `;
    deployment.forEach(({ name, member }) => {
      output += `
        <div class="card">
          <h1 class="card--title">${name}</h1>
          <p class="card--member">${member}</p>
        </div>
      `;
    });
    output += `</div>`;
    content.innerHTML += output;
  });
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
      <div style="display: flex;">
      <div>
        <img src="${responsePayload.picture}" alt="Profile Image" class="img-fluid" style="border-radius: 50%;">
      </div>
      <div style="display: grid; align-items: center;">
        <h1 style="margin-left: 15px;">Welcome, ${responsePayload.name}!</h1>
      </div>
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

document.addEventListener("DOMContentLoaded", () => {
  const searchName = (name) => {
    const results = allocations.filter((allocation) => {
      return allocation.deployment.some((member) => member.member === name);
    });
    return results;
  };

  const responsePayload = JSON.parse(localStorage.getItem("responsePayload"));
  const nameToSearch = responsePayload.name;
  const searchResults = searchName(nameToSearch);
  const nextDiv = document.getElementById("next");
  console.log(searchResults);
  nextDiv.innerHTML = JSON.stringify(searchResults);
});