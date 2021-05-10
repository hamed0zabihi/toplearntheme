import { getCourses, NewCourse } from "../services/getCources";
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
