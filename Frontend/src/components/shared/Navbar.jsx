import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { user_api_end_point } from "../utils/constant";
import { logout, setUser } from "@/redux/authslice";
import { toast } from "sonner";



const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const fetchProfile = async () => {
    try {
      const resp = await axios.get(`${user_api_end_point}/profile`, {
        withCredentials: true,
      });

      if (resp.data.success) {
        dispatch(setUser(resp.data.User));
      } else {
        console.log(error);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  };

 useEffect(() => {
    fetchProfile();
  
}, []);

  const logoutHandler = async () => {
    {
      try {
        const resp = await axios.delete(`${user_api_end_point}/logout`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        });
        if (resp.data.success) {
          dispatch(logout());
          toast.success(resp.data.message);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during logout.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md w-full">
      <div className="flex items-center justify-between mx-auto h-16 max-w-7xl px-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        <div className="hidden md:flex gap-12 items-center">
          <ul className="flex font-medium gap-5 items-center">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/admin/company" onClick={() => setIsOpen(false)}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setIsOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setIsOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setIsOpen(false)}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="gap-2 flex">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilephoto ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader className="w-72">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilephoto ||
                          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4 text-gray-600">
                    {
                      user && user.role==='student' && (
                        <>
                        <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                        </>
                      )
                    }
                    
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          <ul className="flex flex-col gap-4 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/admin/company" onClick={() => setIsOpen(false)}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setIsOpen(false)}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setIsOpen(false)}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setIsOpen(false)}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-[#6A38C2] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <User2 />
                <span>
                  <Link to="/profile">Profile</Link>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LogOut />
                <span>
                  <Button variant="link" onClick={logoutHandler}>
                    Logout
                  </Button>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
