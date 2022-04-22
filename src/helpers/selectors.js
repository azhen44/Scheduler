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