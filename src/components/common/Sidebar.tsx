import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink } from 'react-router-dom';
import { CSSProperties } from 'react';

interface SidebarProps {
    drawerWidth: number,
    mobileOpen:boolean,
    handleDrawerClose:() => void,
    handleDrawerTransitionEnd:() => void,
}

interface menuItem {
  text:string,
  path:string,
  icon:React.ComponentType,
}

const Sidebar = ({drawerWidth,mobileOpen,handleDrawerClose,handleDrawerTransitionEnd}:SidebarProps) => {

  const MenuItems:menuItem[] = [
    {
      text: "Home",
      path:"/",
      icon:HomeIcon,
    },
    // {
    //   text: "Report",
    //   path:"/report",
    //   icon:BarChartIcon,
    // }
  ]

  const baseLinkStyle:CSSProperties = {
    textDecoration:"none",
    color:"#222",
    display:"block",
  }

  const activeLinkStyle:CSSProperties = {
    backgroundColor:"rgba(0,0,0,0.2)",
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItems.map((item, index) => (
        <NavLink key={index} to={item.path} style={({isActive}) => {
          return {
            ...baseLinkStyle,
            ...(isActive ? activeLinkStyle : {})
          }
        }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        ))}
      </List>
    </div>
  );


  return (
    <Box
    component="nav"
    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    aria-label="mailbox folders"
  >

    <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
  )
}

export default Sidebar