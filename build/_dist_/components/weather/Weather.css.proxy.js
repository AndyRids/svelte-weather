// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wrapper-chart.svelte-1cgwkid{align-items:center;box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-2);border-radius:4px;display:flex;grid-column:span 3;height:115px;justify-content:center;position:relative;width:100%}.chart.svelte-1cgwkid{margin:0;padding:0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}