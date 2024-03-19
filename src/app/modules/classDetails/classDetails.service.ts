import { TClassDetails } from "./classDetails.interface";
import { ClassDetails } from "./classDetails.model";

const createClassDetailsIntoDB = async (payload: TClassDetails) => {
  const result = await ClassDetails.create(payload);
  return result;
};

const getAllClassDetailsFromDB = async () => {
  const result = await ClassDetails.find();
  return result;
};

const getSingleStudentFromDB = async (_id: string) => {
  const result = await ClassDetails.findOne({ _id });
  return result;
};

export const ClassDetailsServices = {
  createClassDetailsIntoDB,
  getAllClassDetailsFromDB,
  getSingleStudentFromDB,
};
