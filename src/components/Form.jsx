import React, { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

const Form = ({ handleSubmit, handleChange, isFirstRender }) => {
  const divRef = useRef(null)
    
    useEffect(() => {
      !isFirstRender && divRef.current.focus()
    })
  return (
    <div className="form-container" ref={divRef} tabIndex={-1}>
      <form className="wrapper">
        <p className="p--regular">
          Customize the game by selecting an emoji category and a number of
          memory cards.
        </p>
        <Select handleChange={handleChange} />

        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
};

export default Form;
