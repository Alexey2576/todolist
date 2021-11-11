import {TodoListType} from "../TodoList";

function Tasks(props: TodoListType) {
    return (
        <div>
            <h3>{props.titleTasks}</h3>
            <input type="text"/>
            <button>Add</button>
            <button>Remove</button>
            {props.tasks.map(t => {
                return (
                    <div>
                        <span>{t.text}</span>
                        <button onClick={() => { props.removeTask(t.id)}}>Remove</button>
                    </div>)
            })}
            <div>
                <button onClick={() => {  }}>All</button>
                <button>Active</button>
                <button>Reading</button>
            </div>
        </div>
    )
}

export default Tasks;