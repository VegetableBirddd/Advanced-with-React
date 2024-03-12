import { render, fireEvent, waitFor, renderHook } from '@testing-library/react';
import Toggle from './Toggle';
import { act } from 'react-dom/test-utils';
import useCounter from './hooks/useCounter';

test('toggle',async () => { //点击button单元测试
  const { container } = render(<Toggle/>);

  expect(container.querySelector('p')?.textContent).toBe('close');
    
  act(() => {
    fireEvent.click(container.querySelector('button')!)
  })
  
  await waitFor(() => expect(container.querySelector('p')?.textContent).toBe('open'), {
        timeout: 3000
    });
})

test('useCounter', async () => {
    const hook = renderHook(() => useCounter(0));
    
    const [count, increment, decrement]  = hook.result.current;
  
    act(() => {
      increment(2);
    });
    expect(hook.result.current[0]).toBe(2);
  
    act(() => {
      decrement(3);
    });
    expect(hook.result.current[0]).toBe(-1);
  
    hook.unmount();
  });
  