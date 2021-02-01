// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".weather-details.svelte-42055u{align-items:center;display:grid;gap:14px;grid-template-columns:repeat(3, 1fr);grid-template-rows:repeat(2, var(--details-card));justify-items:center;text-align:center;width:100%}.card.svelte-42055u{align-items:center;background:var(--bg-card);border:1px solid #e4e3e3;border-radius:10px;box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-2);display:flex;flex-direction:column;font-size:1.1rem;height:100%;justify-content:space-evenly;width:100%\r\n  }.card__header.svelte-42055u{height:30px}.card__figure.svelte-42055u{margin:0;padding:0}.card__value.svelte-42055u{color:#405177;font-weight:600}.card__icon.svelte-42055u{transform:rotate(var(--wind-degree));transition:transform 500ms ease-out}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}