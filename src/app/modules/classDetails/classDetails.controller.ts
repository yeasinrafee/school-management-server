import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ClassDetailsServices } from "./classDetails.service";

const createClassDetails = catchAsync(async (req, res) => {
  const result = await ClassDetailsServices.createClassDetailsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Details added successfully!",
    data: result,
  });
});

const getAllClassDetails = catchAsync(async (req, res) => {
  const result = await ClassDetailsServices.getAllClassDetailsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Details retrieved successfully!",
    data: result,
  });
});

const getSingleClassDetails = catchAsync(async (req, res) => {
  const { classId } = req.params;
  const result = await ClassDetailsServices.getSingleStudentFromDB(classId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class Detail retrieved successfully",
    data: result,
  });
});

export const ClassDetailsController = {
  createClassDetails,
  getAllClassDetails,
  getSingleClassDetails,
};
