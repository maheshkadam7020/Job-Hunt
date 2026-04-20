import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authslice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const {user}=useSelector(store=>store.auth);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: null,
  });
   const loading = useSelector((store) => store.auth.loading);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phonenumber", input.phonenumber);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const resp = await axios.post(
        `${user_api_end_point}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log("RESPONSE:", resp.data);
      if (resp.data.success) {
        toast.success(resp.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log("ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      toast.error(
        error.response?.data?.message || "An error occurred during login.",
      );
    }finally {
          dispatch(setLoading(false));
        }
  };
   if(user)
  {
    if(user.role==='student')
    {
      navigate('/')
    }
    else{
      navigate('/admin/company')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={sumbitHandler}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h1>

        <div>
          <Label className="text-gray-700">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={eventHandler}
            placeholder="Enter your full name"
            className="mt-1 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <Label className="text-gray-700">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={eventHandler}
            placeholder="Enter your email"
            className="mt-1 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <Label className="text-gray-700">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={eventHandler}
            placeholder="Enter your password"
            className="mt-1 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <Label className="text-gray-700">Phone Number</Label>
          <Input
            type="tel"
            name="phonenumber"
            value={input.phonenumber}
            onChange={eventHandler}
            placeholder="Enter your phone number"
            className="mt-1 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <Label className="text-gray-700 mb-2 block">Select Role</Label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={eventHandler}
                required
                className="accent-blue-600"
              />
              Student
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                checked={input.role === "recruiter"}
                onChange={eventHandler}
                value="recruiter"
                className="accent-blue-600"
              />
              Recruiter
            </label>
          </div>
        </div>

        <div>
          <Label className="text-gray-700">Profile Photo</Label>
          <input
            type="file"
            name="file"
            onChange={changeFileHandler}
            accept="image/*"
            className="mt-2 block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
            required
          />
        </div>

        {loading ? (
          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300'>
            <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </Button>
        )}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
