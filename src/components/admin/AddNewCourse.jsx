import React, { useState, useRef } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useDispatch } from "react-redux";
import { CreateNewCourse } from "../../actions/courses";
import SimpleReactValidator from "simple-react-validator";

const AddNewCourse = ({ toggle, modal }) => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [info, setInfo] = useState();
  const [imgaeUrl, setimgaeUrl] = useState();
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
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (validator.current.allValid()) {
        let data = new FormData();
        data.append("title", title);
        data.append("price", Number.parseInt(price)); //string to number
        data.append("imageUrl", e.target.imageUrl.files[0]);
        data.append("info", info);
        console.log("data", ...data);
        //dispatch
        dispatch(CreateNewCourse(data));
        toggle();
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (error) {
      console.log(error);
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
                  setTitle(e.target.value);
                  validator.current.showMessageFor("title");
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
                  setPrice(e.target.value);
                  validator.current.showMessageFor("price");
                }}
              />
              {validator.current.message("price", price, "required|numeric")}
              <input
                type="file"
                name="imageUrl"
                style={{ marginBottom: 3 }}
                className="form-control mb-2"
                aria-describedby="imageUrl"
                onChange={(e) => {
                  setimgaeUrl(true);
                  validator.current.showMessageFor("imageUrl");
                }}
              />
              {validator.current.message("imageUrl", imgaeUrl, "required")}
              <textarea
                name="info"
                placeholder="توضیحات دوره"
                className="form-control"
                style={{ marginBottom: 3 }}
                value={info}
                onChange={(e) => {
                  setInfo(e.target.value);
                  validator.current.showMessageFor("info");
                }}
              />
              {validator.current.message("info", info, "required|min:5")}
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
