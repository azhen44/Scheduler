import DayList from "./DayList";
import "components/Application.scss";
import React, {useState, useEffect} from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect( () => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get(("http://localhost:8001/api/appointments")),
      axios.get(("http://localhost:8001/api/interviewers"))
    ]).then (all => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
      // console.log({days:all[0].data, appointments:all[1].data})
    }).catch(err => console.log(err))
}, [])

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({...state, days});
  const dailyAppointments = getAppointmentsForDay({days:state.days, appointments:state.appointments},state.day);
  console.log(dailyAppointments)
  const appList = Object.values(dailyAppointments).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
