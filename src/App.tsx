import React,{ Suspense, useEffect, useRef, useState } from "react";
import MiniCalendar, { CalendarRef } from "./components/MiniCalendar";
import Calendar from "./components/Calendar";
import dayjs from "dayjs";
import { ErrorBoundary } from "react-error-boundary";
import { IconAdd } from "./components/Icon/icons/IconAdd";
import { IconEmail } from "./components/Icon/icons/IconEmail";
import { create } from "zustand";
import { persist } from "zustand/middleware"

function logMiddleware(func:any) { //zustand中间件
  return function(set:any, get:any, store:any) {

    function newSet(...args:any) {
      console.log('调用了 set，新的 state：', get());
      return set(...args)
    }
  
    return func(newSet, get, store)
  }
}

// const useXxxStore = create(persist((set)=>({
//   aaa:'',
//   updateAaa:(value:string)=>set(()=>({aaa:value}))
// }),{
//   name:'w'
// })
// )

const useXxxStore = create((set) => ({
  aaa: '',
  updateAaa: (value:string) => set(() => ({ aaa: value })),
}))

function Ccc(){

  const updateAaa = useXxxStore((state:any) => state.updateAaa)
  const aaa = useXxxStore((state:any) => state.aaa);
  useEffect(()=>{
    useXxxStore.subscribe((state) => {
      console.log(useXxxStore.getState());
    })
  },[])
  
  return (
    <div>
        <input
          onChange={(e) => updateAaa(e.currentTarget.value)}
          value={aaa}
        />
    </div>
  )
}

function Bbb() {
  useEffect(() => {
      throw new Error('xxx');
  }, [])
  return <div>bbb</div>
}

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
    <MiniCalendar ref={calendarRef} value={new Date('2024-8-15')}></MiniCalendar>
  </div>
}
const Toggle = React.lazy(()=>import('./Toggle'))
function App() {
  const [num, setNum] = useState(0);
  const aaa = useXxxStore((state:any)=>state.aaa);
  console.log(1)
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
      {aaa}
      <Ccc />
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
      {/* <MiniCalendar value={new Date('2023-2-1')} onChange={(date)=>{alert(date)}}/> */}
      <Test />
      {/* <Calendar value={dayjs('2024-03-07')} locale="en-US"/> */}
      <Calendar value={dayjs('2024-03-07')} locale="en-US" onChange={(date) => {
          
      }}/>
      <IconAdd size='40px'></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
      <Suspense fallback={<div>loading...</div>}>
        <Toggle />
      </Suspense>
      {/* <ErrorBoundary fallbackRender={({ error }) => {
            return <div>
            <p>出错了：</p>
            <div>{error.message}</div>
        </div>
      }}>
        <Bbb></Bbb>
      </ErrorBoundary> */}
    </>
    
  );
}

export default Ccc;