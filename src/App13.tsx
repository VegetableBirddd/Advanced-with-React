import { useEffect, useState } from "react";

const createStore = (createState:any) => {
    let state:any;
    const listeners = new Set();
  
    const setState = (partial:any, replace:any) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial

      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener:any) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  
    const subscribe= (listener:any) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  
    const api = { setState, getState, subscribe, destroy }

    state = createState(setState, getState, api)

    return api
}

function useStore(api:any, selector:any) {
    const [,forceRender ] = useState(0);
    useEffect(() => {
        api.subscribe((state:any, prevState:any) => {
            const newObj = selector(state);
            const oldobj = selector(prevState);

            if(newObj !== oldobj) {
                forceRender(Math.random());
            }       
        })
    }, []);
    return selector(api.getState());
}

export const create = (createState:any) => {
    const api = createStore(createState)

    const useBoundStore = (selector:any) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}
