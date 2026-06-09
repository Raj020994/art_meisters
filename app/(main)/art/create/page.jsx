import React from "react";

const page = () => {
  let isEdit = true;
  if (isEdit) {
    return <div>Edit</div>;
  }
  return <div>Create</div>;
};

export default page;
