import { Schema, model } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";

// User name Schema
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// User Student Schema
const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    designation: { type: String, required: true },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
adminSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query Middleware
adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// For static methods
adminSchema.statics.isAdminExists = async function (id: string) {
  const existingAdmin = await Admin.findById(id);
  return existingAdmin;
};

// Crating Model
export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
