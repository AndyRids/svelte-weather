// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".main.svelte-14gkhs1{align-items:center;display:grid;column-gap:4px;grid-template-columns:1fr minmax(234px, 420px) 1fr;justify-items:center;height:100vh;overflow-y:scroll;width:100%}.main.svelte-14gkhs1::before,.main.svelte-14gkhs1::after{content:''}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}