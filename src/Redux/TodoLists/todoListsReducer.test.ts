import {TodoListsStateType} from "../../API/todoLists-api";
import {
   addTodoListAC,
   changeFilterCheckedTodoListAC,
   changeFilterPriorityTodoListAC,
   changeTitleTodoListAC,
   removeTodoListAC,
   setValueSelectAC
} from "./todoListsActions";
import {todoListsReducer} from "./todoListsReducer";
import {FilterPriorityTask, FilterStatusTask} from "../../API/tasks-api";

export let startTodoListState: TodoListsStateType[]

beforeEach(() => {
   startTodoListState = [
      {
         id: "todolistId1",
         title: "New todo",
         addedDate: "2022-02-03T18:05:06.07",
         order: -4,
         filterStatus: FilterStatusTask.New,
         selectPriorityValue: null,
         filterPriority: FilterPriorityTask.All
      },
      {
         id: "todolistId2",
         title: "React >>>>>>>",
         addedDate: "2022-02-03T17:04:22.687",
         order: -3,
         filterStatus: FilterStatusTask.New,
         selectPriorityValue: null,
         filterPriority: FilterPriorityTask.All
      },
   ]
})

test('correct todoList should be deleted from correct array', () => {
   const action = removeTodoListAC("todolistId1");
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState).toEqual([
      {
         id: "todolistId2",
         title: "React >>>>>>>",
         addedDate: "2022-02-03T17:04:22.687",
         order: -3,
         filterStatus: FilterStatusTask.New,
         selectPriorityValue: null,
         filterPriority: FilterPriorityTask.All
      },
   ]);
   expect(endState[0].title).toBe("React >>>>>>>")
});
test('correct todoList should be added to array todoLists', () => {
   const action = addTodoListAC("todoListId3", "New TodoList");
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState.length).toBe(3)
   expect(endState[2].id).toBe("todoListId3")
   expect(endState[2].title).toBe("New TodoList")
   expect(endState[2].selectPriorityValue).toBe(null)
   expect(endState[2].filterStatus).toBe(FilterStatusTask.All)
   expect(endState[2].filterPriority).toBe(FilterPriorityTask.All)

});
test('title should be changed to array todoLists', () => {
   const action = changeTitleTodoListAC("todolistId1", "What to do?")
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[1].title).toBe("What to buy?")
   expect(endState[0].title).toBe("What to do?")
})
test('filter checked should be changed to array todoLists', () => {
   const action = changeFilterCheckedTodoListAC("todolistId1", FilterStatusTask.Completed)
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[1].filterStatus).toBe(FilterStatusTask.All)
   expect(endState[0].filterStatus).toBe(FilterStatusTask.Completed)
})
test('filter priority should be changed to array todoLists', () => {
   const action = changeFilterPriorityTodoListAC("todolistId2", FilterPriorityTask.Middle)
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[0].filterPriority).toBe(FilterPriorityTask.All)
   expect(endState[1].filterPriority).toBe(FilterPriorityTask.Middle)
})
test('select value should be changed to array todoLists', () => {
   const action = setValueSelectAC("todolistId1", FilterPriorityTask.Middle)
   const endState = todoListsReducer(startTodoListState, action)
   expect(endState[0].selectPriorityValue).toBe(FilterPriorityTask.Middle)
   expect(endState[1].selectPriorityValue).toBe(null)
})
