import express from "express";
import { UserControllers } from "./user.controller";
import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherValidations } from "../teacher/teacher.validation";
import { AdminValidations } from "../admin/admin.validation";

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

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

export const UserRoutes = router;
