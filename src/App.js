import React, { useState } from 'react';
import { Button } from 'antd';
import './App.css';
import Detail from "./components/Detail";
import TasksView from './components/TasksView';
import { DndContext } from '@dnd-kit/core';

const App = () => {
  const [isVisible, setIsvisible] = useState(false);
  const openDetail = () => {
    setIsvisible(true)
  }
  return (
    <div className="App">
      <DndContext>
        <Button type="primary" onClick={openDetail}>Show Modal</Button>
        <Detail isVisible={isVisible} setIsvisible={setIsvisible} />
        <h2>Header test</h2>
        <TasksView />
      </DndContext>
    </div>
  )
};

export default App;
