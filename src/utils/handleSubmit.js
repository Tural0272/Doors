import { db } from "src/firebase";
const handleSubmit = (e, type, data, resetFunc, haveErrorFunction, errFunc) => {
  e.preventDefault();
  db.collection(type)
    .add(data)
    .then(() => resetFunc())
    .catch((err) => {
      if (haveErrorFunction) {
        errFunc(err);
      } else {
        alert(err);
      }
    });
};

export default handleSubmit;
