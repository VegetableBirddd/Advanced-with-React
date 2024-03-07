import { Dayjs } from 'dayjs';
import MonthCalendar from './MonthCalendar';
import './index.scss';
import Header from './Header';
import { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import LocaleContext from './LocaleContext';

export interface CalendarProps {
    value: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode;
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    // 国际化相关
    locale?: string;
    onChange?: (date: Dayjs) => void;
}


function Calendar(props: CalendarProps) {

    const {
        value,
        style,
        className,
        locale
    } = props;

    const classNames = classnames("calendar", className);

    return <LocaleContext.Provider value={{locale:locale || navigator.language}}>
        <div className={classNames} style={style}>
            <Header></Header>
            <MonthCalendar {...props}/>
        </div>
    </LocaleContext.Provider>
    
}

export default Calendar;

