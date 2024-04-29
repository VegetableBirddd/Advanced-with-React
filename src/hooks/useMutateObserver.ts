import { useEffect } from "react"

const defaultOptions:MutationObserverInit = {
    subtree:true,
    childList:true,
    attributeFilter:['style','class']
}
export default function useMutateObserver(
    nodeOrList:HTMLElement | HTMLElement [],
    callback: MutationCallback,
    options:MutationObserverInit = defaultOptions,
){
    useEffect(()=>{
        if(!nodeOrList)return;
        let instance:MutationObserver;
        const nodeList = Array.isArray(nodeOrList) ? nodeOrList: [nodeOrList];
        if('MutationObserver' in window){
            instance = new MutationObserver(callback);
            nodeList.forEach(ele=>{
                instance.observe(ele,options);
            })
        }
        return ()=>{
            instance?.takeRecords();//从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array种。
            instance?.disconnect();//阻止MutationObserver实例继续接收的通知，知道再次调用其oberve()方法。
        }
    },[options,nodeOrList])
}