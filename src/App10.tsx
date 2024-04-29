import { createPortal } from 'react-dom' //createPortal为react提供的api，可以把组件渲染到某个dom下。
import Portal from './components/Portal';
import { useEffect, useRef } from 'react';
//自定义Portal、MutateObserver、CopyToClipboard
function App() {
  const containerRef = useRef<HTMLElement>(null);
  const content = <div className="btn">
    <button>按钮</button>
  </div>;
  useEffect(()=>{
    console.log(containerRef);
  },[])
//   return createPortal(content, document.body);
return <Portal attach={document.body} ref={containerRef}>
    {content}
</Portal>
}

export default App;