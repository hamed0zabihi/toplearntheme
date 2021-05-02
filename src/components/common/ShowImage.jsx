import React, { useState } from "react";
import { Img } from "react-image";
import ReactLoading from "react-loading";
const ShowImage = ({ image }) => {
  console.log(image);
  return (
    <Img
      src={[`${image}`, "https://via.placeholder.com/150"]}
      loader={<ReactLoading type="balls" delay={1000} color="#2aaf27" />}
    />
  );
};

export default ShowImage;
