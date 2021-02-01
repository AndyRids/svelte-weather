/**
 * Uses the PointerEvent interface to impliment 'drag to scroll' on
 * any scrollable element. This interface represents the state of a
 * DOM event produced by a pointer, which is a mouse, pen or any
 * contact point on a touch-enable surface.
 *
 * @param {Element} scrollingElement - element with overflowX: scroll;
 */
export default function dragToScroll(scrollingElement) {
  // element = scrollingElement (scrollable element)
  const element = scrollingElement;

  /**
   * addEventListener flag, which is used by the action's
   * destroy method to remove event listeners, if the
   * element using the action is destroyed before they
   * can be removed by handleDragEnd event handler.
   */
  let listeners = false;

  // store element.scrollLeft & event.clientX values
  const position = { scrollLeft: 0, x: 0 };

  // scroll element by distance moved by the pointer
  const handleDragMove = (event) => {
    // How far on the x-axis the pointer has moved
    const distanceX = event.clientX - position.x;

    // Scroll the element by setting its scrollLeft value
    element.scrollLeft = position.scrollLeft - distanceX;
  };

  // when the pointer event ends
  const handleDragEnd = (event) => {
    // reset cursor to grab hand
    element.style.cursor = 'grab';

    // release pointer event capture on element
    event.target.releasePointerCapture(event.pointerId);

    // remove event listeners
    element.removeEventListener('pointermove', handleDragMove, true);
    element.removeEventListener('pointerup', handleDragEnd, true);
    element.removeEventListener('pointercancel', handleDragEnd, true);

    // rest listener flag
    listeners = false;
  };

  const handleDragStart = (event) => {
    // set cursor to grabbing hand
    element.style.cursor = 'grabbing';

    /**
     * the mouse cursor can leave the element when the user
     * is clicking and dragging. setPointerCapture is used
     * to designate element as the capture target of future
     * pointer events that occur when the pointer has left
     * the element.
     */
    element.setPointerCapture(event.pointerId);

    // store the elements current scrollLeft value
    position.scrollLeft = element.scrollLeft;

    // store the initial event.clientX position
    position.x = event.clientX;

    // attach related event handlers inside pointerdown event handler (handleDragStart)
    element.addEventListener('pointermove', handleDragMove, true);
    element.addEventListener('pointerup', handleDragEnd, true);
    element.addEventListener('pointercancel', handleDragEnd, true);

    listeners = true;
  };

  const destroy = () => {
    // if element is destroyed before handleDragEnd removes event listeners
    if (listeners) {
      element.removeEventListener('pointermove', handleDragMove, true);
      element.removeEventListener('pointerup', handleDragEnd, true);
      element.removeEventListener('pointercancel', handleDragEnd, true);

      listeners = false;
    }
  };

  // set the initial event listener handler for pointerdown event
  element.addEventListener('pointerdown', handleDragStart, true);

  // return destroy method, which removes any remaining event listeners
  return { destroy };
}
