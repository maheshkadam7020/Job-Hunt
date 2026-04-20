import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["recruiter", "student"],
      required: true,
    },

    profile: {
      bio: {
        type: String,
        default: "",
        trim: true,
      },

      skills: [
        {
          type: String,
          trim: true,
        },
      ],

      resume: {
        type: String,
        default: "",
      },

      resumeOriginalName: {
        type: String,
        default: "",
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        default: null,
      },

      profilephoto: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model("user", userSchema);