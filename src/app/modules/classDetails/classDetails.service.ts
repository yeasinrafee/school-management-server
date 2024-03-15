import { TClassDetails } from "./classDetails.interface";
import { ClassDetails } from "./classDetails.model";

const createClassDetailsIntoDB = async (payload: TClassDetails) => {
  const result = await ClassDetails.create(payload);
  return result;
};

export const ClassDetailsServices = {
  createClassDetailsIntoDB,
};
