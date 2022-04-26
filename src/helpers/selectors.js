export function getAppointmentsForDay(state, day) {
  const finalList = [];
  const res = state.days.find(element => element.name === day)

  if (res) {
    res.appointments.forEach(element => {
      finalList.push(state.appointments[element])
    })
  }

  return finalList; 
}

export function getInterview(state, interview) {
  let res = {};
  if (interview) {
    res = {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
      }
    return res
  } else return null
  
  
}

export function getInterviewersForDay(state, day) {
  const finalList = [];
  const res = state.days.find(element => element.name === day)


  if (res) {
    res.interviewers.forEach(element => {
      finalList.push(state.interviewers[element])
    })
  }
  return finalList; 
}