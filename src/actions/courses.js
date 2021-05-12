import {
  getCourses,
  NewCourse,
  sendCourseForUpdate,
  DeleteCourse,
} from "../services/getCources";
import {
  SuccessMessage,
  ErrorMessage,
} from "../components/common/ToastMassage";

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
    const filteredCoursess = updatedCourses.filter((el) => el._id !== id);

    // const findIndexCourseUpdated = updatedCourses.findIndex(
    //   (el) => el._id === id
    // );
    // let corse = updatedCourses[findIndexCourseUpdated];
    // corse = { ...Object.fromEntries(updatedcourse) };
    // console.log(corse);
    // updatedCourses[findIndexCourseUpdated] = corse;
    try {
      // await dispatch({ type: "UPDATE_COURSE", payload: [...updatedCourses] });
      const { data, status } = await sendCourseForUpdate(id, updatedcourse);
      if (status === 200) {
        console.log("dataCourses", data.course);
        await dispatch({
          type: "UPDATE_COURSE",
          payload: [...filteredCoursess, data.course],
        });
        SuccessMessage("با موفقیت در پایگاه داده آپدیت شد");
      }
    } catch (ex) {
      ErrorMessage("عملیات بروز رسانی ناموفق میباشد.");
      console.log(ex);
    }
  };
};

export const DeleteCourseAction = (id) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const filteredCourses = courses.filter((el) => el._id !== id);
    try {
      await dispatch({ type: "DELETE_COURSE", payload: [...filteredCourses] });
      const { status } = await DeleteCourse(id);
      if (status === 200) {
        SuccessMessage("با موفقیت از پایگاه داده حذف شد");
      }
    } catch (exp) {
      await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
      ErrorMessage("عملیات انجام نشد");
      console.log(exp);
    }
  };
};
