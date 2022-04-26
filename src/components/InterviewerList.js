import React from "react";
import "components/InterviewerList.scss"; 
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  


  
  
  const listItems = props.interviewers.map((x) => {
    if (x) {
      return (
      <InterviewerListItem 
          key={x.id}
          name={x.name} 
          avatar={x.avatar} 
          selected={x.id === props.value}
          setInterviewer={() => props.onChange(x.id)}    
        />
      )
    }
  })



  


   

   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listItems}
      </ul>
    </section>
   );
}
