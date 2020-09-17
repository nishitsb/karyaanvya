import React, {useEffect, useState} from "react";
import Appbar from "../../components/appbar/Appbar";
import Aux from "../../hoc/Aux";
import MonthSelector from "../../components/monthSelector/MonthSelector";
import {useSelector} from "react-redux";
import SnackBar from "../../components/UI/snackBar/SnackBar";
import MonthlyChart from "../../components/charts/monthlyChart/MonthlyChart";
import MonthlyStats from "../../components/monthlyStats/monthlyStats";
// import WorkDone from "../../components/workDone/workDone";

const Dashboard = (props) => {

    const monthlyData = useSelector(state => state.cal.monthlyData)
    const daysInMonth = useSelector(state => state.cal.daysInMonth)
    const currentDate = useSelector(state => state.cal.currentDate)
    const currentMonth = useSelector(state => state.cal.currentMonth)
    const month = useSelector(state => state.cal.month)

    const [data, setData] = useState([])

    useEffect(() => {
        let localData = []

        for (let i = 0; i < daysInMonth + 1; i++) {
            let tempData = {
                "name": i,
                "# of Targets set": 0,
                "# of Targets Achieved": 0,
            }
            localData.push(tempData)
        }
        if (monthlyData.length) {
            monthlyData.map(d => {
                if (d.date !== currentDate) {
                    localData.splice(d.date, 1, {
                        "name": d.date,
                        "# of Targets set": d.noOfTargets,
                        "# of Targets Achieved": d.noOfTargetsAcheived,
                    })
                } else {
                    localData.splice(d.date, 1, {
                        "name": d.date,
                        "# of Targets set": `kaam toh krlo phle`,
                        "# of Targets Achieved": `kal dekhna`,
                    })
                }
                return 0
            })
        }
        if (month === currentMonth) {
            const currentLocalData = localData.slice(0, currentDate + 1)
            setData(currentLocalData)
        } else {
            setData(localData)
        }

    }, [monthlyData, setData, daysInMonth, currentMonth, currentDate, month])

    return (
        <Aux>
            <Appbar {...props}/>
            <MonthSelector/>
            <MonthlyChart data={data}/>
            <MonthlyStats/>
            {/*<WorkDone/>*/}
            <SnackBar/>
        </Aux>
    )
}

export default Dashboard
