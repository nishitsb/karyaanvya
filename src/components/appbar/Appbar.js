import React, {useEffect, useState} from 'react'
import './Appbar.css'
import {AppBar, Grid, Toolbar, Button} from '@material-ui/core'
import {useSelector} from "react-redux";
import Aux from "../../hoc/Aux";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import AdbRoundedIcon from '@material-ui/icons/AdbRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const drawerWidth = 240;

const useStyles = (makeStyles(theme => ({
    button: {
        margin: 2,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: "white",
            color: "purple",
            fontWeight: "bold"
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    hiNameInDrawer: {
        display: "inline-block",
        position: "relative",
        top: 1,
        marginLeft: 5
    },
    leftIcon: {
        color:"white",
        // position: "relative",
        // top: 7
    }
})))

const Appbar = (props) => {

    const classes = useStyles()
    const theme = useTheme()

    const isAuthenticated = useSelector(state => state.auth.tokenId !== null)
    const name = useSelector(state => state.register.name)
    const isSubmitting = useSelector(state => state.tl.isSubmitting)

    const [open, setOpen] = useState(false);
    const [tempName, setTempName] = useState("Bug")

    useEffect(() => {
        if (name !== null) {
            setTempName(name)
        } else {
            setTempName("Bug")
        }
    }, [name])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const dashboardClickHandler = () => {
        props.history.push('/dashboard')
    }

    const onLogoClickHandler = () => {
        props.history.push('/')
    }

    const loginClickHandler = () => {
        if (!isAuthenticated) {
            props.history.push('/signin')
        }
    }

    const loginLogoutClickHandler = () => {
        if (!isAuthenticated) {
            props.history.push('/signin')
        } else {
            props.history.push('/logout')
        }
    }

    const homeClickHandler = () => {
        props.history.push('/')
    }

    const myCalendarClickHandler = () => {
        props.history.push('/')
    }

    let authIcon = <AdbRoundedIcon/>
    if (isAuthenticated) {
        authIcon = <AccountCircleRoundedIcon/>
    }

    return (
        <Aux>
            <AppBar position='static'>
                <Toolbar>
                    <Grid container justify={"space-between"}>
                        <Grid item>
                            <Button
                                className={classes.button}
                                onClick={onLogoClickHandler}
                                style={{cursor: "default"}}
                                color={"inherit"}
                                disableRipple>
                                Karyaanvya
                            </Button>
                        </Grid>
                        <Grid item>
                            <div className={"appbar-buttons"}>
                                <Button
                                    onClick={homeClickHandler}
                                    className={classes.button}
                                    color={"inherit"}>
                                    Home
                                </Button>
                                <Button
                                    onClick={homeClickHandler}
                                    className={classes.button}
                                    color={"inherit"}>
                                    My&nbsp;Calendar
                                </Button>
                                <Button
                                    onClick={dashboardClickHandler}
                                    className={classes.button}
                                    color={"inherit"}>
                                    Dashboard
                                </Button>
                                <Button
                                    className={classes.button}
                                    color={"inherit"}>
                                    Analysis
                                </Button>
                                <Button
                                    className={classes.button}
                                    color={"inherit"}>
                                    Contact&nbsp;Us
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    className={classes.button}
                                    onClick={loginLogoutClickHandler}
                                    color="inherit">
                                    {isAuthenticated ? "Logout" : "Login/Signup"}
                                </Button>
                            </div>
                            <div className={"appbar-drawer"}>
                                <Box>
                                    <Button
                                        onClick={loginClickHandler}
                                        disableRipple={isAuthenticated}
                                        color={"inherit"}
                                        style={isAuthenticated ? {cursor: "default"} : {cursor: "pointer"}}>
                                        {isAuthenticated ? `Hi, ${tempName}` : "Login"}
                                    </Button>
                                    <IconButton onClick={handleDrawerOpen}>
                                        <ChevronLeftIcon className={classes.leftIcon}/>
                                    </IconButton>
                                </Box>
                                <Drawer
                                    className={classes.drawer}
                                    variant="temporary"
                                    anchor="right"
                                    open={open}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <div className={classes.drawerHeader}>
                                        <Box>
                                            <IconButton onClick={handleDrawerClose}>
                                                {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                                            </IconButton>
                                            <Typography className={classes.hiNameInDrawer}>
                                                Hi,&nbsp;{tempName}
                                            </Typography>
                                        </Box>
                                    </div>
                                    <Divider/>
                                    <List>
                                        <ListItem button onClick={homeClickHandler}>
                                            <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
                                            <ListItemText primary={"Home"}/>
                                        </ListItem>
                                        <ListItem button onClick={myCalendarClickHandler}>
                                            <ListItemIcon><DateRangeRoundedIcon/></ListItemIcon>
                                            <ListItemText primary={"My Calendar"}/>
                                        </ListItem>
                                        <ListItem button onClick={dashboardClickHandler}>
                                            <ListItemIcon><DashboardRoundedIcon/></ListItemIcon>
                                            <ListItemText primary={"Dashboard"}/>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon><TimelineRoundedIcon/></ListItemIcon>
                                            <ListItemText primary={"Analysis"}/>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon><ContactSupportRoundedIcon/></ListItemIcon>
                                            <ListItemText primary={"Contact us"}/>
                                        </ListItem>
                                        <ListItem button onClick={loginLogoutClickHandler}>
                                            <ListItemIcon>{authIcon}</ListItemIcon>
                                            <ListItemText primary={isAuthenticated ? "Logout" : "Login/Signup"}/>
                                        </ListItem>
                                    </List>
                                </Drawer>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Aux>
    )
}

export default Appbar
