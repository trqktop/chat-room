
const toBase64 = (file: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((res) => {
    reader.onloadend = function () {
      const url = reader.result;
      res(url);
    };
  });
};

export default toBase64;
