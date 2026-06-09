import React from "react";

const page = () => {
  let isEdit = false;
  if (isEdit) {
    return <div>Edit</div>;
  }
  return <div>Create</div>;
};

export default page;
