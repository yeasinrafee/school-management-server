import express from "express";
import checkValidation from "../../middlewares/validateRequest";
import { AcademicSubjectValidation } from "./academicSubject.validation";
import { AcademicSubjectController } from "./academicSubject.controller";

const router = express.Router();

router.post(
  "/create-academic-subject",
  checkValidation(
    AcademicSubjectValidation.createAcademicSubjectValidationSchema
  ),
  AcademicSubjectController.createAcademicSubject
);

router.get("/", AcademicSubjectController.getAllAcademicSubjects);
router.get(
  "/:subjectId",
  AcademicSubjectController.getSingleAcademicSubjectFromDB
);
router.patch(
  "/:subjectId",
  checkValidation(
    AcademicSubjectValidation.updateAcademicSubjectValidationSchema
  ),
  AcademicSubjectController.updateAcademicSubject
);

export const AcademicSubjectRouter = router;
