import {  useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);  
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    if (replace === true) {     
      setMode(newMode)
      setHistory((prev) => {
        prev.pop()
        return [...prev, newMode]
      })
    } else {
      setMode(newMode)
      setHistory(prev => [...prev, newMode])
    }
  }
  const back = () => {
    if(mode !== history[0]) {
      const temp = history
      temp.pop();
      setMode(temp[temp.length - 1]);
    }
  }

  
  return { mode, transition, back };
}

