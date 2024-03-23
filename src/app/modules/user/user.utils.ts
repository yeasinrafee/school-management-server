import { TClassDetails } from "../classDetails/classDetails.interface";
// import { ClassDetails } from "../classDetails/classDetails.model";
// import { Student } from "../student/student.model";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// TODO: Have to do later
// const findLastStudentYear = async (id: string | undefined) => {
//   const lastStudentDetails = await Student.findOne(
//     { id: id },
//     { classDetails: 1, _id: 0 }
//   );
//   const lastStudentClassDetailsId = lastStudentDetails?.classDetails;
//   const lastStudentClassDetails = await ClassDetails.findById(
//     {
//       _id: lastStudentClassDetailsId,
//     },
//     { year: 1, _id: 0 }
//   );
//   const lastStudentYear = lastStudentClassDetails?.year;
//   console.log(lastStudentYear);
//   return lastStudentYear;
// };

export const generateStudentId = async (payload: TClassDetails) => {
  let currentId = (0).toString(); // 000 by default

  const lastStudentId = await findLastStudentId();
  // 01 A 24 001
  const lastStudentClassNo = lastStudentId?.substring(0, 2);
  const lastStudentYear = lastStudentId?.substring(3, 5);
  const currentClassNo = payload.classNo;
  const currentYear = payload.year.substring(2);

  //   TODO: have to check year later
  // const lastStudentYear = await findLastStudentYear(lastStudentId);
  // const currentYear = payload.year;
  // console.log(currentYear);

  if (
    lastStudentId &&
    lastStudentClassNo === currentClassNo &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(5);
  }
  let incrementedId = (Number(currentId) + 1).toString().padStart(3, "0");
  incrementedId = `${payload.classNo}${
    payload.sectionNo
  }${payload.year.substring(2)}${incrementedId}`;
  return incrementedId;
};
