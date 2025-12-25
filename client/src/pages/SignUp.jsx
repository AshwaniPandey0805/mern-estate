import React, { useState } from 'react'
import {Link,  useNavigate} from "react-router-dom"
import { authValidationHandler } from '../validations/auth.validation.js';
import { signUpUser } from '../services/auth.service.js';
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
    // console.log(formData);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationError = authValidationHandler(formData);
    if(Object.keys(validationError).length > 0){
      setError(validationError);
      return;
    }
    console.log("formData >> : ", formData);
    try {
      setIsLoading(true);
      setError({});
      const res = await signUpUser(formData);
      setIsLoading(false);
      toast.success("User Register Successfully");
      navigate('/sign-in');
    } catch (error) {
      if(error.response?.data?.errors){
        const backendErrors = {};
        error.response.data.errors.forEach((e) => {
          backendErrors[e.field] = e.message;
        });
        setError(backendErrors);
        setIsLoading(false);
      }
      setError(error);
      setIsLoading(false);
      // console.log("getting error message here : ", error.response?.data);
      toast.error(
        error.response?.data?.message  || "Internal Server Error"
      )
      // console.log("getting error for this side : ", error.response?.data);    
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder="username"
          className="
            p-3 rounded-lg bg-white
            border-none
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:shadow-md
            transition
          "
          id='username'
          onChange={handleFormChange}
        />
        {error.username && (
          <p className='text-red-600 text-sm'>{error.username}</p>
        ) }
        <input 
          type="email" 
          placeholder='email' 
          className="
            p-3 rounded-lg bg-white
            border-none
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:shadow-md
            transition
          " 
          id='email'
          onChange={handleFormChange}
        />
        {error.email && (
          <p className='text-red-600 text-sm' >{error.email}</p>
        )}
        <input 
          type="password" 
          placeholder='password' 
          className="
            p-3 rounded-lg bg-white
            border-none
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:shadow-md
            transition
          " 
          id='password'
          onChange={handleFormChange}
        />
        {error.password && (
          <p className='text-red-600 text-sm' >{error.password}</p>
        )}
        <button
          disabled={isLoading} 
          className='
            bg-slate-700 
            text-white p-3
            rounded-lg
            uppercase
            hover:opacity-95 '
            onClick={handleFormSubmit}
            >
              { isLoading ? 'Loading...' : 'Sign up' }
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp