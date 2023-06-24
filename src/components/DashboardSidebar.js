import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Hidden, List } from "@material-ui/core";
import { Users as UsersIcon } from "react-feather";
import NavItem from "./NavItem";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import HelpIcon from "@material-ui/icons/HelpOutlineOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";

const items = [
  {
    href: "/app/otaq",
    icon: MeetingRoomOutlinedIcon,
    title: "Otaq qapilari",
  },
  {
    href: "/app/giris",
    icon: MeetingRoomOutlinedIcon,
    title: "Giris qapilari",
  },
  {
    href: "/app/isler-sekil",
    icon: MeetingRoomOutlinedIcon,
    title: "Islerimiz - sekiller",
  },
  {
    href: "/app/isler-video",
    icon: MeetingRoomOutlinedIcon,
    title: "Islerimiz - videolar",
  },
  {
    href: "/app/chats",
    icon: MessageOutlinedIcon,
    title: "Mesajlar",
  },
  {
    href: "/app/countries",
    icon: UsersIcon,
    title: "Olkeler",
  },
  {
    href: "/app/terkibler",
    icon: UsersIcon,
    title: "Terkibler",
  },
  {
    href: "/app/giris-terkibler",
    icon: UsersIcon,
    title: "Giris Terkibler",
  },
  {
    href: "/app/uzlenmeler",
    icon: UsersIcon,
    title: "Uzlenmeler",
  },
  {
    href: "/app/giris-uzlenmeler",
    icon: UsersIcon,
    title: "Giris Uzlenmeler",
  },
  {
    href: "/app/colors",
    icon: UsersIcon,
    title: "Rengler",
  },
  {
    href: '/app/sales',
    icon: LocalOfferIcon,
    title: 'Endirimler'
  },
  {
    href: "/app/suallar",
    icon: HelpIcon,
    title: "Suallar",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 200,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 200,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
};

export default DashboardSidebar;
