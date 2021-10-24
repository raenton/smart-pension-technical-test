import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './app';
import FileUploader from '../../components/FileUploader';
import LogReport from '../../components/LogReport';
import Select from '../../components/Select';

function WeblogInspector(props) {
  const { logReport, error } = useSelector(state => state.weblog);
  const [selectedFile, setSelectedFile] = useState(null);
  const [unique, setUnique] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const dispatch = useDispatch();

  const submitWeblog = (e) => {
    const formData = new FormData();
    formData.append('log', selectedFile);
    
    dispatch(actions.submitWeblog({formData, unique, sortOrder}));
  };

  const logReportLoaded = logReport.pages && logReport.pages.length > 0;
  return (
    <>
      <form onSubmit={submitWeblog}>
        <FileUploader onFileSelect={(file) => setSelectedFile(file)} />
        <label>
          Unique visits?
          <Select value={unique} onChange={(e) => setUnique(e.target.value)}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </label>
        <label>
          Sort order
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
          </Select>
        </label>
        <button type="button" onClick={submitWeblog}>Submit</button>
      </form>

      {error.length > 0 && (
        <p className="error">{error}</p>)
      }

      { logReportLoaded && (
        <LogReport pages={logReport.pages} />)
      }
    </>
  );
}

export default WeblogInspector;