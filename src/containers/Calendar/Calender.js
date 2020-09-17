import React from "react";
import MonthSelector from "../../components/monthSelector/MonthSelector";
import DatesAndDays from "../../components/datesAndDays/DatesAndDays";
import Aux from "../../hoc/Aux";
import AppBar from "../../components/appbar/Appbar";

const Calendar = (props) => {

    return (
        <Aux>
            <AppBar {...props}/>
            <MonthSelector/>
            <DatesAndDays {...props}/>
        </Aux>
    )
}

export default Calendar

