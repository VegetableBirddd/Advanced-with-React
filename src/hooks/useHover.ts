import { cloneElement, useState } from "react";

export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement;

const useHover = (element: Element): [React.ReactElement, boolean] => {
  const [state, setState] = useState(false);

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    originalOnMouseEnter?.(event); //这里注意如果传入的 React Element 本身有 onMouseEnter、onMouseLeave 的事件处理函数，要先调用下
    setState(true);
  };
  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event);//这里注意如果传入的 React Element 本身有 onMouseEnter、onMouseLeave 的事件处理函数，要先调用下
    setState(false);
  };

  if (typeof element === 'function') {
    element = element(state);
  }

  const el = cloneElement(element, { //用 cloneElement 复制 ReactElement，给它添加 onMouseEnter、onMouseLeave 事件。
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });

  return [el, state];
};

export default useHover;
