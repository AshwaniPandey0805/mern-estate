import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef(null);
  const uploadTaskRef = useRef(null);

  useEffect(() => {
    if (file) uploadImage(file);

    return () => {
      // cancel ongoing upload on unmount or file change
      uploadTaskRef.current?.cancel();
    };
  }, [file]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPG, PNG, or WEBP images are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image must be less than 2MB.";
    }
    return null;
  };

  const uploadImage = (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      setProgress(0);
      return;
    }

    setUploadError("");
    setUploading(true);

    const storage = getStorage(app);
    const filePath = `users/${currentUser._id}/avatar-${Date.now()}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTaskRef.current = uploadTask;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (error) => {
        setUploadError(error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        setUploading(false);
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 rounded-full object-cover cursor-pointer self-center"
        />

        {/* <p className="text-sm self-center">
          {uploadError && (
            <span className="text-red-600">{uploadError}</span>
          )}
          {!uploadError && uploading && (
            <span className="text-slate-600">Uploading {progress}%</span>
          )}
          {!uploadError && progress === 100 && (
            <span className="text-green-600">Image uploaded successfully</span>
          )}
        </p> */}
        
        <p className="text-sm self-center">
          {
            uploadError 
            ? 
              (<span className="text-red-600">{uploadError}</span>) 
            : 
              uploading && progress > 0 && progress < 100 
            ? 
              (<span className="text-slate-600">Uploading {progress}%</span>) 
            : 
              progress === 100 
            ? 
              (<span className="text-green-600">Image uploaded successfully</span>) 
            : 
              "" 
          }
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={uploading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
