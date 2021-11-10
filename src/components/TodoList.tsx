import Tasks, {TasksType} from "./Tasks/Tasks";

export type TodoListType = {
    titleTasks: string
    tasks: Array<TasksType>
    countTasks: number
}

let todoList1: TodoListType = {
    titleTasks: "What buy?",
    tasks: [
        { text: "book", isChecked: true },
        { text: "car", isChecked: false },
        { text: "food", isChecked: true }
    ],
    countTasks: 3
}

let todoList2: TodoListType = {
    titleTasks: "What learn",
    tasks: [
        { text: "JS", isChecked: true },
        { text: "CSS", isChecked: false },
        { text: "HTML", isChecked: true }
    ],
    countTasks: 3
}

function TodoList() {
    return (
        <div>
            <Tasks countTasks={todoList1.countTasks} tasks={todoList1.tasks} titleTasks={todoList1.titleTasks}/>
            <Tasks countTasks={todoList2.countTasks} tasks={todoList2.tasks} titleTasks={todoList2.titleTasks}/>
        </div>
    )
}

export default TodoList;

