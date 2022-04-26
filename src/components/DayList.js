import DayListItem from './DayListItem'
import React from "react";

function DayList(props) {
  const {days, value, onChange} = props;


  
  const listItems = days.map((x) => {
    return (
    <DayListItem 
        key={x.id}
        name={x.name} 
        spots={x.spots} 
        selected={x.name === value}
        setDay={onChange}  
      />
    )
  })


  return(
    <ul>
      {listItems}
    </ul>
  )
}

export default DayList;