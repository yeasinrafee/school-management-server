/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { Teacher } from "./teacher.model";
import { TTeacher } from "./teacher.interface";
import { teacherSearchableFields } from "./teacher.constant";

const getAllTeachersFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(
    Teacher.find().populate("academicSubject"),
    query
  )
    .search(teacherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await teacherQuery.modelQuery;
  return result;
};

const getSingleTeacherFromDB = async (id: string) => {
  const result = await Teacher.findById(id).populate("academicSubject");
  return result;
};

const updateTeacherIntoDB = async (id: string, payload: Partial<TTeacher>) => {
  const { name, ...remainingTeacherData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingTeacherData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  const result = await Teacher.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteTeacherFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedTeacher) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete teacher");
    }

    const userId = deletedTeacher.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete teacher");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedTeacher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const TeacherServices = {
  getAllTeachersFromDB,
  getSingleTeacherFromDB,
  updateTeacherIntoDB,
  deleteTeacherFromDB,
};
