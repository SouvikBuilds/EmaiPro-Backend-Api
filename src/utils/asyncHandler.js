const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).error({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };
