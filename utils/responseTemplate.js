export const responseSuccess = (res, statusCode, message, data = []) => {
  return res.status(statusCode).json({
    status: true,
    message,
    data,
  });
};

export const responseSuccessWithToken = (
  res,
  statusCode,
  message,
  accessToken,
  refreshToken,
  data = []
) => {
  return res.status(statusCode).json({
    status: true,
    message,
    accessToken,
    refreshToken,
    data,
  });
};

export const responseBadRequest = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: false,
    message,
  });
};
