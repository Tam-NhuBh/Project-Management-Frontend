import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { list_notify } from "../../utils/api/notification"; // Thay đổi đường dẫn và tên hàm API tương ứng

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await list_notify(id); 
        setNotifications(res?.data || []); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (event) => {

    if(open== false){
      const id = JSON.parse(localStorage.getItem("user"))._id;
      //console.log("Tai khoan:",id);
      //console.log("Tai khoan:",obj)
      const fetchNotifications = async () => {
        try {
          const res = await list_notify(id); 
          setNotifications(res?.data || []); 
        } catch (error) {
          console.error(error);
        }
      };
      setOpen(true);
      fetchNotifications();
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {    
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((notification, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {notification.message} {/* Sử dụng thông điệp từ dữ liệu API */}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationMenu;
