// opts.badge: element on the Console tab that counts lines logged while the console is hidden.
export function createConsole(parent, title = 'Output', { badge } = {}) {
  parent.classList.add('con');
  parent.innerHTML = `<div class="con-head"><span></span><button type="button">Bersihkan</button></div><div class="con-body" aria-live="polite"></div>`;
  const head = parent.querySelector('.con-head span');
  const body = parent.querySelector('.con-body');
  head.textContent = title;
  const hint = () => {
    body.innerHTML = '<div class="con-empty">Hasil kode akan muncul di sini. Tekan Jalankan.</div>';
  };
  let unread = 0;
  const seen = () => {
    unread = 0;
    if (badge) {
      badge.hidden = true;
      badge.classList.remove('err');
    }
  };
  const clear = () => {
    body.textContent = '';
    seen();
  };
  parent.querySelector('button').onclick = hint;
  hint();
  return {
    clear,
    seen,
    log(level, text) {
      body.querySelector('.con-empty')?.remove();
      const row = document.createElement('div');
      row.className = 'con-line ' + level;
      row.textContent = text;
      body.append(row);
      body.scrollTop = body.scrollHeight;
      if (badge && parent.hidden && level !== 'note') {
        badge.hidden = false;
        badge.textContent = ++unread;
        if (level === 'error') badge.classList.add('err');
      }
    },
    note(text) {
      this.log('note', text);
    },
  };
}
