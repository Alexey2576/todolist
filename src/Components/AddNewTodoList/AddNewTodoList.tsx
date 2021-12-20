import React from 'react';
import s from "../../App.module.css";
import MyInputText from "../MyComponents/MyInput/MyInputText";
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
   const changeTextNewTodoListHandler = () => changeTextNewTodoListCallback(value)

   return (
      <div className={s.add_todoList}>
         <MyInputText value={value}
                      onChangeText={changeTextNewTodoListHandler}
                      onEnter={addTodoListHandler}
                      className={s.add_todoList_input}/>
         <MyButton onClick={addTodoListHandler}
                   className={s.add_todoList_button}>Add</MyButton>
      </div>
   );
};

