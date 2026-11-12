/* companion.js — Thimothy's file. Wires the Culture Companion UI in index.html (#companion).
   The API key must NEVER be in this file: the browser only talks to our own Node.js endpoint. */
(() => {
  const root = document.getElementById('companion');
  if (!root) return;
  const form = root.querySelector('#companion-form');
  const status = root.querySelector('#companion-status');
  const outputBody = root.querySelector('#companion-output .fact__body');
  const feed = root.querySelector('#companion-feed');
  const API = '/api/facts'; // TODO: agree endpoint and response shape with Anna-Maria

  const setState = (state, msg) => { root.dataset.state = state; status.textContent = msg; };

  function addToFeed(city, fact) {
    const li = document.createElement('li');
    li.className = 'companion__item';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = city;                       // textContent, never innerHTML
    const p = document.createElement('p');
    p.textContent = fact;
    li.append(tag, p);
    feed.prepend(li);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = form.elements.city.value.trim();
    if (!city) return setState('empty', 'Type a city first');
    setState('loading', 'Asking the companion...');
    try {
      const res = await fetch(`${API}?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error(String(res.status));
      const { fact } = await res.json();          // TODO: match the real response shape
      outputBody.textContent = fact;
      outputBody.classList.remove('companion__placeholder');
      addToFeed(city, fact);
      setState('ready', 'Fact stored');
    } catch (err) {
      setState('error', 'Could not get a fact. Try again.');
    }
  });
})();
