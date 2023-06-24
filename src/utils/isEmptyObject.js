/* eslint-disable */
const isEmptyObject = (obj) =>
  obj && // 👈 null and undefined check
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

export default isEmptyObject;
