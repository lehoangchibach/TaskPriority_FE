import React from 'react';
import './App.css';
import TasksView from './components/TasksView';
import Login from './components/Login';
import useToken from './components/useToken';

const App = () => {
  const { token, setToken } = useToken()
  if (!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className="App">
      <TasksView token={token} />
    </div>
  )
};

export default App;
