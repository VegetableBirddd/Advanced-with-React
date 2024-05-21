import React, { PropsWithChildren } from "react";
import { SizeType } from ".";
interface ConfigProviderProps extends PropsWithChildren<ConfigContextType>{
}

export function ConfigProvider(props: ConfigProviderProps) {
  const {
    space,
    children
  } = props;

  return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>
}


export interface ConfigContextType {
  space?: {
    size?: SizeType
  }
}
export const ConfigContext = React.createContext<ConfigContextType>({});

