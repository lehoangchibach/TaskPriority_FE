import React from 'react';
import './App.css';
import TasksView from './components/TasksView';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import useToken from './components/useToken';

const App = () => {
  const { token, setToken } = useToken()
  if (!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TasksView token={token} />} />
      </Routes>
    </div>
  )
};

export default App;
