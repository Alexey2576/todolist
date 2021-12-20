import React, {KeyboardEvent} from "react";
import {MySelectItemType} from "./SelectBlockItems/SelectItem/MySelectItem";
import {MySelectBlockItems} from "./SelectBlockItems/MySelectBlockItems";
import {FilterType} from "../../App";
import './MySelect.css'


type SelectType = {
   todoList_ID: string
   stateSelect: SelectStateType
   onClickSelectedItem: () => void
   setSelectItemCallback: (title: FilterType) => void
   onBlurSelectBlockItems: () => void
   setNextValueCallBack: (key: string) => void
   setHoveredItem: (title: FilterType) => void
}

export type SelectStateType = {
   [todoList_ID: string]: {
      list: MySelectItemType[]
      selectItem: FilterType
      hoveredItem: FilterType
      visible: boolean
   }
}

export const MySelect: React.FC<SelectType> = (
   {
      todoList_ID,
      stateSelect,
      onClickSelectedItem,
      setSelectItemCallback,
      onBlurSelectBlockItems,
      setNextValueCallBack,
      setHoveredItem
   }
) => {

   const setNextValue = (e: KeyboardEvent<HTMLDivElement>) => {
      setNextValueCallBack(e.key)
   }
   return (
      <div className={"select"}>
         <div className={"selected-item"}
              onKeyUp={setNextValue}
              onClick={onClickSelectedItem}>
            <button autoFocus onBlur={onBlurSelectBlockItems}>{stateSelect[todoList_ID].selectItem}</button>
         </div>
         {stateSelect[todoList_ID].visible && <MySelectBlockItems list={stateSelect[todoList_ID].list}
                                                                  setSelectItemCallback={setSelectItemCallback}
                                                                  hoveredItem={stateSelect[todoList_ID].hoveredItem}
                                                                  setHoveredItem={setHoveredItem}/>
         }
      </div>
   )
}






