// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Firestore's Node transport uses @grpc/grpc-js, which expects `setImmediate`
// in environments where Jest runs without Node's full timers polyfill.
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => global.setTimeout(fn, 0, ...args);
}
