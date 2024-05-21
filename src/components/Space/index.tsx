import classNames from "classnames";
import React, { Fragment } from "react";
import './index.scss'
import { ConfigContext } from "./ConfigProvider";

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    size?: SizeType | [SizeType,SizeType];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'center' | 'end';
    split?: React.ReactNode;
    wrap?: boolean;
  }

  const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
  };
  
function getNumberSize(size: SizeType) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}


const Space: React.FC<SpaceProps> = props => {

const { space } = React.useContext(ConfigContext);
const {
    className,
    style,
    direction='horizontal',
    align,
    size=space?.size || 'small',
    wrap=false,
    children,
    split,
    ...otherProps
} = props;
const childNodes = React.Children.toArray(children);
const nodes = childNodes.map((node:any,i)=>{
    const key = node&& node.key || `space-item-${i}`
    return <Fragment key={key}>
        <div className="space-item">
            {node}
        </div>
        {i < childNodes.length-1 && split && (
                <span className={`${className}-split`} style={style}>
                    {split}
                </span>
            )}
    </Fragment>
})
const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
const cn = classNames(
  'space',
  `space-${direction}`,
  {
    [`space-align-${mergedAlign}`]: mergedAlign,
  },
  className,
);

const otherStyles: React.CSSProperties = {};

const [horizontalSize, verticalSize] = React.useMemo(
  () =>
    ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
      getNumberSize(item),
    ),
  [size]
);

otherStyles.columnGap = horizontalSize;
otherStyles.rowGap = verticalSize;

if (wrap) {
  otherStyles.flexWrap = 'wrap';
}


return <div
    className={cn}
    style={{
        ...style,
        ...otherStyles
    }}
    {...otherProps}
>
    {nodes}
</div>
};

export default Space;
  