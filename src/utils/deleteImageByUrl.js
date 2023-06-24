import { storage } from "src/firebase";

const deleteImageByUrl = (imgUrl) => {
  if (imgUrl) {
    const httpsReference = storage.refFromURL(imgUrl);
    const fileName = httpsReference.name;
    storage
      .ref("images")
      .child(fileName)
      .delete()
      .then(() => {})
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
};

export default deleteImageByUrl;
