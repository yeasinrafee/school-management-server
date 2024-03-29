import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.router";
import { ClassDetailRoutes } from "../modules/classDetails/classDetails.route";
import { AcademicSubjectRouter } from "../modules/academicSubject/academicSubject.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/class-details",
    route: ClassDetailRoutes,
  },
  {
    path: "/academic-subjects",
    route: AcademicSubjectRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
