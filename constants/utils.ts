export const getBase64 = async (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
  })
}