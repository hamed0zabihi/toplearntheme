import React, { useEffect, useState } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useDispatch } from "react-redux";
import { UpdateCourse } from "../../actions/courses";
const EditCourseModal = ({ toggle, modal, course }) => {
  const [title, settitle] = useState();
  const [price, setprice] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [info, setinfo] = useState();
  const [courseid, setcourseid] = useState();
  const dispatch = useDispatch();
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
  };
  return (
    <div>
      <button onClick={toggle}>Show Dialog</button>{" "}
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
                onChange={(e) => settitle(e.target.value)}
              />

              <input
                type="text"
                name="price"
                style={{ marginBottom: 3 }}
                className="form-control"
                placeholder="قیمت دوره به تومان"
                aria-describedby="price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />

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
                onChange={(e) => setinfo(e.target.value)}
              />

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
