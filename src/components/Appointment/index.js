import React from "react";
import "components/Appointment/styles.scss"; 

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export default function Appointment(props) {
  // console.log('in appointment', props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onCancel() {
    back();
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then( () => {
      transition(SHOW)
    })
    .catch( () => {
      transition(ERROR_SAVE, true)
    })
  }

  const onDelete = () => {
    transition(CONFIRM)
  }


  const cancelInterview = () => { 
    transition(DELETING)
    props.cancelInterview(props.id)
    .then ( () => {
        transition(EMPTY)
    })
    .catch( () => {
      transition(ERROR_DELETE, true)
    })
  }
  
  const onEdit = () => {
    transition(EDIT);
  }



  


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && <Form onCancel={onCancel} onSave={save} interviewers={props.interviewers} bookInterview={props.bookInterview} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onConfirm={cancelInterview} onCancel={onCancel} />}
      {mode === EDIT && <Form onCancel={onCancel} onSave={save} interviewers={props.interviewers} bookInterview={props.bookInterview} student={props.interview.student}
      interviewer={props.interview.interviewer.id} />}
      {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={'Could not delete appointment'} onClose={back}/> }
    </article>

  );
}
