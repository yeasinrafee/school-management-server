import mongoose from "mongoose";
import { TErrorSources } from "../interface/error";

const handleVAlidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleVAlidationError;
