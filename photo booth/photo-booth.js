// Get HTML elements
const video = document.getElementById("video");
const captureBtn = document.getElementById("capture-Btn");
const photosContainer = document.getElementById("photos");
const timerInput = document.getElementById("Timer");

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the camera: ", error);
    alert("Unable to access the camera. Please check permissions or try another browser.");
  });

// Handle capture button click
captureBtn.addEventListener("click", () => {
  let timer = parseInt(timerInput.value) || 0;

  if (timer > 0) {
    captureBtn.disabled = true;
    let countdown = setInterval(() => {
      captureBtn.textContent = `Capture ${timer}`;
      timer--;
      if (timer < 0) {
        clearInterval(countdown);
        captureBtn.textContent = "Capture";
        captureBtn.disabled = false;
        capturePhoto();
      }
    }, 1000);
  } else {
    capturePhoto();
  }
});

// Capture photo
function capturePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");

  // Create photo container
  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo");

  // Add image
  const img = document.createElement("img");
  img.src = dataURL;
  photoDiv.appendChild(img);

  // Add download button
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download";
  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "photo.png";
    a.click();
  });

  photoDiv.appendChild(downloadBtn);
  photosContainer.appendChild(photoDiv);
}
