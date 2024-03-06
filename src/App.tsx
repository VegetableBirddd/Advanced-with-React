import { useEffect, useRef, useState } from "react";
import MiniCalendar, { CalendarRef } from "./components/MiniCalendar";
import Calendar from "./components/MiniCalendar";

function Test() {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return <div>
    {/* <Calendar value={new Date('2023-3-1')} onChange={(date: Date) => {
        alert(date.toLocaleDateString());
    }}></Calendar> */}
    <Calendar ref={calendarRef} value={new Date('2024-8-15')}></Calendar>
  </div>
}

function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log('effect')
    const timer = setInterval(() => {
      console.log(num);
    }, 1000);

    return () => {
      console.log('clean up')
      clearInterval(timer);
    }
  }, [num]);

  return (
    <>
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
      <MiniCalendar value={new Date('2023-2-1')} onChange={(date)=>{alert(date)}}/>
      <Test />
    </>
    
  );
}

export default App;