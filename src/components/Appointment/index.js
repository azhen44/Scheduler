import React from "react";
import "components/Appointment/styles.scss"; 

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export default function Appointment(props) {
  const {id, time, interview} = props

 

  return (
    <article className="appointment">
      <Header time={time}/>
      { props.interview &&  <Show student={interview.student} interviewer={interview.interviewer} />}
      { !props.interview &&  <Empty />}   
    </article>

  );
}
