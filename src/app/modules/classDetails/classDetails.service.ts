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

const getSingleClassDetailsFromDB = async (_id: string) => {
  const result = await ClassDetails.findOne({ _id });
  return result;
};

const updateClassDetailsFromDB = async (
  _id: string,
  payload: Partial<TClassDetails>
) => {
  const result = await ClassDetails.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const ClassDetailsServices = {
  createClassDetailsIntoDB,
  getAllClassDetailsFromDB,
  getSingleClassDetailsFromDB,
  updateClassDetailsFromDB,
};
