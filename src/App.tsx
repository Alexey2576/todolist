import React, {MouseEvent, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type TaskType = {
   id: string
   text: string
   isChecked: boolean
}
export type FilterType = 'all' | 'active' | 'done'

export const removeTask = (id: string, tasks: TaskType[]): TaskType[] => tasks.filter(t => t.id !== id)
export const filerTasks = (filter: FilterType, tasks: TaskType[]): TaskType[] => {
   switch (filter) {
      case "active": return tasks.filter(t => !t.isChecked);
      case "done": return tasks.filter(t => t.isChecked);
      default: return tasks;
   }
}
export const addTasks = (value: string, tasks: TaskType[]): TaskType[] => [...tasks, {id: v1(), text: value, isChecked: false}]

const App = () => {
   const [tasks, setTasks] = useState<TaskType[]>([
      {id: v1(), text: "book", isChecked: true},
      {id: v1(), text: "car", isChecked: false},
      {id: v1(), text: "food", isChecked: true}
   ])
   const [filter, setFilter] = useState<FilterType>("all")

   const addTasksCallback = (value: string) => setTasks(addTasks(value, tasks))
   const filteredTasks = filerTasks(filter, tasks)
   const removeTaskCallback = (e: MouseEvent<HTMLButtonElement>) => {setTasks(removeTask(e.currentTarget.id, tasks))}

   return (
      <div className="App">
         <TodoList titleTasks="Todo List"
                   tasks={filteredTasks}
                   setFilter={setFilter}
                   addTasksCallback={addTasksCallback}
                   removeTaskCallback={removeTaskCallback}
         />
      </div>
   );
}

export default App;
