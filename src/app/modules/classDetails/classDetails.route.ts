import { Router } from "express";
import { ClassDetailsController } from "./classDetails.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ClassDetailsValidations } from "./classDetails.validation";

const router = Router();

router.post(
  "/create-class-details",
  validateRequest(ClassDetailsValidations.createClassDetailsValidationSchema),
  ClassDetailsController.createClassDetails
);

export const ClassDetailRoutes = router;
