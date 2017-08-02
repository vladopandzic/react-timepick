
import * as React from 'react';
declare var require: any
const ClickOutside =require("react-click-outside").default;

var ReactDOM = require("react-dom");
import * as _ from 'lodash'
export class TimePicker extends React.Component<ITimePickerProps, ITimePickerState>{

    divAutocompleteList: any;
    constructor(props: ITimePickerProps) {
        super(props);
        this.isValidTimeString = this.isValidTimeString.bind(this);
        this.onClickCurrentDate = this.onClickCurrentDate.bind(this);
        this.setResultsVisibility = this.setResultsVisibility.bind(this);
        this.populateTimeArrayToRender = this.populateTimeArrayToRender.bind(this);
        this.setHighlightedItem = this.setHighlightedItem.bind(this);
        this.onHoverItemWithMouse = this.onHoverItemWithMouse.bind(this);
        this.setSelectedWhenClickedOnItem = this.setSelectedWhenClickedOnItem.bind(this);
        this.focusHighlightedItem = this.focusHighlightedItem.bind(this);
        this.ifInAllowedPeriod = this.ifInAllowedPeriod.bind(this);
        this.getClassNameForItem = this.getClassNameForItem.bind(this);

        if (this.isValidTimeString(props.time) == false) {
            throw "Invalid time format. It should be in ##:## format";
        }


        var tor = this.populateTimeArrayToRender(props);
        this.state = {
            dropdownOpened: false,
            itemsToRender: tor,
            keyboardMode: false,
            time: props.time

        }
 
    }
    getClassNameForItem(item: TimePickerItem) {
      
        var className = "timepicker-item";
        if (item.disabled) {
            className += " timepicker-item-disabled";
        }
        if (this.state.highlightedItem != null && this.state.highlightedItem.time == item.time) {
            className += " timepicker-item-highlighted";
        }
        return className;
    }
    componentWillReceiveProps(nextProps: ITimePickerProps) {
      
        var tor = this.populateTimeArrayToRender(nextProps);
     
        this.setState({
            itemsToRender: tor,
            time: nextProps.time
        })
    }
    ifInAllowedPeriod(time,propsovi) {
        var allowed = false;
      
        if (propsovi.allowedIntervals == null) {
            return true;
        }
        _.each(propsovi.allowedIntervals, (allowedPeriod: TimeInterval) => {
            var hourOfIntervalFrom = allowedPeriod.from.split(":")[0];
            var minuteOfIntervalFrom = allowedPeriod.from.split(":")[1];
            var hourOfIntervalTo = allowedPeriod.to.split(":")[0];
            var minuteOfIntervalTo = allowedPeriod.to.split(":")[1];
            var hour = time.split(":")[0];
            var minute = time.split(":")[1];

            var secondsTimeWeAreChecking = parseInt(hour) * 3600 + parseInt(minute)*60;
            var secondsStart = parseInt(hourOfIntervalFrom) * 3600 + parseInt(minuteOfIntervalFrom)*60;
            var secondsEnd = parseInt(hourOfIntervalTo) * 3600 + parseInt(minuteOfIntervalTo)*60;

            if (secondsStart <= secondsTimeWeAreChecking && secondsTimeWeAreChecking <= secondsEnd) {
                allowed = true;
                return false;
            }
        });
        return allowed;
    }
    componentDidMount() {

        var a = this.refs;
    }
    focusHighlightedItem() {

        var refs: any = this.refs;
      
            var indexOfCurrentElement = _.indexOf(this.state.itemsToRender.map(i => i.time), this.state.time);
            var itemNode = refs["timepicker_" + this.props.id + "_" + indexOfCurrentElement];
            var autocompleteResultsNode = this.divAutocompleteList;

            var domNode = ReactDOM.findDOMNode(itemNode);
         
            if (domNode != null) {

                domNode.parentNode.scrollTop = domNode.offsetTop;
            }
        
    }
  
    setHighlightedItem(time: TimePickerItem) {

        var highlightedItem = _.find(this.state.itemsToRender, (_time) => { return _time.time == time.time });
        if (time.disabled == true) {
            return;
        }
        this.setState({
            highlightedItem: highlightedItem
        })
        //  this.focusHighlightedItem();

    }
    onHoverItemWithMouse(time: TimePickerItem) {

        if (this.state.keyboardMode == false) {
            this.setHighlightedItem(time);
        }
    }
    setSelectedWhenClickedOnItem(timeItem: TimePickerItem) {
        var selectedItem = _.find(this.state.itemsToRender, (t) => { return t.time == timeItem.time });
        if (timeItem.disabled == true) {
            return;
        }

        this.setState({
            time: selectedItem.time,
            dropdownOpened: false
        })
        this.props.onTimeChange(selectedItem.time);

    }
    populateTimeArrayToRender(propsovi) {
        var arrayToRender = [];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 60; j += this.props.minuteStep) {
                var timeString = ("0" + i).slice(-2).toString() + ":" + ("0" + j).slice(-2).toString();
                var disabled = !this.ifInAllowedPeriod(timeString, propsovi);
                var item: TimePickerItem = {
                    time: timeString,
                    disabled: disabled
                }

                if (this.props.hideNotAllowedPeriods == true && disabled) {

                } else {
                    arrayToRender.push(item);
                }

            }
        };
         
        return arrayToRender;
    }
    onClickCurrentDate(event) {
        event.preventDefault();

        this.setResultsVisibility(!this.state.dropdownOpened);
    }
    setResultsVisibility(newDropDownOpened) {

        this.setState({
            dropdownOpened: newDropDownOpened

        }, () => {
            if (newDropDownOpened == true) {
                this.focusHighlightedItem();
            }
        })

    }
    isValidTimeString(inputString) {
        var timeRegex = /([01]\d|2[0-3]):([0-5]\d)/;
        return timeRegex.test(inputString);
    }
    render() {
        return (
            <div>
                <ClickOutside onClickOutside={() => this.setResultsVisibility(false)}>
                    <div className="timepicker-selected-date-wrapper" onClick={this.onClickCurrentDate}>
                        <div className="timepicker-selected-date" >
                            {this.state.time}
                        </div>
                        {this.state.dropdownOpened == true ?
                            <div className="timepicker-opened" ref={(divAutocompleteList) => this.divAutocompleteList = divAutocompleteList}>
                                <div className="timepicker-current">
                                    
                                    {this.state.highlightedItem == null ? this.state.time : this.state.highlightedItem.time}

                                </div>
                                <div className="timepicker-results">
                                    <div className="timepicker-list">
                                        {this.state.itemsToRender.map((item: TimePickerItem, index) => {
                                            return (
                                                <div key={index} ref={"timepicker_" + this.props.id + "_" + index} className={this.getClassNameForItem(item)}
                                                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); this.setSelectedWhenClickedOnItem(item) }}
                                                    onMouseOver={() => this.onHoverItemWithMouse(item)}>
                                                    {item.time}
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            ""}
                    </div>
                </ClickOutside>
            </div>
        )
    }

}
interface ITimePickerProps {
    minuteStep?: number;
    allowedIntervals?: TimeInterval[];
    twelveHourMode?: false;
    hideNotAllowedPeriods?: boolean;
    time?: string;
    onTimeChange(newTime: string);
    id: string;


}
interface ITimePickerState {
    dropdownOpened?: boolean;
    itemsToRender?: TimePickerItem[];
    time?: string;
    keyboardMode?: boolean;
    highlightedItem?: TimePickerItem;
}


interface TimePickerItem {

    time: string;
    disabled: boolean
}
export interface TimeInterval {
    from: string;
    to: string;
}