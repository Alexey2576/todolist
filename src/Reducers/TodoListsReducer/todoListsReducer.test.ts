import {
   addTodoListAC, changeFilterCheckedTodoListAC, changeFilterPriorityTodoListAC, changeTitleTodoListAC, removeTodoListAC, setValueSelectAC, todoListsReducer, TodoListsStateType} from "./todoListsReducer";

export let startTodoListState: TodoListsStateType[]

beforeEach(() => {
   startTodoListState = [
      {todoList_ID: "todolistId1", title: "What to learn?", filterPriority: "All", filterChecked: "All", selectValue: null},
      {todoList_ID: "todolistId2", title: "What to buy?", filterPriority: "All", filterChecked: "All", selectValue: null},
   ]
})

test('correct todoList should be deleted from correct array', () => {
   const action = removeTodoListAC("todolistId1");
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState).toEqual([
      {todoList_ID: "todolistId2", title: "What to buy?", filterPriority: "All", filterChecked: "All", selectValue: null},
   ]);
   expect(endState[0].title).toBe("What to buy?")
});
test('correct todoList should be added to array todoLists', () => {
   const action = addTodoListAC("todoListId3", "New TodoList");
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState.length).toBe(3)
   expect(endState[2].todoList_ID).toBe("todoListId3")
   expect(endState[2].title).toBe("New TodoList")
   expect(endState[2].selectValue).toBe(null)
   expect(endState[2].filterChecked).toBe("All")
   expect(endState[2].filterPriority).toBe("All")

});
test('title should be changed to array todoLists', () => {
   const action = changeTitleTodoListAC("todolistId1", "What to do?")
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[1].title).toBe("What to buy?")
   expect(endState[0].title).toBe("What to do?")
})
test('filter checked should be changed to array todoLists', () => {
   const action = changeFilterCheckedTodoListAC("todolistId1", "Completed")
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[1].filterChecked).toBe("All")
   expect(endState[0].filterChecked).toBe("Completed")
})
test('filter priority should be changed to array todoLists', () => {
   const action = changeFilterPriorityTodoListAC("todolistId2", "Middle")
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[0].filterPriority).toBe("All")
   expect(endState[1].filterPriority).toBe("Middle")
})
test('select value should be changed to array todoLists', () => {
   const action = setValueSelectAC("todolistId1", "Middle")
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[0].selectValue).toBe("Middle")
   expect(endState[1].selectValue).toBe(null)
})
