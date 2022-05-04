import axios from "axios";
import { useEffect, useState } from "react";
import spotsHelper from "helpers/spotsHelper";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect( () => {
    Promise.all([
      axios.get("/api/days"),
      axios.get(("/api/appointments")),
      axios.get(("/api/interviewers"))
    ]).then (all => {
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    }).catch(err => console.log(err))
}, [])

  const setDay = day => setState({ ...state, day });

  //function to update Spots. Uses a helperfunction to create a new days object based on conditions. takes in an add arguemnt to determine if the updateSpots should add a spot (Del), sub a spot(Create).
  const updateSpots = (id, add) => {
      if (id > 0 && id <= 5) {
        const days = spotsHelper(state, state.days[0].id, add)
        setState(prev => ({...prev, days:days}))     
    } else if (id > 5 && id <= 10) {
        const days = spotsHelper(state, state.days[1].id, add)
        setState(prev => ({...prev, days:days}))
    } else if (id > 10 && id <= 15) {
        const days = spotsHelper(state, state.days[2].id, add)
        setState(prev => ({...prev, days:days}))
    } else if (id > 15 && id <= 20) {
        const days = spotsHelper(state, state.days[3].id, add)
        setState(prev => ({...prev, days:days}))
    } else if (id > 20 && id <= 25) {
        const days = spotsHelper(state, state.days[4].id, add)
        setState(prev => ({...prev, days:days}))
    }
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
 
    
    return axios.put(`/api/appointments/${id}`, appointments[id])
    .then (() => {
        setState({
        ...state,
        appointments
      })  
    })
    .then( () => {
      //only subtract a spot (CREATE) if the appointment slot is null. This will prevent EDIT from subtracting a spot onSave.
      if (state.appointments[id].interview === null) {
        updateSpots(id, true)
      }
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
      updateSpots(id, false)
    })
  }
 

  return {state, setDay,bookInterview,cancelInterview };
}

