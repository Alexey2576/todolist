import {addTodoListAC, todoListsReducer} from "./TodoLists/todoListsReducer";
import {v1} from "uuid";
import {tasksReducer} from "./Tasks/tasksReducer";
import {startTasksState} from "./Tasks/tasksReducer.test";
import {startTodoListState} from "./TodoLists/todoListsReducer.test";

test('tests tasks and todoLists for adding new todoList should be corrected', () => {
   const action = addTodoListAC(v1(), "New TodoList")

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodoListsState = todoListsReducer(startTodoListState, action)

   const keys = Object.keys(endTasksState)
   expect(keys.length).toBe(3)
   expect(endTodoListsState[2]).toBeDefined()
   expect(endTodoListsState[2].title).toBe("New TodoList")
   expect(endTasksState[keys[2]].length).toBe(0)
   expect(keys[2]).toBe(endTodoListsState[2].todoList_ID)
})