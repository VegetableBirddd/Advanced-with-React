import { MouseEventHandler, useEffect, useRef } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log('box pageY', e.pageY);
    console.log('box clientY', e.clientY)
    // console.log('box offsetY', e.offsetY);
    console.log('box screenY', e.screenY);
    console.log(e)
  }

  useEffect(() => {
    document.getElementById('box')!.addEventListener('click', (e) => {
      console.log('box2 pageY', e.pageY);
      console.log('box2 clientY', e.clientY)
      console.log('box2 offsetY', e.offsetY);
      console.log('box2 screenY', e.screenY);
    });
  }, []);

  return (
    <div>
      <div id="box" ref={ref} style={{
        marginTop: '800px',
        width: '100px',
        height: '100px',
        background: 'blue'
      }} onClick={clickHandler}></div>
    </div>
  )
}

export default App
