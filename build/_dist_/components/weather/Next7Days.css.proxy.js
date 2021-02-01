// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".forecast.svelte-p6zs98{align-items:center;border:1px solid #e4e3e3;border-radius:4px;box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-2);display:grid;gap:8px 5px;grid-auto-rows:max(44px, auto);grid-template-columns:1fr 45px 45px repeat(2, 46px);justify-items:center;margin-bottom:4px;width:100%}.forecast__header.svelte-p6zs98{font-weight:500}.header--justify-left.svelte-p6zs98{justify-self:left}.forecast__day.svelte-p6zs98{border-radius:4px;font-weight:500;padding-left:10px;transition:background 500ms}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}