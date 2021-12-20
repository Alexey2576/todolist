import React from "react";
import {MySelectItem, MySelectItemType} from "./SelectItem/MySelectItem";
import {FilterType} from "../../../App";

type SelectBlockItemsType = {
   list: MySelectItemType[]
   hoveredItem: string
   setSelectItemCallback: (title: FilterType) => void
   setHoveredItem: (title: FilterType) => void
}

export const MySelectBlockItems: React.FC<SelectBlockItemsType> = (
   {
      list,
      setSelectItemCallback,
      hoveredItem,
      setHoveredItem
   }
) => {
   return (
      <div>
         <div className={"list-item"}>
            { list.map(l => {
               const onClickItem = () => setSelectItemCallback(l.title)
               const onMouseEnter = () => setHoveredItem(l.title)

               const fullNameSelectItem = hoveredItem === l.title
                  ? "select-item selected-item-in-block"
                  : "select-item"

               return (
                  <div className={fullNameSelectItem}
                       onClick={ onClickItem }
                       onMouseEnter={ onMouseEnter }
                       key={l.id}>
                     <MySelectItem id={l.id} title={l.title}/>
                  </div>
               )
            }) }
         </div>
      </div>
   )
}