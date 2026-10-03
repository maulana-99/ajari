export function createConsole(parent, title = 'Output') {
  parent.classList.add('con');
  parent.innerHTML = `<div class="con-head"><span></span><button type="button">Bersihkan</button></div><div class="con-body" aria-live="polite"></div>`;
  const head = parent.querySelector('.con-head span');
  const body = parent.querySelector('.con-body');
  head.textContent = title;
  const hint = () => {
    body.innerHTML = '<div class="con-empty">Hasil kode akan muncul di sini. Tekan Jalankan.</div>';
  };
  const clear = () => {
    body.textContent = '';
  };
  parent.querySelector('button').onclick = hint;
  hint();
  return {
    clear,
    log(level, text) {
      body.querySelector('.con-empty')?.remove();
      const row = document.createElement('div');
      row.className = 'con-line ' + level;
      row.textContent = text;
      body.append(row);
      body.scrollTop = body.scrollHeight;
    },
    note(text) {
      this.log('note', text);
    },
  };
}
