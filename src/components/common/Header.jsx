import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [searchedWord, setsearchedWord] = useState("");
  console.log("searchedWord", searchedWord);
  return (
    <React.Fragment>
      <header>
        <a href="/#" className="logo">
          <img src="images/logo.png" att="logo" />
        </a>
        <h1> با اساتید مجرب و کارآزموده در خودآموز تاپ لرن </h1>
        <h2> آموزش ببینید ، تجربه کسب کنید و بازار کار شوید </h2>
        <h3> با کمترین هزینه خودت یاد بگیر </h3>
      </header>
      <div className="search-form">
        <form>
          <input
            type="text"
            name="searchedWord"
            placeholder="چی دوست داری یاد بگیری ؟"
            onChange={(e) => setsearchedWord(e.target.value)}
          />

          <NavLink
            activeStyle={{ color: "lime" }}
            to={`/search/${searchedWord}`}
          >
            <button>
              <i className="zmdi zmdi-search"></i>
            </button>
          </NavLink>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Header;
