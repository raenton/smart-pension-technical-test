import React from 'react';

export default function FileUploader({ onFileSelect }) {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0])
  };

  return (
    <div className="file-uploader">
        <input type="file" onChange={handleFileInput} />
    </div>
  );
};
