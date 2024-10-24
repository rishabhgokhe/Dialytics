export function handleRes(res, status, success, message, ...props) {
    const responseBody = {
      success: success ?? false,
      message: message ?? "Unknown error occurred",
      ...props
    };
  
    return res.status(status).json(responseBody);
  }