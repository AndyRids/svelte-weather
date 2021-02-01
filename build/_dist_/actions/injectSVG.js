/**
 * Svelte action used by img elements, which on mount and provided
 * SVG is supported, uses fetch API to request the SVG file in the
 * img element's src attribute. The svg is inserted before the img
 * element, which is then removed.
 *
 * Allows the use of SVG without having inline svg markup polluting
 * the code and also makes it possible to have svg icons organised
 * in folders, for easy UI icon replacement. SVG can also be easily
 * animated with CSS, once it is injected.
 *
 * @param {Element} imgElement - an img element
 */
export default async function injectSVG(imgElement) {
  // img element (user of the action)
  const img = imgElement;

  // if SVG supported, fetch & inject SVG element
  if (window.SVGSVGElement) {
    // fetch the svg in the img src attribute
    fetch(img.getAttribute('src'))
      .then((response) => {
        response.text()
          .then((data) => {
            img.insertAdjacentHTML('beforebegin', data);
            img.remove();
          });
      });
  }
}
