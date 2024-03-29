import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully!",
    data: result,
  });
});

const createTeacher = catchAsync(async (req, res) => {
  const { password, teacher: teacherData } = req.body;
  const result = await UserServices.createTeacherIntoDB(password, teacherData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createTeacher,
  createAdmin,
};
