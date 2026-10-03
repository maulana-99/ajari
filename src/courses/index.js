// Course registry. Storage prefixes are part of saved progress: never change an existing one.
import { lessons } from './js/lessons.js';
import { explain } from './js/explain.js';
import { hints } from './js/hints.js';
import { projects } from './js/projects.js';
import { webLessons } from './web/lessons.js';

export const jsCourse = { prefix: 'ls.', name: 'Ajari JS', lessons, explain, hints, projects };
export const webCourse = { prefix: 'wb.', name: 'Ajari Web', lessons: webLessons, web: true };
