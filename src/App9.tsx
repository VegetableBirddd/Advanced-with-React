import { useEffect, useState } from 'react';

function App() {

    const [count,setCount] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {
            console.log(count);
            setCount(count=>count+1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return <div>{count}</div>
}

export default App;
