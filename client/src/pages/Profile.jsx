import React, { useEffect, useRef, useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { authValidationHandler } from "../validations/auth.validation";
import { updateUser } from "../services/user.service.js";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from "../redux/user/userSlice.js"
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [ error, setError ] = useState({});

  const fileRef = useRef(null);
  const uploadTaskRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) uploadImage(file);

    return () => {
      // cancel ongoing upload on unmount or file change
      uploadTaskRef.current?.cancel();
    };
  }, [file]);

  useEffect(() => {
    if(currentUser) {
      setFormData({
        username : currentUser.username || "",
        email : currentUser.email || "",
        avatar : currentUser.avatar || ""
      });
    }
  }, [currentUser])

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

  const handelFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id] : e.target.value
    }));

    console.log(formData);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationError = authValidationHandler(formData);
    if(Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }
    setError({});
    try {
      const currentUserId = currentUser._id;
      const response = await updateUser( currentUserId, formData);
      console.log("User Update Response : ", response.data?.user);
      dispatch(updateUserSuccess(response.data?.user));
      toast.success("User Updated Successfully.")
    } catch (error) {
    
      console.log("error.response?.data : ",error.response?.data);
      dispatch(updateUserFailure(error.response?.data));
      toast.error(
        error.response?.data?.message
      )  
    }

  }

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
          value={formData.username || ""}
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handelFormChange}
        />
        {
          error.username && (
            <p className="text-red-600 text-sm" >
              {error.username}
            </p>
          )
        }

        <input
          type="email"
          id="email"
          placeholder="email"
          value={formData.email || ""}
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handelFormChange}
        />
        {
          error.email && (
            <p className="text-red-600 text-sm" >
              {error.email}
            </p>
          )
        }

        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handelFormChange}
        />
        {
          error.password && (
            <p className="text-red-600 text-sm" >
              {error.password}
            </p>
          )
        }

        <button
          disabled={uploading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
          onClick={handleFormSubmit}
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
