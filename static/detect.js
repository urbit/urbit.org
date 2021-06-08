if (document.body.classList.contains("index")) {
  let download = document.getElementById("download");
  let downloadDiv = document.getElementById("download-info");
  let downloadInfo = document.getElementById("download-div");

  let curOS = "";
  if (navigator.appVersion.indexOf("Win")!=-1) curOS="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) curOS="MacOS";
  if (navigator.appVersion.indexOf("Linux")!=-1) curOS="Linux";

  if (curOS === "Windows") {
    let newInfo = document.createElement("span");
    newInfo.textContent = "Coming soon for Windows";
    downloadDiv.removeChild(downloadInfo);
    downloadDiv.appendChild(newInfo);
  }

  if (curOS === "Linux") {
    let newInfo = document.createElement("span");
    newInfo.classList = "mono";
    newInfo.textContent = "sudo snap install port";
    downloadDiv.classList = "bg-gray1 white br2 pv2 ph3 dib";
    downloadDiv.removeChild(downloadInfo);
    downloadDiv.appendChild(newInfo);
  }
}