import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Styled from './style';
import { func } from 'prop-types';

interface FileUploadProps {
  setFiles: (files: File[]) => void;
  files: File[];
}

const FileUpload: React.FC<FileUploadProps> = ({ setFiles, files }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log('🚀 ~ file: index.tsx:6 ~ onDrop ~ acceptedFiles:', files, acceptedFiles);
      setFiles([...files, ...acceptedFiles]);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Styled>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>
    </Styled>
  );
};

export default FileUpload;
