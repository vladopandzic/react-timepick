import * as React from 'react';
declare var require:any;
var ReactDOM = require("react-dom");
import * as _ from 'lodash'
import * as $ from 'jquery'; 
import * as TimePick from '../src/TimePicker';
export default class TimePickerExamples extends React.Component<ITimePickerExamplesProps, ITimePickerExamplesState>{

    constructor(props:ITimePickerExamplesProps){
            super(props);
            this.onTimeChange=this.onTimeChange.bind(this);
    }
     onTimeChange(newTime){

     }
    render(){
        return (
                <div style={{width:"20%"}}>
                    <TimePick.TimePicker minuteStep={15} time={"12:20"} onTimeChange={this.onTimeChange} id="timePicker1" />
               </div>

        )

    }

}
interface ITimePickerExamplesProps{


}
interface ITimePickerExamplesState{


}

$(document).ready(function () {
    ReactDOM.render(<TimePickerExamples />, document.getElementById('root'));
});