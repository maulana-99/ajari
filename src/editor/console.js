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
  // Lines are buffered and appended once per frame, so a fast loop logging thousands of lines
  // doesn't freeze the page and the Stop button stays clickable.
  // Only the newest MAX_ROWS lines stay on screen (like browser devtools), so a long-running log
  // doesn't slow the page down; older lines are summarized in a note at the top.
  const MAX_ROWS = 5000;
  let pending = document.createDocumentFragment();
  let frame = 0;
  let dropped = 0;
  let trimNote = null;
  const flush = () => {
    frame = 0;
    body.append(pending);
    pending = document.createDocumentFragment();
    const lines = body.querySelectorAll(':scope > .con-line');
    const extra = lines.length - MAX_ROWS;
    if (extra > 0) {
      for (let i = 0; i < extra; i++) lines[i].remove();
      dropped += extra;
      trimNote ??= document.createElement('div');
      trimNote.className = 'con-line note';
      trimNote.textContent = `${dropped.toLocaleString('id-ID')} baris awal disembunyikan agar halaman tetap ringan.`;
      body.prepend(trimNote);
    }
    body.scrollTop = body.scrollHeight;
  };
  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pending = document.createDocumentFragment();
    dropped = 0;
    trimNote = null;
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
      pending.append(row);
      frame ||= requestAnimationFrame(flush);
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
