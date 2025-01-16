const response = (res, status, message = null, data = null, error = null) => {
  let response = {
    status: status,
  };

  if (message) {
    response.message = message;
  }
  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  res.status(status).json(response);
};

module.exports = response;
