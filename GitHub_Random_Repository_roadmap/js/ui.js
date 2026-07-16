const title = document.getElementById('state');
const text = document.getElementById('textCard');
const areaFetch = document.getElementById('repoCard');
const repoStatus = document.getElementById('repoStatus');
const auxBtn = document.getElementById('auxBtn')
const auxBtnText = document.getElementById('auxBtnText');
const dropdownBtn = document.getElementById('dropdownBtn');

const repoName = document.getElementById('repoName');
const repoDescription = document.getElementById('repoDescription');
const repoLanguage = document.getElementById('repoLanguage');
const repoStargazers = document.getElementById('repoStargazers_count');
const repoForks = document.getElementById('repoForks_count');

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  React: '#61dafb'
};

function emptyState() {
  title.textContent = "Empty State";
  dropdownBtn.textContent = "Select a Language";
  text.textContent = "Please select a language";
  text.classList.remove('hidden');

  auxBtn.classList.add('hidden');

  areaFetch.classList.remove('api-on','is-visible', 'is-error');
  hiddenRepository();
}

function loadingState() {
  title.textContent = "Loading State";
  text.textContent = "Loading, please wait..";
  text.classList.remove('hidden');

  areaFetch.classList.add('is-visible');
  areaFetch.classList.remove('is-error', 'api-on');

  hiddenRepository();

  auxBtn.classList.add('hidden');
}

function errorState() {
  title.textContent = "Error State";
  text.textContent = "Error fetching repositories.";
  text.classList.remove('hidden');

  hiddenRepository();

  areaFetch.classList.add('is-visible', 'is-error');
  areaFetch.classList.remove('api-on');

  auxBtn.classList.remove('hidden');
  auxBtnText.textContent = "Click to retry";
}

function hiddenRepository(){
  repoName.classList.add('hidden');
  repoDescription.classList.add('hidden');
  repoStatus.classList.add('hidden');
}

function showRepository(repo) {
  repoName.textContent = repo.name;
  repoName.href = repo.html_url;
  repoDescription.textContent = repo.description || 'No description provided.';
  repoLanguage.textContent = repo.language || 'Unknown';
  repoStargazers.textContent = `⭐ ${repo.stargazers_count}`;
  repoForks.textContent = `🍴 ${repo.forks_count}`;
  title.textContent = "";

  // Cor dinâmica da bolinha de linguagem via CSS custom property
  const color = LANGUAGE_COLORS[repo.language] || '#8e8e8e';
  repoLanguage.style.setProperty('--lang-color', color);

  text.classList.add('hidden');
  repoName.classList.remove('hidden');
  repoDescription.classList.remove('hidden');
  repoStatus.classList.remove('hidden');

  areaFetch.classList.add('is-visible', 'api-on');
  areaFetch.classList.remove('is-error');

  auxBtnText.textContent = "Refresh";
  auxBtn.classList.remove('hidden');
}