import React, { useEffect, useRef, useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useDispatch } from "react-redux";
import { UpdateCourse } from "../../actions/courses";
import SimpleReactValidator from "simple-react-validator";
const EditCourseModal = ({ toggle, modal, course }) => {
  const [title, settitle] = useState();
  const [price, setprice] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [info, setinfo] = useState();
  const [courseid, setcourseid] = useState();
  const dispatch = useDispatch();
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "الزامی",
        regex: "حداقل هشت کاراکتر-حاوی حروف بزرگ کوچک و کاراکترهای خاص مانند @",
        email: "ایمیل صحیح نمیباشد",
        min: "حداقل مجاز",
        alpha_num_space: "فقط شامل حروف -عدد و فضای خالی",
        numeric: "باید عدد باشد",
        integer: "باید عدد باشد",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );
  useEffect(() => {
    setcourseid(course._id);
    settitle(course.title);
    setprice(course.price);
    setimageUrl(course.imageUrl);
    setinfo(course.info);

    return () => {
      setcourseid();
      settitle();
      setprice();
      setimageUrl();
      setinfo();
    };
  }, [course]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      let data = new FormData();
      data.append("_id", courseid);
      data.append("title", title);
      data.append("price", Number.parseInt(price));
      if (e.target.imageUrl.files[0]) {
        data.append("imageUrl", e.target.imageUrl.files[0]);
      } else {
        data.append("imageUrl", imageUrl);
      }
      data.append("info", info);
      //dispatch
      dispatch(UpdateCourse(courseid, data));
      toggle();
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                style={{ marginBottom: 3 }}
                className="form-control"
                placeholder="عنوان دوره"
                aria-describedby="title"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                  validator.current.showMessageFor("name");
                }}
              />
              {validator.current.message("title", title, "required|min:5")}
              <input
                type="text"
                name="price"
                style={{ marginBottom: 3 }}
                className="form-control"
                placeholder="قیمت دوره به تومان"
                aria-describedby="price"
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                  validator.current.showMessageFor("price");
                }}
              />
              {validator.current.message("price", price, "required|integer")}
              <input
                type="file"
                name="imageUrl"
                style={{ marginBottom: 3 }}
                className="form-control mb-2"
                aria-describedby="imageUrl"
              />
              <textarea
                name="info"
                placeholder="توضیحات دوره"
                className="form-control"
                style={{ marginBottom: 3 }}
                value={info}
                onChange={(e) => {
                  setinfo(e.target.value);
                  validator.current.showMessageFor("info");
                }}
              />
              {validator.current.message("info", info, "required|min:5")}
              <button
                type="submit"
                className="btn btn-success "
                style={{ margin: "1em" }}
              >
                ویرایش{" "}
              </button>
              <button
                className="btn btn-warning mr-5"
                style={{ margin: "1em" }}
                onClick={toggle}
              >
                انصراف
              </button>
            </form>
          </div>
        </DialogContent>{" "}
      </DialogOverlay>{" "}
    </div>
  );
};

export default EditCourseModal;
