// components/modules/ModuleList.tsx
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import SubmoduleList from './SubmoduleList';
import { RouteType } from '../../../routes/route';

type ModuleListProps = {
  routes: RouteType[];
  expandedModule: string | null;
  handleModuleClick: (modulePath: string) => void;
};

const ModuleList: React.FC<ModuleListProps> = ({ routes, expandedModule, handleModuleClick }) => {
  const location = useLocation();

  const renderSidebarItems = (routes: RouteType[], parentPath = '') => {
    return routes.map((route) => {
      const fullPath = `${parentPath.replace(/\/$/, '')}/${route.path}`;
      const isActive = location.pathname === fullPath;
      const hasChildren = route.children && route.children.length > 0;

      return (
        <React.Fragment key={fullPath}>
          <ListItem
            button
            component={Link}
            to={fullPath}
            onClick={() => hasChildren && handleModuleClick(fullPath)}
            selected={isActive}
          >
            {route.sidebarProps?.icon && (
              <ListItemIcon>{route.sidebarProps.icon}</ListItemIcon>
            )}
            <ListItemText primary={route.sidebarProps?.displayText || route.path} />
            {hasChildren && (expandedModule === fullPath ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {hasChildren && (
            <Collapse in={expandedModule === fullPath} timeout="auto" unmountOnExit>
              <SubmoduleList routes={route.children!} parentPath={fullPath} expandedModule={expandedModule} handleModuleClick={handleModuleClick} />
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return <List>{renderSidebarItems(routes)}</List>;
};

export default ModuleList;
