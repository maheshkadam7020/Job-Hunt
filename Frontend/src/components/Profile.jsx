import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import AppliedjobTable from "./AppliedjobTable";
import Updateprofiledialog from "./Updateprofiledialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 sm:px-8 py-8 border-b">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                <AvatarImage
                  src={
                    user?.profile?.profilephoto ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  }
                />
              </Avatar>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {user?.fullname}
                </h1>

                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  <p>{user?.email}</p>
                  <p>{user?.phonenumber}</p>
                  <p className="capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setEditMode(true)}
              className="rounded-xl px-6 h-11 bg-blue-600 hover:bg-blue-700"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
            <p className="text-gray-600 leading-7 bg-gray-50 border rounded-2xl p-4">
              {user?.profile?.bio || "No bio added"}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1.5 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500">No skills added</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Resume</h2>

            {user?.profile?.resume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <p className="text-gray-500">No Resume Uploaded</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Applied Jobs
        </h1>

        <AppliedjobTable />
      </div>

      <Updateprofiledialog editMode={editMode} setEditMode={setEditMode} />
    </div>
  );
};

export default Profile;
