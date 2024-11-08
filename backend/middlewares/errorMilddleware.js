import multer from "multer";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: err.message || "File upload error" });
  }
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "An unexpected error occured" });
};

export default errorMiddleware;
