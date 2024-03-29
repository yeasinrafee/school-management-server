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
  year: {
    type: String,
    required: true,
  },
});

ClassDetailsSchema.pre("save", async function (next) {
  const isClassExists = await ClassDetails.findOne({
    sectionNo: this.sectionNo,
    classNo: this.classNo,
    year: this.year,
  });
  if (isClassExists) {
    throw new Error("Class is already exists!");
  }
  next();
});

export const ClassDetails = model<TClassDetails>(
  "ClassDetail",
  ClassDetailsSchema
);
