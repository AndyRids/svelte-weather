const resolveCache = {};
const rejectCache = {};

// returns a counter function
const counter = () => {
  let id = 0;

  return () => { id += 1; return id; };
};

// counter function, which returns an incremented number each call
const nextID = counter();

/**
 * takes the content object from workerAction method of WorkerWrapper
 * class and creates a unique one-up serial (msgID). A message object,
 * which contains the action and data from content and the msgID is
 * posted to the web worker referenced by the worker argument.
 *
 * @param {Object} content - { action: 'init', data: {} }
 * @param {Worker} worker - web worker instance
 */
function sendMessage(content, worker) {
  // increment message id
  const msgID = nextID();

  const { action, data } = content;
  // message for the worker
  const message = { msgID, action, data };

  return new Promise((resolve, reject) => {
    // save resolve callback in the cache
    resolveCache[msgID] = resolve;
    // save reject callback in the cache
    rejectCache[msgID] = reject;

    // post message to the worker
    worker.postMessage(message);
  });
}

// Handle incoming onmessage event
function handleMessage(event) {
  // extract message id, error and message content
  const { msgID, error, content } = event.data;

  if (content) {
    // retrive resolve from cache using id
    const resolve = resolveCache[msgID];

    // if reference found, resolve with the content
    if (resolve) resolve(content);
  } else {
    // retrive reject from cache using id
    const reject = rejectCache[msgID];

    // if reference found, resolve with the content
    if (reject) reject(error);
  }

  // purge used callbacks from the cache
  delete resolveCache[msgID];
  delete rejectCache[msgID];
}

/**
 * acts as a wrapper for a web worker. When a new instance of WorkerWrapper
 * is created, the constructor expects a path to the web worker file and it
 * creates the new worker, based on the file at this path and stores a
 * reference to it.
 *
 * the workerAction method is used to pass postMessage content to the worker,
 * via the sendMessage function.
 */
export default class WorkerWrapper {
  constructor(workerPath) {
    // reference to the web worker
    this.worker = new Worker(workerPath);
    // set handler for the worker onmessage events
    this.worker.onmessage = handleMessage;
  }

  /**
   * workerAction method is used to pass postMessage content to the worker,
   * via the sendMessage function.
   *
   * @param {Object} content - { action: 'init', message: {} }
   * @returns {Promise}
   */
  workerAction(content) {
    return sendMessage(content, this.worker);
  }
}
