import DayList from "./DayList";
import "components/Application.scss";
import React, {useState, useEffect} from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect( () => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get(("http://localhost:8001/api/appointments")),
      axios.get(("http://localhost:8001/api/interviewers"))
    ]).then (all => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    }).catch(err => console.log(err))
}, [])

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({...state, days});
  const dailyAppointments = getAppointmentsForDay({days:state.days, appointments:state.appointments},state.day);

  const bookInterview =  (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
    .then ( (response) => {
        setState({
        ...state,
        appointments
      })  
    })
  }
  
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview : null
    }
    console.log('appointment after del',appointment)
    const appointments = {
      ...state.appointments,
      [id] : appointment
    }
    console.log('new appointments list', appointments)
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then ( (response) => {
        setState({
        ...state,
        appointments
      })  
    })
  }


 

  const appList = Object.values(dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
     return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })




  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            value={state.day}
            onChange={setDay}          
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       {appList}      
       <Appointment key="last" time="5pm" />
      </section>


      
    </main>
  );
}
