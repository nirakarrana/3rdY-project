import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';


function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    console.log(isSignIn);
    if(!isSignIn){
      await axios.post(import.meta.env.BACKEND_URL || 'http://localhost:4000/api/v1' + '/auth/signup', formData)
        .then((res)=>{
          if(res){
            toast("Successfully Registered")
            setIsSignIn(true)
          }
        }).catch((err)=>{
          console.log(err)
        })
    } else {
      await axios.post(import.meta.env.BACKEND_URL || 'http://localhost:4000/api/v1' + '/auth/signin', formData)
        .then((res)=>{
          if(res){
            toast("Successfully Logged In");
            window.location.href='/';
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isAdmin',res.data.admin)
          }
        }).catch((err)=>{
          toast(err.message)
        })
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
         
          <div className="p-8 text-center bg-gradient-to-r from-green-500 to-blue-400">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome {isSignIn ? 'Back' : 'to StayFinder'}
            </h1>
            <p className="text-indigo-100">
              {isSignIn 
                ? 'Sign in to access your account' 
                : 'Create an account to get started'}
            </p>
          </div>

         
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email here"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;