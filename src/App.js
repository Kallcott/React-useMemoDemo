import React, {useState, useMemo, useEffect} from "react";

// Case 1: cache slow function for speed.
// use Memo is for use memoization. caches the value of a function to use again and again. 
// we don't memoise everything because of the memory overheaad. only use when needed

// Case 2: referential equality
// when you compare two different variables in JS, we compare their reference.
// we can cache objects so we can compare them. 

export default function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)

  // Case 1
  // effect1: change Theme will be very fast
  // effect2: changing number bc cache update due to number dependancy
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])

 //Case 2
 // themestyles 1 and 2 are not equivalent because they reference different objects
 //  const themeStyles2 = {
 //    backgroundColor: dark ? 'black' : 'white',
 //    color: dark ? 'white' : 'black'
 // }
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'  
    }
 }, [dark]) // here our object relies on dark, so update cache when dark changes 
 
 // Case 1
 // problem: when we call our number we are theme changed is also being run
 // this is because themeStyles reliance can't equate two objects, so we wrap in a useMemo
 useEffect(() => {
   console.log('Theme Changhed')
 }, [themeStyles])

  return (
   <>
  <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
    <button onClick={() =>  setDark(prevDark => !prevDark)}i>Change Theme</button>
  <div style={themeStyles}>{doubleNumber}</div>
   </> 
  ) 
}

//Makes app very slow, both set number and change theme
function slowFunction(num){
  console.log('Calling Slow Function');
  for (let i = 0; i <= 300000000; i++) {}
  return num + 2
}
