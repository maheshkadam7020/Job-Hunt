import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";
import { setLoading, setUser } from "@/redux/authslice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { user, loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/");
      } else {
        navigate("/admin/company");
      }
    }
  }, [user, navigate]);

  const sumbitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const resp = await axios.post(`${user_api_end_point}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (resp.data.success) {
        toast.success(resp.data.message);
        dispatch(setUser(resp.data.User));
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={sumbitHandler}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h1>

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
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={eventHandler}
                required
                className="accent-blue-600"
              />
              Recruiter
            </label>
          </div>
        </div>

        {loading ? (
          <Button
            disabled
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
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
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;