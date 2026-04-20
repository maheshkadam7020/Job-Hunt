import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { user_api_end_point } from "./utils/constant";
import { setUser } from "@/redux/authslice";


const Updateprofiledialog = ({ editMode, setEditMode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
    role: user?.role || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("role", input.role);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const resp = await axios.post(
        `${user_api_end_point}/update/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        dispatch(setUser(resp.data.user));
        toast.success(resp.data.message);
        setEditMode(false);
      }
      else{
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={editMode} onOpenChange={setEditMode}>
      <DialogContent
        onInteractOutside={() => setEditMode(false)}
        className="w-[95%] sm:max-w-2xl rounded-3xl p-0 max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={submitHandler}>
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
                Update Profile
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="Enter full name"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Enter email"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    name="phonenumber"
                    value={input.phonenumber}
                    onChange={changeEventHandler}
                    placeholder="Enter phone number"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  name="role"
                  value={input.role}
                  onChange={changeEventHandler}
                  placeholder="Enter role"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  placeholder="Enter bio"
                  className="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <Input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="Java, React, MySQL"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Resume Upload</Label>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center text-center gap-3">
                  <Upload className="w-8 h-8 text-blue-500" />

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Upload Resume
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, DOCX up to 5MB
                    </p>
                  </div>

                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={fileChangeHandler}
                    className="max-w-sm cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditMode(false)}
                className="w-full h-11 rounded-xl"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  disabled
                  className="w-full h-11 rounded-xl bg-blue-600 text-white"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Update Profile
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Updateprofiledialog;