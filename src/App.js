import React from 'react';
import './App.css';
import TasksView from './components/TasksView';
import { DndContext } from '@dnd-kit/core';

const App = () => {
  return (
    <div className="App">
      <DndContext>
        <h2>Header test</h2>
        <TasksView />
      </DndContext>
    </div>
  )
};

export default App;
