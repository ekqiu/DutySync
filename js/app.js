const container = document.querySelector(".container");
const coffees = [
  { name: "Foyer", image: "images/coffee1.jpg" },
  { name: "Canteen", image: "images/coffee2.jpg" },
  { name: "Library", image: "images/coffee3.jpg" },
  { name: "Carpark", image: "images/coffee4.jpg" },
  { name: "Side Gate", image: "images/coffee5.jpg" },
  { name: "Main Gate", image: "images/coffee6.jpg" },
  { name: "Corridor", image: "images/coffee7.jpg" },
  { name: "Hall", image: "images/coffee8.jpg" },
  { name: "Staircase", image: "images/coffee9.jpg" },
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">View Members On-Duty</a>
              </div>
              `)
  );
  container.innerHTML = output;
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