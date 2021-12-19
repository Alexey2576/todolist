import React from "react";
import {FilterType} from "../../../../App";
export type MySelectItemType = {
   id: number
   title: FilterType,
}

export const MySelectItem: React.FC<MySelectItemType> = (
   {
      id,
      title,
   }
) => {

   return <span className={"select-item"} >{title}</span>
}