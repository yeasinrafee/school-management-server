/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { ClassDetails } from "../classDetails/classDetails.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateStudentId,
  generateTeacherId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TTeacher } from "../teacher/teacher.interface";
import { Teacher } from "../teacher/teacher.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  if (await Student.isStudentExists(payload.id)) {
    throw new Error("Student already exists!");
  }

  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  const classDetail = await ClassDetails.findById(payload.classDetails);

  if (!classDetail) {
    throw new AppError(400, "Class Details not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set manually generated id
    userData.id = await generateStudentId(classDetail);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createTeacherIntoDB = async (password: string, payload: TTeacher) => {
  //create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set teacher role
  userData.role = "teacher";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateTeacherId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // Built in static method

    //create a teacher
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    // Create a teacher (transaction-2)
    const newTeacher = await Teacher.create([payload], { session });

    if (!newTeacher.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Teacher");
    }

    await session.commitTransaction();
    await session.endSession();
    return newTeacher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  //create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // Built in static method

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Admin");
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    // Create a student (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createTeacherIntoDB,
  createAdminIntoDB,
};
