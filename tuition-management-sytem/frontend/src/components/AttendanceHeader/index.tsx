import { useState, useEffect, createContext } from "react";
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  useMantineColorScheme,
  Image,
  createStyles,
  Container,
  Tabs,
  Space,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconChevronDown,
  IconCalendar,
  IconClock,
  IconUserCircle,
} from "@tabler/icons";
import adminDashboardLogoDark from "../../assets/adminDashboardLogoDark.png";
import adminDashboardLogoLight from "../../assets/adminDashboardLogoLight.png";
import defaultUserImage from "../../assets/defaultprofile.png";
import LightDarkButton from "../../components/lightDarkButton";
import AdminDrawer  from "../adminProfileDrawer";
import AttendanceProfileDrawer from "../AttendanceProfileDrawer";

// Custom Theme
const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    // marginBottom: 120,
  },

  mainSection: {
    paddingBottom: 55,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

interface HeaderProps {
  user: {
    _id : string;
    customId : string;
    name: string;
    email : string;
    telephone : string;
    address : string;
  };
}

const AttendanceHeader = ({ user }: HeaderProps) => {

  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [dateState, setDateState] = useState(new Date());
  const dark = colorScheme === "dark";
  const [sidePanelOpened,setSidePanelOpened] = useState(false);//use to open and close the side pannel of the admin details
  const [userDetails, setUserDetails] = useState({
    _id : user._id,
    customId : user.customId,
    name: user.name,
    email : user.email,
    telephone : user.telephone,
    address : user.address
  })

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          {/* dashboard logo */}
          <Image
            src={dark ? adminDashboardLogoDark : adminDashboardLogoLight}
            width={100}
          />

          {/* profileDropDown */}
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  {/* profile picture */}
                  <Avatar
                    src={defaultUserImage}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {userDetails.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Attendance Manager</Menu.Label>
              <Menu.Divider />
              <Menu.Label>Change Theme</Menu.Label>
              
              {/* dark mode button implementation */}
              <LightDarkButton marginLeft={10} marginTop = {10} marginBottom={10}/>
              
              <Menu.Divider />
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconUserCircle size={14} stroke={1.5} />} onClick={() => setSidePanelOpened(true)}>
                Profile
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} >
                <a
                  href="/logout"
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>

      {/* user profie side pannel */}
      <Drawer
      opened={sidePanelOpened}
      onClose={() => setSidePanelOpened(false)}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      position="left"
      size="xl"
    >
      <AttendanceProfileDrawer sidePannel={setSidePanelOpened} adminDetails = {userDetails}/>
    </Drawer>
    </div>
  );
};

export default AttendanceHeader;
