import { ReactNode } from "react";

export type RouteType = {
  element?: ReactNode; 
  state?: string; 
  index?: boolean; 
  path?: string; 
  children?: RouteType[]; 
  icon?: ReactNode;
  sidebarProps?: {
    displayText?: string; 
    icon?: ReactNode;
  };
};
