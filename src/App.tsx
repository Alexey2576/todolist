import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, text: "book", isChecked: true},
        {id: 2, text: "car", isChecked: false},
        {id: 3, text: "food", isChecked: true}
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    return (
        <div className="App">
            <TodoList titleTasks="Todo List"
                      tasks={tasks}
                      countTasks={3}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
