import React, { ChangeEvent } from 'react';

interface FilePickerProps {
  onFileSelect: (file: File) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div>
      <input accept="application/JSON" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FilePicker;
