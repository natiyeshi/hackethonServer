import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import {axios} from '../axios'
import { RiLockPasswordLine } from "react-icons/ri";

function Signin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

    const data = {
		email,
		password
	}

    const submit = (e)=>{
		e.preventDefault()
		axios.post("/auth/signin",data)
			.then((res)=>{
				console.log(res)
			}).catch((err)=>{
				console.log(err)
				setError(err?.response?.data?.message)
			})
	}
  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen">
      <div className="bg-white m-auto p-20 rounded-xl shadow-xl">
        <div className="bg-gradient-to-t	 pb-10">
          <div className="flex flex-col justify-center items-center space-y-10">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:5xl text-primary-500 pt-10 pl-2">
              Login
            </h1>
            {
				error &&
				<span className='bg-red-500 text-white w-[30%] text-center py-3 capitalize'>{error}</span>
				}
          </div>

          <div>
            <form className="flex flex-col justify-center items-center">
              
              <div className="p-5 flex items-center">
                <div>
                  <AiOutlineMail className="text-primary-400 text-3xl" />
                </div>
                <div className="w-56 relative group">
                  <input
                    type="emial"
                    name="email"
                    required
                    className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
                    Email
                  </label>
                </div>
              </div>
              <div className="p-5 flex items-center">
                <div>
                  <RiLockPasswordLine className="text-primary-400 text-3xl" />
                </div>
                <div className="w-56 relative group">
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
                    Password
                  </label>
                </div>
              </div>


              <button
                onClick={submit}
                type="submit"
                className="relative border-2 text-center mt-4 p-2 rounded-md w-full hover:bg-black hover:text-white active:scale-95 transition-transform ease-in-out delay-75"
              >
                <h2 className="font-semibold">Login</h2>
                <div className=" rounded-md absolute top-[-15%] left-[-2%] bg-primary-500/[0.2] w-full h-full hover:top-0 hover:left-0 transition transform duration-200 ease-in-out"></div>
              </button>
              <p className="text-sm ">
              you don’t have account ?{" "}
                <a className="text-primary-500 cursor-pointer" href="/signup">
                Create new account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
