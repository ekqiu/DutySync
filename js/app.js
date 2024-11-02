const content = document.getElementById("content");
const responsePayload = JSON.parse(localStorage.getItem("responsePayload"));

async function fetchWorkspaces() {
  const encodedUsername = encodeURIComponent(responsePayload.name);
  const ownerResponse = await fetch(
    `https://ekqiu.hackclub.app/workspaces/${encodedUsername}`
  );
  const memberResponse = await fetch(
    `https://ekqiu.hackclub.app/workspaces/${encodedUsername}`
  );
  if (!ownerResponse.ok || !memberResponse.ok) {
    throw new Error("Network response was not ok");
  }
  const owned = await ownerResponse.json();
  const member = await memberResponse.json();

  return { owned, member };
}

function displayWorkspaces() {
  fetchWorkspaces().then(({ owned, member }) => {
    const dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = "";

    owned.forEach((workspace) => {
      const div = document.createElement("div");
      div.innerHTML = `<a>You own ${workspace.name}</a>`;
      dashboard.appendChild(div);
    });

    member.forEach((workspace) => {
      const div = document.createElement("div");
      div.innerHTML = `<a>You are a member of ${workspace.name}</a>`;
      dashboard.appendChild(div);
    });
  });
}

if (window.location.href.includes("dashboard.html")) {
  document.addEventListener("DOMContentLoaded", displayWorkspaces);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
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
    const profile = document.getElementById("profile");
    profile.innerHTML = `
      <div style="display: flex;">
      <div>
        <img src="${responsePayload.picture}" alt="Profile Image" class="img-fluid" style="border-radius: 50%; width: 3vh;">
      </div>
      <div style="display: grid; align-items: center;">
        <a style="margin: 0px 15px 0px 15px;">${responsePayload.name}</a>
      </div>
      </div>
`;
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
    const results = allocations
      .filter((allocation) => {
        return allocation.deployment.some((member) => member.member === name);
      })
      .map((allocation) => {
        return {
          date: allocation.date,
          time: allocation.time,
          name: allocation.deployment.find((member) => member.member === name)
            .name,
        };
      });
    return results;
  };

  const responsePayload = JSON.parse(localStorage.getItem("responsePayload"));
  const nameToSearch = responsePayload.name;
  const searchResults = searchName(nameToSearch);
  const nextDiv = document.getElementById("next");
  nextDiv.innerHTML = "";

  searchResults.forEach((result) => {
    const { date, time, name } = result;
    const div = document.createElement("div");
    div.textContent = `On ${date} at ${time}, you have ${name} duty.`;
    div.classList.add("alert", "alert-info");
    nextDiv.appendChild(div);
  });
});

function checkLoginStatus() {
  const responsePayload = JSON.parse(localStorage.getItem("responsePayload"));
  const signInButton = document.getElementById("google-signin-button");
  const profile = document.getElementById("profile-menu");
  if (responsePayload) {
    signInButton.style.display = "none";
    profile.style.display = "block";
  } else {
    signInButton.style.display = "block";
    profile.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", checkLoginStatus);
window.addEventListener("DOMContentLoaded", fetchAllocations);
