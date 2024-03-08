/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.css';
import Tree from './components/Tree';
import FilePicker from './components/FilePicker';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const url = window.location.host === 'localhost:3000' ? 'http://localhost:5000' : 'https://cloudchef-ajuv.onrender.com';
  const [nodes, setNodes] = useState<Object>({});
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFileRef, setSelectedFileRef] = useState<any>(null);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const response = await axios.get(`${url}/api/nodes/fetch`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.data && response?.data?.success) {
        setNodes(response?.data?.data);
      } else {
        toast(response?.data?.message, { type: 'error' });
      }
    } catch (error: any) {
      toast(error?.message ?? 'Unknown error, please try again.', { type: 'error' });
    }
  };

  const handleFileSelect = (file: any, fileRef: any) => {
    setSelectedFile(file);
    setSelectedFileRef(fileRef);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast('Please select a valid file of nodes.', { type: 'error' });
      return;
    }
    const formData = new FormData();
    formData.append('nodes', selectedFile);
    try {
      const response = await axios.post(`${url}/api/nodes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.data && response?.data?.success) {
        toast(response?.data?.message, { type: 'success' });
        fetchNodes();
        setSelectedFile(null);
        setSelectedFileRef(null);
        if (selectedFileRef) selectedFileRef.current.value = '';
      } else {
        toast(response?.data?.message, { type: 'error' });
      }
    } catch (error: any) {
      toast(error?.message ?? 'Unknown error, please try again.', { type: 'error' });
    }
  };

  return (
    <div className="main">
      <Tree data={nodes} />
      <div className="file">
        <FilePicker onFileSelect={handleFileSelect} />
        <button className="button" onClick={() => handleUpload()}>
          Upload File
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
