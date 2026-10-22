
function sendList(res, result) {
  return res.status(200).json({
    ok: true,
    data: result.posts,
    pagination: result.pagination
  });
}

function sendCreated(res, payload) {
  return res.status(201).json({
    ok: true,
    data: payload
  });
}

function sendOk(res, payload) {
  return res.status(200).json({
    ok: true,
    data: payload
  });
}

function sendError(res, status, payload) {
  return res.status(status).json({
    ok: false,
    error: {
      code: payload.code || 'INTERNAL_ERROR',
      message: payload.message || 'An unexpected error occurred'
    }
  });
}

module.exports = {
  sendList,
  sendCreated,
  sendOk,
  sendError
};
