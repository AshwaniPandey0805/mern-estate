import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { signInUserWithGoogleAuthProvider } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";


function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        console.log("Hittig here");
        try {
            
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
    
            const result = await signInWithPopup(auth, provider);
            const response = await signInUserWithGoogleAuthProvider(result);
            dispatch(signInSuccess(response.data));
            navigate("/") // redirect to home page

        } catch (error) {   
            console.log("also hitting here");

            dispatch(signInFailure(error));
        }
    }

    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95'
        >
            Continue with google
        </button>
  )
}

export default OAuth