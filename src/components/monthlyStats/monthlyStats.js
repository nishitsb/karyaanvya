import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

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
    statsPaper: {
        margin: 10,
        padding: 8
    }
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

const WeekViseReport = () => {

    const classes = useStyles();

    const monthlyDateData = useSelector(state => state.cal.monthlyDateData)
    const prevMonthDateData = useSelector(state => state.cal.prevMonthDateData)

    const [productivity, setProductivity] = useState(0)
    const [growthInNoOfTargetsSet, setGrowthInNoOfTargetsSet] = useState(0)
    const [growthInNoOfTargetsAchieved, setGrowthInNoOfTargetsAchieved] = useState(0)

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

        const prod = ((targetsAchievedList.length / (targetsAchievedList.length + targetsNotAchievedList.length)) * 100).toFixed(2)
        setProductivity(prod)

        let prevList = []
        const prevListKey = Object.keys(prevMonthDateData)
        prevListKey.map(d => {
            if (prevMonthDateData[d]) {
                const form = Object.values(Object.values(prevMonthDateData[d])[0])[0]
                prevList = [...prevList, ...form]
            }
            return 0
        })
        const [prevTargetsAchievedList, prevTargetsNotAchievedList] = getMeLists(prevList)

        const stat1 = ((((targetsAchievedList.length + targetsNotAchievedList.length)
            - (prevTargetsAchievedList.length + prevTargetsNotAchievedList.length))
            / (targetsAchievedList.length + targetsNotAchievedList.length)) * 100).toFixed(1)

        const stat2 = (((targetsAchievedList.length - prevTargetsAchievedList.length)
            / targetsAchievedList.length) * 100).toFixed(1)

        setGrowthInNoOfTargetsSet(stat1)
        setGrowthInNoOfTargetsAchieved(stat2)

    }, [monthlyDateData, prevMonthDateData, setProductivity])

    return (
        <Box my={5}>
            <Grid container justify={"space-evenly"}>
                <Grid item>
                    <Paper elevation={3} className={classes.statsPaper}>
                        <Typography>
                            Productivity: {productivity}%
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={3} className={classes.statsPaper}>
                        <Typography>
                            Growth in # of targets set: {growthInNoOfTargetsSet}%
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={3} className={classes.statsPaper}>
                        <Typography>
                            Growth in # of targets achieved: {growthInNoOfTargetsAchieved}%
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WeekViseReport
