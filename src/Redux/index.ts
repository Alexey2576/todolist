import {asyncActions as asyncAppActions, slice as appSlice} from './App/appReducer'
import {asyncActions as asyncTasksActions, slice as taskSlice} from './Tasks/tasksReducer'
import {asyncActions as asyncTodoListsActions, slice as todoListsSlice} from './TodoLists/todoListsReducer'

const appActions = {
   ...asyncAppActions,
   ...appSlice.actions,
}

const tasksActions = {
   ...asyncTasksActions,
   ...taskSlice.actions,
}

const todoListsActions = {
   ...asyncTodoListsActions,
   ...todoListsSlice.actions,
}

export {
   appActions,
   tasksActions,
   todoListsActions,
}
