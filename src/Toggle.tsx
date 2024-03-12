import { useCallback, useState } from 'react';
import useCounter from './hooks/useCounter';

function Toggle() {
    const [count, increment, decrement] = useCounter();
    const [status, setStatus] = useState(false);

    const clickHandler = useCallback(() => {
        setTimeout(() => {
            setStatus((prevStatus) => !prevStatus);
        }, 2000);
    }, []);

    return (
        <div>
            <div>
                {count}
            </div>
            <button onClick={clickHandler}>切换</button>
            <p>{status ? 'open' : 'close' }</p>
            <div>
                <button onClick={() => increment(1)}>加一</button>
                <button onClick={() => decrement(2)}>减二</button>
            </div>
        </div>
    );
}

export default Toggle;
