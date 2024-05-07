import { useEffect, useRef, useState,SetStateAction, useCallback, } from "react"
//非受控组件和受控组件
interface CalendarProps{
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props;

  const [value, setValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    //这一步经常忘记
    if(propsValue === undefined && !isFirstRender.current) {//当不是首次渲染，但 value 变为 undefined 的情况，也就是从受控模式切换到了非受控模式，要同步设置 state 为 propsValue。
      setValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? value : propsValue;

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  } 

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={()=> {changeValue(new Date('2024-5-1'))}}>2023-5-1</div>
    <div onClick={()=> {changeValue(new Date('2024-5-2'))}}>2023-5-2</div>
    <div onClick={()=> {changeValue(new Date('2024-5-3'))}}>2023-5-3</div>
  </div>
}

function App() {
  const [value,setValue] = useState(new Date('2024-5-1'))
  return <Calendar value={value} onChange={(date) => {
    console.log(date.toLocaleDateString());
    setValue(date)
  }}/>
}

export default App

// 提取相同逻辑，组成hook
function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T,
    onChange?: (value: T) => void;
  },
): [T, React.Dispatch<React.SetStateAction<T>>,] {
  const { defaultValue, value: propsValue, onChange } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!;
    } else if(defaultValue !== undefined){
      return defaultValue!;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if(propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  } 

  const setState = useCallback((value: SetStateAction<T>) => {
    let res = isFunction(value) ? value(stateValue) : value

    if (propsValue === undefined) {
      setStateValue(res);
    }
    onChange?.(res);
  }, [stateValue]);

  return [mergedValue, setState]
}

interface CalendarProps{
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function CalendarTwo(props: CalendarProps) {
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props;

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  });

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={()=> {setValue(new Date('2024-5-1'))}}>2023-5-1</div>
    <div onClick={()=> {setValue(new Date('2024-5-2'))}}>2023-5-2</div>
    <div onClick={()=> {setValue(new Date('2024-5-3'))}}>2023-5-3</div>
  </div>
}
