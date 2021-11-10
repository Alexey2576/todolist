import Task from "./Task/Task";
import {TodoListType} from "../TodoList";

export type TasksType = {
    text: string,
    isChecked: boolean
}

function Tasks(props: TodoListType) {
    return (
        <div>
            <span>{props.titleTasks}</span>

            <input type="text"/>
            <span> + </span>
            <span> - </span>
            {
                props.tasks.map(t => {
                        return <Task isChecked={t.isChecked} text={t.text}/>
                    }
                )
            }
        </div>
    )
}

export default Tasks;