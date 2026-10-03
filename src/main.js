import './style.css';
import { mount as learn } from './learn.js';
import { mount as workspace } from './workspace.js';
import { lessons } from './lessons.js';
import { projects } from './projects.js';
import { webLessons } from './web-lessons.js';

// Storage prefixes: 'ls.' kept for the original JS course so saved progress survives.
const routes = {
  learn: (el) => learn(el, { prefix: 'ls.', name: 'Ajari JS', lessons, projects }),
  web: (el) => learn(el, { prefix: 'wb.', name: 'Ajari Web', lessons: webLessons, web: true }),
  workspace,
};
const app = document.getElementById('app');
let destroy;

function route() {
  const hash = location.hash.replace('#/', '');
  const name = hash in routes ? hash : 'learn';
  destroy?.();
  app.innerHTML = '';
  destroy = routes[name](app);
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('on', a.dataset.route === name);
    if (a.dataset.route === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

addEventListener('hashchange', route);
route();
