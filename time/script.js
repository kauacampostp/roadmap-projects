// ===== ELEMENTOS =====
const zoneText = document.getElementById('zoneText');
const btnZone = document.getElementById('btnZone');
const hoursEl = document.getElementById('timeHours');
const dateEl = document.getElementById('timeDate');
const btnFormat = document.getElementById('btnFormat');

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const btnClose = document.getElementById('modalClose');
const searchInput = document.getElementById('dropdownBtn');
const dropdownList = document.getElementById('dropdownList');

// ===== DAY JS =====
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// ===== ESTADO (com persistência) =====

const STORAGE_ZONE = 'clock:timezone';
const STORAGE_FORMAT = 'clock:is24h';

let currentZone = localStorage.getItem(STORAGE_ZONE) || dayjs.tz.guess();
let is24h = localStorage.getItem(STORAGE_FORMAT) !== 'false';

let timezones = [];
try {
  timezones = Intl.supportedValuesOf('timeZone');
} catch (err) {
  timezones = [
    'America/Sao_Paulo', 'America/New_York', 'America/Los_Angeles',
    'Europe/London', 'Europe/Lisbon', 'Europe/Paris', 'Europe/Berlin',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai', 'Australia/Sydney', 'UTC'
  ];
}

// ===== RELÓGIO =====
function takeTime() {
  const now = dayjs().tz(currentZone);
  if (is24h) {
    hoursEl.innerHTML = `<span class="time-digits">${now.format('HH:mm:ss')}</span>`;
  } else {
    hoursEl.innerHTML = `<span class="time-digits">${now.format('hh:mm:ss')}</span><span class="time-period">${now.format('A')}</span>`;
  }
  dateEl.textContent = now.format('dddd, D [of] MMMM, YYYY');
}

function setZone(zone){
  currentZone = zone;
  zoneText.textContent = zone;
  localStorage.setItem(STORAGE_ZONE, zone);
  markSelectedInList();
  takeTime();
}

function toggleFormat() {
  is24h = !is24h;
  localStorage.setItem(STORAGE_FORMAT, String(is24h));
  btnFormat.textContent = is24h ? '12h' : '24h';
  btnFormat.setAttribute('aria-pressed', String(is24h));
  takeTime();
}

// ===== LISTA DE FUSOS =====
function buildDropdownList() {
  const fragment = document.createDocumentFragment('li');

  timezones.forEach((zone) => {
    const li = document.createElement('li');
    li.textContent = zone;
    li.setAttribute('role', 'option');
    li.dataset.value = zone;
    if (zone === currentZone) {
      li.classList.add('selected');
      li.setAttribute('aria-selected', 'true');
    }
    fragment.appendChild(li);
  });
  dropdownList.appendChild(fragment);
}

function markSelectedInList() {
  const items = dropdownList.querySelectorAll('li');
  items.forEach((item) => {
    const isSelected = item.dataset.value === currentZone;
    item.classList.toggle('selected', isSelected);
    item.setAttribute('aria-selected', String(isSelected));
  });
}

function filterList(term){
  term = term.toLowerCase();
  const items = dropdownList.querySelectorAll('li');

  items.forEach(item => {
    const matches = item.textContent.toLowerCase().includes(term);
    item.style.display = matches ? 'block' : 'none';
  });
}

// ===== MODAL =====
function openModal(){
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  searchInput.value = '';
  filterList('');
  searchInput.focus();
  document.addEventListener('keydown', handleKeydown);
}

function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', handleKeydown);
  btnZone.focus();
}

function handleKeydown(e){
  if(e.key === 'Escape'){
    closeModal();
  }
}

// ===== EVENTS =====
btnZone.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
btnFormat.addEventListener('click', toggleFormat);

searchInput.addEventListener('input', (e) => {
  filterList(e.target.value);
});

dropdownList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li) {
    setZone(li.dataset.value);
    closeModal();
  }
});

modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay){
    closeModal();
  }
});

// ===== STARTING =====
zoneText.textContent = currentZone;
btnFormat.textContent = is24h ? '12h' : '24h';
btnFormat.setAttribute('aria-pressed', String(is24h));

buildDropdownList();
takeTime();
window.setInterval(takeTime, 1000);
