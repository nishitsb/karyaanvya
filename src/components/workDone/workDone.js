import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        backgroundColor: theme.palette.background.paper,
    },
    done: {
        color: "green"
    },
    notDone: {
        color: "red"
    },
}));

const hasTarget = (targetAchievedList, target) => {
    for (let i = 0; i < targetAchievedList.length; i++) {
        if (targetAchievedList[i] === target) {
            return true
        }
    }
    return false
}

const getMeLists = list => {
    let targetsAchievedList = []
    let temporaryList1 = []
    list.map(t => {
        if (t.checked) {
            targetsAchievedList.push(t.value)
        } else {
            temporaryList1.push(t.value)
        }
        return 0
    })

    let temporaryList2 = []
    temporaryList1.map(t => {
        if (!hasTarget(targetsAchievedList, t)) {
            temporaryList2.push(t)
        }
        return 0
    })

    const targetsNotAchievedList = Array.from(new Set(temporaryList2))

    return [targetsAchievedList, targetsNotAchievedList]

}

const WorkDone = () => {

    const classes  = useStyles()

    const monthlyDateData = useSelector(state => state.cal.monthlyDateData)

    const [monthlyAchievedTargets, setMonthlyAchievedTargets] = useState([])
    const [monthlyNotAchievedTargets, setMonthlyNotAchievedTargets] = useState([])
    const [openCollapse, setOpenCollapse] = useState(false)

    useEffect(() => {
        let list = []
        const listKey = Object.keys(monthlyDateData)
        listKey.map(d => {
            if (monthlyDateData[d]) {
                const form = Object.values(Object.values(monthlyDateData[d])[0])[0]
                list = [...list, ...form]
            }
            return 0
        })
        const [targetsAchievedList, targetsNotAchievedList] = getMeLists(list)

        setMonthlyAchievedTargets(targetsAchievedList)
        setMonthlyNotAchievedTargets(targetsNotAchievedList)

    }, [setMonthlyNotAchievedTargets, setMonthlyAchievedTargets])

    const collapseClickHandler = () => {
        setOpenCollapse(prevState => !prevState)
    }

    return(
        <Box align={"center"}>
            <List
                component="nav"
                className={classes.root}>
                <ListItem button onClick={collapseClickHandler}>
                    <ListItemText primary="Monthly work done"/>
                    {openCollapse ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={openCollapse} timeout={"auto"} unmountOnExit>
                    <Grid container justify={"space-between"}>
                        <Grid item>
                            <List>
                                {monthlyAchievedTargets.map(t => (
                                    <ListItem key={t}>
                                        <ListItemIcon>
                                            <DoneAllRoundedIcon className={classes.done}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {t}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item>
                            {monthlyNotAchievedTargets.map(t => (
                                <ListItem key={t}>
                                    <ListItemIcon>
                                        <ErrorOutlineRoundedIcon className={classes.notDone}/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {t}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </Grid>
                    </Grid>
                </Collapse>
            </List>
        </Box>
    )
}

export default WorkDone
