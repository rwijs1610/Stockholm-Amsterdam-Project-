/* auth.js — masthead account UI: login/sign-up dialog + profile dialog. Load on every page (defer).
   Sessions, validation and saving are PHP's job. This file only opens/closes the dialogs
   and previews the chosen avatar. Never trust the checks here on the server side. */
(() => {
  const header = document.querySelector('.masthead');

  // DEV PREVIEW ONLY. Remove once PHP sets data-auth: index.html?auth=in shows the logged-in state.
  const demo = new URLSearchParams(location.search).get('auth');
  if (header && (demo === 'in' || demo === 'out')) header.dataset.auth = demo;

  const authDlg = document.getElementById('auth-dialog');
  const profDlg = document.getElementById('profile-dialog');
  if (!authDlg || !profDlg) return;

  // Login / sign-up tabs
  const tabs = authDlg.querySelectorAll('[role="tab"]');
  const panels = authDlg.querySelectorAll('[role="tabpanel"]');
  function showTab(name) {
    tabs.forEach(t => {
      const on = t.dataset.tab === name;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(p => { p.hidden = p.dataset.panel !== name; });
  }
  function focusFirst() {
    authDlg.querySelector('[role="tabpanel"]:not([hidden]) input')?.focus();
  }
  tabs.forEach(t => t.addEventListener('click', () => { showTab(t.dataset.tab); focusFirst(); }));

  // Open: any element with data-open="auth" (+ data-tab) or data-open="profile"
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (!opener) return;
    e.preventDefault();
    if (opener.dataset.open === 'auth') {
      showTab(opener.dataset.tab || 'login');
      authDlg.showModal();
      focusFirst();
    } else {
      profDlg.showModal();
    }
  });

  // Close: [data-close] buttons and clicks on the backdrop
  [authDlg, profDlg].forEach(d => {
    d.addEventListener('click', e => {
      if (e.target === d || e.target.closest('[data-close]')) d.close();
    });
  });

  // Avatar preview and basic client-side checks
  const input = profDlg.querySelector('input[type="file"]');
  const preview = profDlg.querySelector('.profile__avatar');
  const error = profDlg.querySelector('.form__error');
  const MAX_BYTES = 2 * 1024 * 1024;
  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
  input.addEventListener('change', () => {
    const file = input.files[0];
    error.hidden = true;
    if (!file) return;
    if (!ALLOWED.includes(file.type) || file.size > MAX_BYTES) {
      input.value = '';
      error.textContent = 'Use a JPG, PNG or WebP under 2 MB.';
      error.hidden = false;
      return;
    }
    const img = new Image();
    img.alt = '';
    img.src = URL.createObjectURL(file);
    preview.replaceChildren(img);
  });
})();
