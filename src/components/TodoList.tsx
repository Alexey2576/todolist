import Tasks from "./Tasks/Tasks";

export type TasksType = {
    id: number
    text: string,
    isChecked: boolean
}
export type TodoListType = {
    titleTasks: string
    tasks: Array<TasksType>
    countTasks: number,
    removeTask: (id: number) => void
}

function TodoList(props: TodoListType) {
    return (
        <div>
            <Tasks countTasks={props.countTasks}
                   tasks={props.tasks}
                   titleTasks={props.titleTasks}
                   removeTask={props.removeTask}
            />
        </div>
    )
}

export default TodoList;

