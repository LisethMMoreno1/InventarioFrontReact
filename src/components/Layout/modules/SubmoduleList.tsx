// components/modules/SubmoduleList.tsx
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteType } from "../../../routes/route";

type SubmoduleListProps = {
  routes: RouteType[];
  parentPath: string;
  expandedModule: string | null;
  handleModuleClick: (modulePath: string) => void;
};

const SubmoduleList: React.FC<SubmoduleListProps> = ({
  routes,
  parentPath,
  expandedModule,
  handleModuleClick,
}) => {
  const location = useLocation();

  const renderSubmodules = (routes: RouteType[], parentPath: string) => {
    return routes.map((route) => {
      const fullPath = `${parentPath.replace(/\/$/, '')}/${route.path}`;
      const isActive = location.pathname === fullPath;

      return (
        <ListItem
          button
          key={fullPath}
          component={Link}
          to={fullPath}
          selected={isActive}
        >
          {route.sidebarProps?.icon && (
            <ListItemIcon>{route.sidebarProps.icon}</ListItemIcon>
          )}
          <ListItemText
            primary={route.sidebarProps?.displayText || route.path}
          />
        </ListItem>
      );
    });
  };

  return <List disablePadding>{renderSubmodules(routes, parentPath)}</List>;
};

export default SubmoduleList;
