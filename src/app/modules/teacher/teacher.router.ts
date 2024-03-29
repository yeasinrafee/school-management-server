import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";
import { TeacherValidations } from "./teacher.validation";

const router = express.Router();

router.get("/", TeacherControllers.getAllTeachers);
router.get("/:id", TeacherControllers.getSingleTeacher);
router.patch(
  "/:id",
  validateRequest(TeacherValidations.updateTeacherValidationSchema),
  TeacherControllers.updateTeacher
);
router.delete("/:id", TeacherControllers.deleteTeacher);

export const TeacherRoutes = router;
