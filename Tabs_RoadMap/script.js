let buttons = document.querySelectorAll(".tab-btn");
let tabs = document.querySelectorAll(".Tab");

function toggleTab(e) {
  // toggle = alterar
  buttons.forEach((btn) => btn.classList.remove("active")); // "btn" é o nome que escolhemos e não por causa da class
  tabs.forEach((Tab) => Tab.classList.remove("active"));

  e.currentTarget.classList.add("active"); // e.currentTarget pega ação recente. Então, ao clicarmos no botão, adiciona "active" na class do botão selecionado

  let tabId = e.currentTarget.dataset.id;
  document.querySelector(`section[data-id="${tabId}"]`).classList.add("active");
}

buttons.forEach((btn) => btn.addEventListener("click", toggleTab));
