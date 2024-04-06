import * as types from "./types";
import axios from "axios";

//login user
export const NurseLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_NURSE_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/nurses/login",
      data
    );
    dispatch({
      type: types.LOGIN_NURSE_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_NURSE_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//login user
export const DoctorLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_DOCTOR_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/doctors/login",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_DOCTOR_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_DOCTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//login user
export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/admin/login",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// REGISTER DOCTOR
export const DoctorRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_DOCTOR_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/doctors/register",
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.REGISTER_DOCTOR_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_DOCTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// REGISTER NURSE
export const NurseRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_NURSE_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/nurses/register",
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.REGISTER_NURSE_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_NURSE_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// REGISTER ADMIN
export const AdminRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_ADMIN_REQUEST });
    const res = await axios.post(
      "/admin/register",
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.REGISTER_ADMIN_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// REGISTER AMBULANCE
export const AmbulanceRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_AMBULANCE_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/ambulances/add",
      data
    );
    console.log(res);
    // dispatch({
    //   type: types.REGISTER_AMBULANCE_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_AMBULANCE_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// logout user
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

//update nurse
export const UpdateNurse = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_NURSE_REQUEST });
    const res = await axios.patch(
      `http://localhost:7000/nurses/${id}`,
      data
    );
    console.log(res);
    dispatch({ type: types.EDIT_NURSE_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

//update doctor
export const UpdateDoctor = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DOCTOR_REQUEST });
    const res = await axios.patch(
      `http://localhost:7000/doctors/${id}`,
      data
    );
    console.log(res);
    dispatch({ type: types.EDIT_DOCTOR_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

//update doctor
export const SendPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DOCTOR_REQUEST });
    const res = await axios.post(
      `http://localhost:7000/admin/password`,
      data
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//update doctor
export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.FORGET_PASSWORD_REQUEST });
    const res = await axios.post(
      `http://localhost:7000/admin/forgot`,
      data
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Login Patient
export const PatientLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_PATIENT_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/patients/login",
      data
    );
    dispatch({
      type: types.LOGIN_PATIENT_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// Register Patient
export const PatientRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_PATIENT_REQUEST });
    const res = await axios.post(
      "http://localhost:7000/patients/register",
      data
    );
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// Update Patient
export const UpdatePatient = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PATIENT_REQUEST });
    const res = await axios.patch(
      `http://localhost:7000/patients/${id}`,
      data
    );
    dispatch({ type: types.EDIT_PATIENT_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

