import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
export default function Form(props) {
  const [message, setMessage] = useState("")
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  function nameHandler (event) {
    setStudent(event.target.value)
  }
  function reset() {
    setInterviewer(null)
    setStudent("")
  }
  function cancel() {
    reset()
    props.onCancel();
  }
  function save() {
    if (student && interviewer) {
      setMessage("");
      props.onSave(student, interviewer)
    } else {
      if (!student && !interviewer) {
        setMessage("Student name and Interviewer cannot be blank.")
      }else if (!student) {
        setMessage("Student name cannot be blank")
      }else if (!interviewer) {
        setMessage("Please select an Interviewer")
      }
    }
  }

 





  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
            <input
              data-testid="student-name-input"
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={student}
              onChange={(event) => nameHandler(event)}
            />
            {<strong className="warning">{message}</strong>}
            <br />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>

  );
}

