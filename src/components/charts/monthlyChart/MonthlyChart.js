import React, {PureComponent} from 'react';
import './MonthlyChart.css'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';
import Legend from "recharts/lib/component/Legend";

class MonthlyChart extends PureComponent {
    render() {
        return (
            <div className={"monthly-chart-container"}>
                <AreaChart width={900} height={350} data={this.props.data}
                           margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f44336" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f44336" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#673ab7" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#673ab7" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Legend verticalAlign="top" height={30}/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="# of Targets set" stroke="#f44336" fillOpacity={1}
                          fill="url(#colorUv)"/>
                    <Area type="monotone" dataKey="# of Targets Achieved" stroke="#673ab7" fillOpacity={1}
                          fill="url(#colorPv)"/>
                </AreaChart>
            </div>
        );
    }
}

export default MonthlyChart
