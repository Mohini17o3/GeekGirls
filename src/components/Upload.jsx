import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Upload({ onImageUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      onImageUpload(reader.result);
    };

    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps({ className: 'border-dashed border-2 border-gray-400 p-4' })}>
      <input {...getInputProps()} />
      <p>Drag and drop image or click to select a file</p>
    </div>
  );
}

export default Upload;
