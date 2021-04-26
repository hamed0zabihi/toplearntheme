import { getCourse } from "../services/getCources";

export const getSingleCourse = (id) => {
  return async (dispatch) => {
    const { data } = await getCourse(id);
    await dispatch({ type: "GET_COURSE", payload: data });
  };
};
