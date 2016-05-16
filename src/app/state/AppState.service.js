
const INIT_STATE = {
  swaggerObj: {
    swagger: '2.0',
    info: {},
    paths: {},
    definitions: {},
  },
  ui: {
    info: {},
    globals: {},
    paths: [],
    definitions: [],
  },
  prevState: {},
};


const subscribers = [];

function Store() {
  let prevState = {};
  let state = {};

  state = update(state, INIT_STATE);

  const storeApi = Object.assign(Object.create(null), {
    getState,
    getPrevState,
    dispatch,
    update,
    subscribe,
    notifySubscribers,
  });

  return storeApi;

  function getState() { return state; }
  function getPrevState() { return prevState; }
  function dispatch(action) {
    prevState = state;
    state = update(state, action);

    notifySubscribers();
  }
  function update() { return {}; }
  function subscribe(fn) { subscribers.push(fn); }
  function notifySubscribers() {
    subscribers.forEach(subscriber => { subscriber(prevState, state); });
  }
}

export default Store;
