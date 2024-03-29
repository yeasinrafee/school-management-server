import express from "express";
import { UserControllers } from "./user.controller";
import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherValidations } from "../teacher/teacher.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-teacher",
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  UserControllers.createTeacher
);

export const UserRoutes = router;
