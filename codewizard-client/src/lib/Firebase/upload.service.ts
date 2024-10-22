import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import type { UploadProps } from "antd";

export const customRequest: UploadProps["customRequest"] = ({
  file,
  onSuccess,
  onError,
  onProgress,
  filename,
}) => {
  const storageRef = ref(
    storage,
    `files/${(file as Blob).name
      .split(".")
      .slice(0, -1)
      .join(".")}-${formatDate(new Date())}`
  );

  const uploadTask = uploadBytesResumable(storageRef, file as Blob);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");

      // CONNECT ON PROGRESS
      if (onProgress) onProgress({ percent: progress });

      switch (snapshot.state) {
        case "paused":
          // console.log("Upload is paused");
          break;
        case "running":
          // console.log("Upload is running");
          break;
      }
    },
    function (error) {
      // Handle unsuccessful uploads
      // CONNECT ON ERROR
      if (onError) onError(error);
    },
    function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      // uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      //   console.log("File available at", downloadURL);
      // });
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);

        // CONNECT ON SUCCESS
        if (onSuccess) onSuccess(downloadURL); // Pass any parameter you would like
      });
    }
  );
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
