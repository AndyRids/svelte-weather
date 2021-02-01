// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wrapper-spinner.svelte-1y9or6s{align-items:center;border-radius:4px;box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-2);justify-content:space-evenly;display:flex;flex-direction:column;height:300px;width:300px}.spinner.svelte-1y9or6s{animation:0.75s linear 0s infinite normal none running svelte-1y9or6s-rotate;border-color:var(--color) transparent var(--color) var(--color);border-width:calc(var(--size) / 15);border-style:solid;border-image:initial;border-radius:50%;box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-1);height:var(--size);width:var(--size)}.spinner-text.svelte-1y9or6s{font-size:1.4rem;font-weight:500;margin:0;padding:0}.online-true.svelte-1y9or6s,.online-false.svelte-1y9or6s{box-shadow:var(--box-shadow-1),\r\n                  var(--box-shadow-2);padding:1px 4px}.online-true.svelte-1y9or6s{color:rgb(43, 180, 39)}.online-false.svelte-1y9or6s{color:rgb(221, 51, 51)}@keyframes svelte-1y9or6s-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}