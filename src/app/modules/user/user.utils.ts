import { TClassDetails } from "../classDetails/classDetails.interface";
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

  return lastStudent?.id ? lastStudent.id.substring(3) : undefined;
};

export const generateStudentId = async (payload: TClassDetails) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementedId = (Number(currentId) + 1).toString().padStart(3, "0");
  incrementedId = `${payload.classNo}${payload.sectionNo}${incrementedId}`;
  return incrementedId;
};
