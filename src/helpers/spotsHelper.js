export default function spotsHelper(state, dayID, add) {
  let temp;
  if (add) {
    temp = {...state.days[dayID-1], spots:(state.days[dayID-1].spots - 1)}
  } else {
    temp = {...state.days[dayID-1], spots:(state.days[dayID-1].spots + 1)}
  }
  const days = state.days.map(day => {
    if (day.id === dayID) {
      return temp
    }
    return day
  })      
  return days;
}