# react-timepick

<b>Demo: <a href="https://vladop.github.io/react-timepick/examples/index.html">https://vladop.github.io/react-timepick/examples/index.html</a> </b>


Get started by
  <code>npm i react-timepick</code>
  
  <b>Javascript:</b>
  
  
       const TimePick=require('react-timepick');
       const TimePicker=TimePick.TimePicker;
       const TimeInterval=TimePick.TimeInterval;
  
  or:
  
         import {TimePicker} from 'react-timepick'
         
  
  <code>TimeInterval</code> is just typescript interface for <code>allowedIntervals</code> prop
  
  <b>CSS</b>
  
  For default styling pull css from <code>dist</code> folder:
  
       <link rel="stylesheet" type="text/css" href="node_modules/react-timepick/dist/timepicker.css">                
   
   
  You can use it like this:
  

      render(){
       
           <TimePicker time={"12:20"} id="timePicker1" minuteStep={15} onTimeChange={this.onTimeChange}/>
           
       }    
       
  
  <b>Props</b>
  
  
|   Name         | Type           | Default          | Description                                | Optional
| ------------- |:--------------:| ----------------:| ------------------------------------------:| ---------:|
| id            | String         | <i>no-default</i>| Unique id for each datepicker              | <b>No</b> |
| time          | String         | <i>no-default</i>| Time for timePicker (<b>in hh:mm format</b>| <b>No</b> |
| onTimeChange  | Function({ newTime }) |           | Callback executed whenever times change    | <b>No</b> |
| minuteStep  | number |   <i>no-default</i>        | Step in minutes between two choices        | <b>No</b> |
