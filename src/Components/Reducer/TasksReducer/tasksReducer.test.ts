import { addTaskAC, changeTaskTitleAC, removeTaskAC, setCheckedTaskAC, tasksReducer, TasksStateType} from "./tasksReducer";
import {addTodoListAC, removeTodoListAC} from "../todoListReducer";

let startState: TasksStateType

beforeEach(() => {
   startState = {
      "todolistId1": [
         {task_ID: "1", task_title: "React", task_priority: "Middle", checked: false},
         {task_ID: "2", task_title: "HTML", task_priority: "All", checked: true},
         {task_ID: "3", task_title: "CSS", task_priority: "Low", checked: false},
      ],
      "todolistId2": [
         {task_ID: "1", task_title: "Bread", task_priority: "All", checked: false},
         {task_ID: "2", task_title: "Milk", task_priority: "Low", checked: true},
         {task_ID: "3", task_title: "Beer", task_priority: "Middle", checked: true},
      ]
   }
})

test('correct task should be deleted from correct array', () => {
   const action = removeTaskAC("todolistId2", "2");
   const endState = tasksReducer(startState, action)
   expect(endState).toEqual({
      "todolistId1": [
         {task_ID: "1", task_title: "React", task_priority: "Middle", checked: false},
         {task_ID: "2", task_title: "HTML", task_priority: "All", checked: true},
         {task_ID: "3", task_title: "CSS", task_priority: "Low", checked: false},
      ],
      "todolistId2": [
         {task_ID: "1", task_title: "Bread", task_priority: "All", checked: false},
         {task_ID: "3", task_title: "Beer", task_priority: "Middle", checked: true},
      ]
   });
});
test('correct task should be added to array', () => {
   const action = addTaskAC("Redux", "todolistId2", "Middle");
   const endState = tasksReducer(startState, action)
   expect(endState["todolistId2"].length).toBe(4)
   expect(endState["todolistId2"][3]).toBeDefined()
   expect(endState["todolistId2"][3].task_title).toBe("Redux")
   expect(endState["todolistId2"][3].task_priority).toBe("Middle")
});
test('status of specified task should be changed', () => {
   const action = setCheckedTaskAC("todolistId1", "3", true)
   const endState = tasksReducer(startState, action)
   expect(endState["todolistId1"][1].checked).toBe(true)
   expect(endState["todolistId1"][2].checked).toBe(true)
   expect(endState["todolistId2"][2].checked).toBe(true)
})
test('title of specified task should be changed', () => {
   const action = changeTaskTitleAC("todolistId1", "2", "Redux")
   const endState = tasksReducer(startState, action)
   expect(endState["todolistId1"].length).toBe(3)
   expect(endState["todolistId1"][0].task_title).toBe("React")
   expect(endState["todolistId1"][1].task_title).toBe("Redux")
   expect(endState["todolistId2"][1].task_title).toBe("Milk")
})
test('new array should be added when new todolist is added', () => {
   const action = addTodoListAC("todolistId3")
   const endState = tasksReducer(startState, action)
   const keys = Object.keys(endState)
   expect(keys.length).toBe(3 )
   expect(endState["todolistId3"]).toBeDefined()
   expect(endState["todolistId3"].length).toBe(0)
})
test('todoList should be deleted when todolist is clicked', () => {
   const action = removeTodoListAC("todolistId1")
   const endState = tasksReducer(startState, action)
   const keys = Object.keys(endState)
   expect(keys.length).toBe(1 )
   expect(endState["todolistId1"]).not.toBeDefined()
   expect(endState["todolistId2"].length).toBe(3)
})