import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData() {
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
  const updateSpots = () => {
    axios.get("http://localhost:8001/api/days")
    .then((data) => {
      setState(prev => ({...prev,days:data.data}))
    })
  }

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
    .then( () => {
      updateSpots()
    })
    .catch (error => {
      console.log(error)
    })
  }


  
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview : null
    }

    const appointments = {
      ...state.appointments,
      [id] : appointment
    }
  
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then ( (response) => {
        setState({
        ...state,
        appointments
      })  
    })
    .then (() => {
      updateSpots()
    })
  }
 

  return {state, setDay,bookInterview,cancelInterview };
}

