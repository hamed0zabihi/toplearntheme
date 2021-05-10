import React, { useState } from "react";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { useDispatch } from "react-redux";
import { CreateNewCourse } from "../../actions/courses";
const AddNewCourse = ({ toggle, modal }) => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let data = new FormData();
      data.append("title", title);
      data.append("price", Number.parseInt(price)); //string to number
      data.append("imageUrl", e.target.imageUrl.files[0]);
      data.append("info", info);

      console.log("data", ...data);
      //dispatch
      dispatch(CreateNewCourse(data));
    } catch (error) {
      console.log(error);
    }
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
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                name="price"
                style={{ marginBottom: 3 }}
                className="form-control"
                placeholder="قیمت دوره به تومان"
                aria-describedby="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setInfo(e.target.value)}
              />

              <button
                type="submit"
                className="btn btn-success "
                style={{ margin: "1em" }}
              >
                ثبت دوره
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

export default AddNewCourse;
