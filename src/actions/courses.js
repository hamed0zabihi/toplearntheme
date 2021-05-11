import {
  getCourses,
  NewCourse,
  sendCourseForUpdate,
} from "../services/getCources";
import { SuccessMessage } from "../components/common/ToastMassage";

export const getAllCourses = () => {
  return async (dispatch) => {
    const { data } = await getCourses();
    await dispatch({ type: "INIT", payload: data.courses });
  };
};

export const CreateNewCourse = (course) => {
  return async (dispatch, getState) => {
    const { data, status } = await NewCourse(course);
    if (status === 201) SuccessMessage(" با موفقیت دردیتابیس ساخته شد");
    console.log(data);
    await dispatch({
      type: "CREATE_COURSE",
      payload: [...getState().courses, data.course],
    });
  };
};

export const UpdateCourse = (id, updatedcourse) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const updatedCourses = [...courses];
    const findIndexCourseUpdated = updatedCourses.findIndex(
      (el) => el._id === id
    );
    let corse = updatedCourses[findIndexCourseUpdated];
    corse = { ...Object.fromEntries(updatedcourse) };
    console.log(corse);
    updatedCourses[findIndexCourseUpdated] = corse;
    try {
      await dispatch({ type: "UPDATE_COURSE", payload: [...updatedCourses] });
      const { data, status } = await sendCourseForUpdate(id, updatedcourse);
      if (status === 200) {
        console.log(data);
        SuccessMessage("با موفقیت در پایگاه داده آپدیت شد");
      }
    } catch (ex) {
      await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });

      console.log(ex);
    }
  };
};
