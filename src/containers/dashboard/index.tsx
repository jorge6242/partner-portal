import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PeopleIcon from '@material-ui/icons/People';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import BuildIcon from '@material-ui/icons/Build';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import Collapse from '@material-ui/core/Collapse'

import { logout } from "../../actions/loginActions";
import AccessControlForm from "../../components/AccessControlForm";
import { updateModal } from "../../actions/modalActions";
import { getAll as getStatusPersonAll } from "../../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../../actions/maritalStatusActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getAll as getCountries } from "../../actions/countryActions";
import { getAll as getRelationTypes } from "../../actions/relationTypeActions";
import { getAll as getPaymentMethods } from "../../actions/paymentMethodActions";
import { getList as getTransactionTypes } from "../../actions/transactionTypeActions";
import { getList as getCurrencies } from "../../actions/currencyActions";
import { getAll as getSports } from "../../actions/sportActions";
import { getList as getLockerLocationList } from "../../actions/lockerLocationsActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    menuContainer: {
      fontSize: '10px',
    }
  })
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  function handleClick(value: number) {
    switch (value) {
      case 1:
        setOpen1(!open1)
        break;
      case 2:
        setOpen2(!open2)
        break;
      case 3:
        setOpen3(!open3)
        break;
      case 4:
        setOpen4(!open4)
        break;
      case 5:
        setOpen5(!open5)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(getStatusPersonAll());
    dispatch(getMaritalStatusAll());
    dispatch(getGenderAll());
    dispatch(getCountries());
    dispatch(getRelationTypes());
    dispatch(getPaymentMethods());
    dispatch(getTransactionTypes());
    dispatch(getCurrencies());
    dispatch(getSports());
    dispatch(getLockerLocationList());
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      history.push('/dashboard/main');
    }
  }, [history, location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  const handleLogout = () => dispatch(logout());

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccessControl = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <AccessControlForm />,
          customSize: 'medium'
        }
      })
    );
  }
  const renderMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </ListItem>
  )

  const renderFirstMenu = (Icon: React.ReactType, title: string, route: string) => (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </MenuItem>
  )

  const renderSecondMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button onClick={() => handeClick(route)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderFirstMenu(ListAltIcon, "Reporte General", "/dashboard/general-report")}
      </Menu>

      <List dense >
        {renderFirstMenu(DashboardIcon, "Inicio", "/dashboard/main")}
        {renderFirstMenu(AccountCircleIcon, "Socios", "/dashboard/socio")}
        {renderFirstMenu(DoubleArrowIcon, "Acciones", "/dashboard/share")}
        {renderFirstMenu(DoubleArrowIcon, "Movimientos de Acciones", "/dashboard/share-movement")}

        <ListItem button onClick={() => handleClick(1)}>
          <ListItemIcon >
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Mantenimientos" />
          {open1 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List dense>
            {renderSecondMenu(AccountBalanceIcon, "Banco", "/dashboard/banco")}
            {renderSecondMenu(DoubleArrowIcon, "Pais", "/dashboard/pais")}
            {renderSecondMenu(SportsBaseballIcon, "Deporte", "/dashboard/deporte")}
            {renderSecondMenu(DoubleArrowIcon, "Profesion", "/dashboard/profesion")}
            {renderSecondMenu(DoubleArrowIcon, "Estado Civil", "/dashboard/estado-civil")}
            {renderSecondMenu(DoubleArrowIcon, "Estatus", "/dashboard/status-persona")}
            {renderSecondMenu(DoubleArrowIcon, "Sexo", "/dashboard/sexo")}
            {renderSecondMenu(DoubleArrowIcon, "Tipo Relacion", "/dashboard/relation-type")}
            {renderSecondMenu(DoubleArrowIcon, "Metodo de Pago", "/dashboard/payment-method")}
            {renderSecondMenu(DoubleArrowIcon, "Tipo de Tarjeta", "/dashboard/card-type")}
            {renderSecondMenu(DoubleArrowIcon, "Tipo de Accion", "/dashboard/share-type")}
            {renderSecondMenu(DoubleArrowIcon, "Parametros", "/dashboard/parameter")}
            {renderSecondMenu(DoubleArrowIcon, "Locker", "/dashboard/locker")}
            {renderSecondMenu(DoubleArrowIcon, "Tipos de transacion", "/dashboard/transaction-type")}
          </List>
        </Collapse>

        <ListItem button onClick={() => handleClick(2)}>
          <ListItemIcon >
            <IconLibraryBooks />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
          {open2 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List dense>
            {renderSecondMenu(IconLibraryBooks, "General", "/dashboard/report-general")}
            {renderSecondMenu(IconLibraryBooks, "Acciones", "/dashboard/share-report")}
          </List>
        </Collapse>


        <ListItem button onClick={() => handleClick(3)}>
          <ListItemIcon >
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Seguridad" />
          {open3 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List dense>
            {renderSecondMenu(PeopleIcon, "Roles", "/dashboard/role")}
            {renderSecondMenu(LockIcon, "Permisos", "/dashboard/permission")}
          </List>
        </Collapse>


        <ListItem button onClick={() => handleClick(4)}>
          <ListItemIcon >
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText primary="Acceso" />
          {open4 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List dense>
            <ListItem button>
              <ListItemIcon>
                <CenterFocusWeakIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Control de Acceso"}
                onClick={() => handleAccessControl()}
              />
            </ListItem>
            {renderSecondMenu(DoubleArrowIcon, "Ubicaciones", "/dashboard/location")}
            {renderSecondMenu(DoubleArrowIcon, "Invitados", "/dashboard/guest")}
            <ListItem button onClick={() => handleClick(5)}>
              <ListItemIcon >
                <IconLibraryBooks />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
              {open5 ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={open5} timeout="auto" unmountOnExit>
              <List dense>
              {renderSecondMenu(IconLibraryBooks, "Control de Acceso", "/dashboard/access-control-report")}
              {renderSecondMenu(IconLibraryBooks, "Invitados", "/dashboard/guest")}
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Typography variant="h6" noWrap>
              Suite Gestion Clubes
            </Typography>
            <Typography variant="h6" noWrap>
              <Button variant="contained" onClick={() => handleLogout()}>
                Logout
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children && children}
      </main>
    </div>
  );
}
