import React, { useRef, ChangeEvent } from 'react';

interface FilePickerProps {
  onFileSelect: (file: File, fileRef: React.RefObject<HTMLInputElement>) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFileSelect }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0], fileRef);
    }
  };

  return (
    <div>
      <input ref={fileRef} accept="application/JSON" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FilePicker;
