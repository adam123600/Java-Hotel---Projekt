import React, { Component } from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
EventSettingsModel, ViewsDirective, ViewDirective} from '@syncfusion/ej2-react-schedule';
// in case to add apointments to empty scheduler we need to import EventSettingModel

import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'
export default class PersonalSchedule extends Component{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <ScheduleComponent currentView='Month'>
                <ViewsDirective>
                    
                    <ViewDirective option="Month" isSelected={true} ></ViewDirective>
                    <ViewDirective option="Week" firstDayOfWeek="1"></ViewDirective>
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
        )
    }
}