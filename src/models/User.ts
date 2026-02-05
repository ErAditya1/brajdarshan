import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

/* ================= TYPES ================= */

export type UserRole = "tourist" | "vendor" | "admin" | "editor";
export type AuthProvider = "credentials" | "google" | "otp";

export interface IUser extends Document {
  
  name: string;
  email: string;
  phone?: string;
  password?: string;

  role: UserRole;
  authProvider: AuthProvider;

  isVerified: boolean;
  isBlocked: boolean;

  avatar?: {
    url:string
    imageFileId:string
  };

  address?: {
    city?: string;
    state?: string;
    country?: string;
  };

  preferences?: {
    language?: string;
    notifications?: boolean;
  };

  lastLogin?: Date;

  comparePassword(candidate: string): Promise<boolean>;

  createdAt: Date;
  updatedAt: Date;
}

/* ================= SCHEMA ================= */

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      select: false, // 🔐 never returned by default
    },

    role: {
      type: String,
      enum: ["tourist", "vendor", "admin", "editor"],
      default: "tourist",
      index: true,
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google", "otp"],
      default: "credentials",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },

    avatar: {
      url:{
        type:String
      },
      imageFileId:{
        type:String
      }
    },

    address: {
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
    },

    preferences: {
      language: {
        type: String,
        default: "en",
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= PASSWORD HASH ================= */

UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ================= METHODS ================= */

UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

/* ================= EXPORT MODEL ================= */

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
