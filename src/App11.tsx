import { useEffect, useRef, useState } from 'react';
import MutateObserver from './components/MutateObserver';

export default function App() {
  const [ className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  const containerRef = useRef(null);
  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };
  useEffect(() => {
    const targetNode = containerRef.current!;
  
    
    
    const observer = new MutationObserver(callback);
    
    observer.observe(targetNode, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });

  }, []);

  return (
    <div>
        <div id="container" ref={containerRef}>
          <div className={className}>
            {
              className === 'aaa' ? <div>aaa</div> : <div>
                <p>bbb</p>
              </div>
            }
          </div>
        </div>
    </div>
  )

  return ( //自定义MutateObserver组件使用
    <div>
        <MutateObserver onMutate={callback}>
          <div id="container">
            <div className={className}>
              {
                className === 'aaa' ? <div>aaa</div> : <div>
                  <p>bbb</p>
                </div>
              }
            </div>
          </div>
        </MutateObserver>
    </div>
  )
}