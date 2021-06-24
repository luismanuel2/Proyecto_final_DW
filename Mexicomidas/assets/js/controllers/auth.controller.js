const AUTH_MESSAGES = require("../constants/messages/auth.messages");
const SERVICE_STATUS = require("../constants/status/serviceStatus");
const HTTP_STATUS = require("../constants/status/httpStatus");
const authService = require("../services/auth.service");

const login = async (req, res) => {
  let responseObj = {
    errorMsg: AUTH_MESSAGES.INVALID_CREDENTIALS,
  };
  let status = HTTP_STATUS.ERROR;
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(data);
    let responseFromService = await authService.login(data);
    if (responseFromService.status === SERVICE_STATUS.SUCCESSFUL) {
      status = HTTP_STATUS.OK;
      responseObj = {};
      responseObj.message = AUTH_MESSAGES.USER_AUTHENTICATED_SUCCESSFULLY;
      responseObj.user = responseFromService.data.user;
      responseObj.token = await responseFromService.data.token;
    }
  } catch (err) {
    console.log("Something went wrong: Controller: login user", err);
    return res.status(500).send({ errorMsg: "Internal server error" });
  }
  return res.status(status).send(responseObj);
};

const remove = async (req, res) => {
  let responseObj = {
    errorMsg: AUTH_MESSAGES.INVALID_CREDENTIALS,
  };
  let status = HTTP_STATUS.ERROR;
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(data);
    let responseFromService = await authService.remove(data);
    if (responseFromService.status === SERVICE_STATUS.SUCCESSFUL) {
      status = HTTP_STATUS.OK;
      responseObj = {};
      responseObj.message = AUTH_MESSAGES.USER_AUTHENTICATED_SUCCESSFULLY;
      responseObj.user = responseFromService.data.user;
      responseObj.token = await responseFromService.data.token;
    }
  } catch (err) {
    console.log("Something went wrong: Controller: login user", err);
    return res.status(500).send({ errorMsg: "Internal server error" });
  }
  return res.status(status).send(responseObj);
};

const update = async (req, res) => {
  let responseObj = {
    errorMsg: AUTH_MESSAGES.INVALID_CREDENTIALS,
  };
  let status = HTTP_STATUS.ERROR;
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
      password1: req.body.password1,
    };
    console.log(data);
    let responseFromService = await authService.update(data);
    if (responseFromService.status === SERVICE_STATUS.SUCCESSFUL) {
      status = HTTP_STATUS.OK;
      responseObj = {};
      responseObj.message = AUTH_MESSAGES.USER_AUTHENTICATED_SUCCESSFULLY;
      responseObj.user = responseFromService.data.user;
      responseObj.token = await responseFromService.data.token;
    }
  } catch (err) {
    console.log("Something went wrong: Controller: login user", err);
    return res.status(500).send({ errorMsg: "Internal server error" });
  }
  return res.status(status).send(responseObj);
};


const signUp = async (req, res) => {
  let responseObj = {
    errorMsg: AUTH_MESSAGES.USER_CREATED_UNSUCCESSFUL,
  };
  let status = HTTP_STATUS.ERROR;
  try {
    let data = {
      email: req.body.email,
      password: req.body.password
    };
    console.log(data)
    let responseFromService = await authService.signUp(data);
    if (responseFromService.status === SERVICE_STATUS.SUCCESSFUL) {
      status = HTTP_STATUS.OK;
      responseObj = {};
      responseObj.message = AUTH_MESSAGES.USER_CREATED_SUCCESSFULLY;
      responseObj.email = responseFromService.data.email;
    }
  } catch (err) {
    console.log("Something went wrong: Controller: login user", err);
    return res.status(500).send({ errorMsg: "Internal server error" });
  }
  return res.status(status).send(responseObj);
};

const getCurrentUser = async (req, res) => {
  let responseObj = {
    errorMsg: AUTH_MESSAGES.INVALID_CREDENTIALS,
  };
  let status = HTTP_STATUS.ERROR;
  try {
    let data = {
      email: req.body.email
    };
    let responseFromService = await authService.getCurrentUser(data);
    if (responseFromService.status === SERVICE_STATUS.SUCCESSFUL) {
      status = HTTP_STATUS.OK;
      responseObj = {};
      responseObj.user = responseFromService.data.user;
    }
  } catch (err) {
    console.log("Something went wrong: Controller: get current user", err);
    return res.status(500).send({ errorMsg: "Internal server error" });
  }
  return res.status(status).send(responseObj);
};

module.exports = {
  login,
  remove,
  update,
  signUp,
  getCurrentUser,
};
