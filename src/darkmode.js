const button = document.querySelector('#dark-mode');
const useDark = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode(state) {
  document.documentElement.classList.toggle('bd-dark', state);
}

function setDarkModePreference(value) {
  document.cookie = 'darkMode=' + value;
}

function updateDarkMode() {
  if (!getDarkModePreference()) {
    toggleDarkMode(useDark.matches);
    useDark.addListener((evt) => toggleDarkMode(evt.matches));
  } else {
    const darkModeEnabled = getDarkModePreference();
    toggleDarkMode(darkModeEnabled);
  }
}

updateDarkMode();

button.addEventListener('click', () => {
  const darkModeEnabled = !document.documentElement.classList.contains('bd-dark');
  toggleDarkMode(darkModeEnabled);
  setDarkModePreference(darkModeEnabled.toString());
});
