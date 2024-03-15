import { Schema, model } from "mongoose";
import { TClassDetails } from "./classDetails.interface";

const ClassDetailsSchema = new Schema<TClassDetails>({
  classNo: {
    type: String,
    enum: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    required: true,
  },
  sectionNo: {
    type: String,
    enum: ["A", "B", "C"],
    required: true,
  },
});

export const ClassDetails = model<TClassDetails>(
  "ClassDetail",
  ClassDetailsSchema
);
