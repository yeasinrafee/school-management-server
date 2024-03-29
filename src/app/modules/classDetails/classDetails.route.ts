import { Router } from "express";
import { ClassDetailsController } from "./classDetails.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ClassDetailsValidations } from "./classDetails.validation";

const router = Router();

router.post(
  "/create-class-details",
  // validateRequest(ClassDetailsValidations.createClassDetailsValidationSchema),
  ClassDetailsController.createClassDetails
);
router.get("/", ClassDetailsController.getAllClassDetails);
router.get("/:classId", ClassDetailsController.getSingleClassDetails);
router.patch(
  "/:classId",
  validateRequest(ClassDetailsValidations.updateClassDetailsValidationSchema),
  ClassDetailsController.updateClassDetails
);

export const ClassDetailRoutes = router;
