import React from "react";

const SimpleInput = ({ ...props }) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};

export default SimpleInput;
