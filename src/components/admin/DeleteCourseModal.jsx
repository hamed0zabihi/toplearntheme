import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DialogOverlay, DialogContent } from "@reach/dialog";
import { isEmpty } from "lodash";
import { DeleteCourseAction } from "../../actions/courses";
const DeleteCourseModal = ({ toggle, modal, id }) => {
  const allcourses = useSelector((state) => state.courses);
  const course = allcourses.filter((el) => el._id === id);

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(DeleteCourseAction(id));
    toggle();
  };
  console.log("course:", course);
  return (
    <div>
      <DialogOverlay
        style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
        isOpen={modal}
        onDismiss={toggle}
      >
        <DialogContent
          aria-label="Announcement"
          style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}
        >
          <div className="inner form-layer">
            <div class="alert alert-danger" role="alert">
              <i class="zmdi zmdi-alert-triangle"></i>
              هشدار!از پاک کردن دروه با مشخصات زیر مطمئن هستید!؟
            </div>
            {!isEmpty(course) ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">نام دوره</th>
                    <th scope="col">ای دی</th>
                    <th scope="col">مبلغ دوره</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{course[0].title}</td>
                    <td>{course[0]._id}</td>
                    <td>{course[0].price}</td>
                  </tr>
                </tbody>
              </table>
            ) : null}

            <button
              type="submit"
              className="btn btn-danger "
              style={{ margin: "1em" }}
              onClick={() => handleDelete(id)}
            >
              حذف دوره
            </button>
            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={toggle}
            >
              انصراف
            </button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </div>
  );
};

export default DeleteCourseModal;
