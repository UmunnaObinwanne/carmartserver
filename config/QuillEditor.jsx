import React from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const { onChange, property, record } = props;

  const handleChange = (value) => {
    onChange(property.name, value);
  };

  return (
    <Quill
      theme="snow"
      value={record.params[property.name]}
      onChange={handleChange}
    />
  );
};

export default QuillEditor;
