import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteType } from "../../routes/route";

type DrawerContentProps = {
  routes: RouteType[];
  expandedModule: string | null;
  setExpandedModule: React.Dispatch<React.SetStateAction<string | null>>;
};

const DrawerContent = ({
  routes,
  expandedModule,
  setExpandedModule,
}: DrawerContentProps) => {
  const location = useLocation();

  // Log para verificar el location.pathname

  const renderSidebarItems = (routes: RouteType[], parentPath = "") => {
    return routes.map((route) => {
      const fullPath = `${parentPath.replace(/\/$/, "")}/${route.path}`;
      const isActive = location.pathname === fullPath;
      const hasChildren = route.children && route.children.length > 0;

      return (
        <React.Fragment key={fullPath}>
          <ListItem button component={Link} to={fullPath} selected={isActive}>
            {route.sidebarProps?.icon && (
              <ListItemIcon>{route.sidebarProps.icon}</ListItemIcon>
            )}
            <ListItemText
              primary={route.sidebarProps?.displayText || route.path}
            />
          </ListItem>

          {hasChildren && (
            <Collapse
              in={expandedModule === fullPath}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {renderSidebarItems(route.children || [], "/" + fullPath + "/")}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return <List>{renderSidebarItems(routes)}</List>;
};

export default DrawerContent;
