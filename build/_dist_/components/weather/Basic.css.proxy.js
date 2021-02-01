// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".weather-basic.svelte-j81cdw{align-items:center;display:flex;flex-direction:column;justify-items:center;text-align:center;width:100%}.weather-basic__location.svelte-j81cdw{font-size:1.4rem;font-weight:600;padding:0}.weather-basic__description.svelte-j81cdw{font-size:1.1rem;font-weight:500}.weather-basic__description.svelte-j81cdw::first-letter{text-transform:uppercase}.weather-basic__sunrise-time.svelte-j81cdw,.weather-basic__sunset-time.svelte-j81cdw,.weather-basic__temp.svelte-j81cdw{color:#405177;font-weight:600}.weather-basic__temp.svelte-j81cdw{font-size:1.9rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}