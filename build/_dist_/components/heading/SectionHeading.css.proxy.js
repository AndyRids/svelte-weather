// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".section-heading.svelte-1rndo73{align-items:center;display:grid;gap:10px;grid-template-columns:1fr auto 1fr;height:35px;margin:5px 0px;padding:0;width:100%}.section-heading.svelte-1rndo73::before,.section-heading.svelte-1rndo73::after{border-top:2px double var(--borders);content:\"\"}.section-heading__title.svelte-1rndo73{font-size:1.1rem;font-weight:600;margin:0;padding:0;text-align:center}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}