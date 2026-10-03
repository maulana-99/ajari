import './styles/main.css';
import { mount as learn } from './pages/learn.js';
import { mount as workspace } from './pages/workspace.js';
import { jsCourse, webCourse } from './courses/index.js';

const routes = {
  learn: (el) => learn(el, jsCourse),
  web: (el) => learn(el, webCourse),
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
