import React, { useEffect, useState } from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Details from "./components/Details";
import Company from "./components/admin/Company";
import AddCompany from "./components/admin/AddCompany";
import UpdateCompany from "./components/admin/UpdateCompany";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicant from "./components/admin/Applicant";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authslice";
import { user_api_end_point } from "./components/utils/constant";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const resp = await axios.get(`${user_api_end_point}/profile`, {
        withCredentials: true,
      });

      if (resp.data.success) {
        dispatch(setUser(resp.data.User));
      }
    } catch (error) {
      console.log("User not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/details/:id" element={<Details />} />

        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admin/company"
          element={
            <AdminRoute>
              <Company />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addcompany"
          element={
            <AdminRoute>
              <AddCompany />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/company/:id"
          element={
            <AdminRoute>
              <UpdateCompany />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminJobs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/post/job"
          element={
            <AdminRoute>
              <PostJob />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/applicants/:id"
          element={
            <AdminRoute>
              <Applicant />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;