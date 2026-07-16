const dropdown = document.querySelector('.dropdown-container');
const itens = document.querySelectorAll('.dropdown-list li');

let repoAtual = null;
let linguagemAtual = null;

function showDropdown(e) {
  e.stopPropagation();
  dropdown.classList.toggle('ativo');
}

itens.forEach(function (item) {
  item.addEventListener('click', async function (e) {
    e.stopPropagation();
    const valorSelecionado = this.getAttribute('data-value');
    dropdownBtn.textContent = this.textContent;
    dropdown.classList.remove('ativo');
    loadingState();

    linguagemAtual = valorSelecionado;
    const repo = await randomRepository(valorSelecionado);
    if (repo) {
      showRepository(repo);
      repoAtual = repo;
    }
  });
});

window.addEventListener('click', function () {
  dropdown.classList.remove('ativo');
});

dropdown.addEventListener('click', showDropdown);

auxBtn.addEventListener('click', async function () {
  if (linguagemAtual) {
    loadingState();
    const repo = await randomRepository(linguagemAtual);
    if(repo){
      repoAtual = repo;
      showRepository(repoAtual);
    }
  } else {
    emptyState();
  }
});

emptyState();