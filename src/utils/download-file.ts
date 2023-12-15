import { checkExistWindow } from "./check-exist-window";

function downloadFile(address: any, fileName: any, suffix: any) {
  fetch(address)
    .then((response) => response.blob())
    .then((blob) => {
      const url = checkExistWindow() ? window.URL.createObjectURL(blob) : "";
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${suffix}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.log(error));
}

export default downloadFile;
