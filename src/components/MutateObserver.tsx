import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from "../hooks/useMutateObserver";

interface MutationObserverProps{
    options?: MutationObserverInit;
    onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
    children: React.ReactElement;
  }

  const MutateObserver: React.FC<MutationObserverProps> = props=>{
    const {
        options,
        onMutate = ()=>{},
        children,
    } = props
    const elementRef = useRef<HTMLElement>(null);
    const [target,setTarget] = useState<HTMLElement>();
    useMutateObserver(target!,onMutate,options);
    useLayoutEffect(()=>{
        setTarget(elementRef.current!)
    },[]);
    if(!children){
        return null;
    }
    return cloneElement(children,{ ref:elementRef}); //通过 React.cloneElement 给 children 加上 ref 来获取 dom 节点。
  }

  export default MutateObserver;