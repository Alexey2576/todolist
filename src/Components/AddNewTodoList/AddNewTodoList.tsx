import React, {ChangeEvent} from 'react';
import s from "../../App.module.css";
import MyButton from "../MyComponents/MyButton/MyButton";

export type AddNewTodoListType = {
   value: string
   addTodoListCallback: () => void
   changeTextNewTodoListCallback: (value: string) => void
}

export const AddNewTodoList: React.FC<AddNewTodoListType> = (
   {
      value,
      addTodoListCallback,
      changeTextNewTodoListCallback
   }
) => {

   const addTodoListHandler = () => addTodoListCallback()
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTextNewTodoListCallback(e.currentTarget.value)
   return (
      <div className={s.add_todoList}>
         <input type="text"
                value={value}
                onChange={onChangeHandler}/>
         <MyButton onClick={addTodoListHandler}
                   className={s.add_todoList_button}>Add</MyButton>
      </div>
   );
};

