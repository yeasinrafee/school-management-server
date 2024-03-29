import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSubjectServices } from "./academicSubject.service";

const createAcademicSubject = catchAsync(async (req, res) => {
  const result = await AcademicSubjectServices.createAcademicSubjectIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic subject is created successfully",
    data: result,
  });
});

const getAllAcademicSubjects = catchAsync(async (req, res) => {
  const result = await AcademicSubjectServices.getAllAcademicSubjectsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic subjects are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicSubjectFromDB = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const result = await AcademicSubjectServices.getSingleAcademicSubjectFromDB(
    subjectId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic subject is retrieved successfully",
    data: result,
  });
});

const updateAcademicSubject = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const result = await AcademicSubjectServices.updateAcademicSubjectIntoDB(
    subjectId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic subject is updated successfully",
    data: result,
  });
});

export const AcademicSubjectController = {
  createAcademicSubject,
  getAllAcademicSubjects,
  getSingleAcademicSubjectFromDB,
  updateAcademicSubject,
};
