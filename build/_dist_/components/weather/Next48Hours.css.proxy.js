// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wrapper-scroll.svelte-2lq7or.svelte-2lq7or{box-shadow:var(--box-shadow-1),\r\n                var(--box-shadow-2);border-radius:4px;cursor:grab;display:flex;overflow-y:hidden;width:100%}.wrapper-scroll.svelte-2lq7or.svelte-2lq7or::-webkit-scrollbar{height:var(--scrollbar-height)}.wrapper-scroll.svelte-2lq7or.svelte-2lq7or::-webkit-scrollbar-track{background:var(--scrollbar-track)}.wrapper-scroll.svelte-2lq7or.svelte-2lq7or::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:2px}.hour-card.svelte-2lq7or.svelte-2lq7or{align-items:center;background:var(--bg-section);border-left:1px solid var(--borders);display:flex;height:100%;justify-content:space-between;flex-direction:column;min-width:calc(100% / 4 + 0px);user-select:none}.hour-card.svelte-2lq7or.svelte-2lq7or:first-child{border-left:none}.hour-card__header.svelte-2lq7or.svelte-2lq7or{align-items:center;align-self:baseline;border-bottom:1px solid var(--borders);cursor:pointer;display:flex;font-size:1.1rem;font-weight:600;height:44px;justify-content:space-evenly;transition:background 500ms;width:100%}.hour-card__header.svelte-2lq7or.svelte-2lq7or:hover{background:#89abf580}.header--highlight.svelte-2lq7or.svelte-2lq7or{background:#89abf5fa}.header--highlight.svelte-2lq7or>.hour-card__title-icon.svelte-2lq7or{transform:rotate(-90deg)}.hour-card__title.svelte-2lq7or.svelte-2lq7or{max-width:fit-content;margin:0;padding:0;pointer-events:none}.hour-card__title-icon.svelte-2lq7or.svelte-2lq7or{pointer-events:none;transition:transform 500ms}.hour-card__body.svelte-2lq7or.svelte-2lq7or{align-items:center;display:flex;flex-direction:column;justify-content:space-evenly}@media screen and (max-width: 380px){.hour-card.svelte-2lq7or.svelte-2lq7or{min-width:calc(100% / 3 + 0px)}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}