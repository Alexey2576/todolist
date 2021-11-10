import {TasksType} from "../Tasks";

function Task(props: TasksType) {
    return (
        <div>
            <div>
                <input type="checkbox" checked={props.isChecked}/>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Task;