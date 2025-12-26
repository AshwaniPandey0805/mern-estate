import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { signInUserWithGoogleAuthProvider } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";
import { toast } from "react-toastify";
import { useState } from 'react';


function OAuth() {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {         
        
        try {

            setLoading(true);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt:"select_account"
            });
            
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log("result : ", result);
            // 🔐 Send ID token to backend
            const idToken = await result.user.getIdToken();
            
            console.log("idToken : ", idToken);
            
            const response = await signInUserWithGoogleAuthProvider(idToken);

            dispatch(signInSuccess(response.data));
            navigate("/") // redirect to home page

            toast.success("User Logged in Successfully");
        
        } catch (error) {

            dispatch(signInFailure(
                error?.response?.data?.message || "Google sign-in failed"
            ));
            toast.error(
                error.response?.data?.message  || "Google sign-in failed"
            )
        } finally {
            setLoading(false);
        }    
    }

    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95'
        >
            {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
  )
}

export default OAuth