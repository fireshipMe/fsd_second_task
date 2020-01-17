import * as $ from 'jquery';
import { Model } from "./model";
import { View } from "./slider_view";
import { RaiseMessage } from "./interfaces/observer_interface";

export class Presenter {
    model: Model;
    view: View;

    handler: HTMLElement;
    id: number;

    constructor(m: Model, v: View) {

        this.model = m;
        this.view = v;


        this.handler = <HTMLElement>document.querySelector(this.model.handlerId);

        this.view.addSub(this);
        this.model.addSub(this);

        this.model.arrValues = this.generateDiscrete();

        this.id = Model.counter;
    }

    // ***************************
    // Observer-related
    //

    recieve(data: RaiseMessage) {
        let message = data["message"];
        if(message == "mousedown") {
            this.onmousedown(data["event"]);
        }
        if(message == "RightHandlerMousedown") {
            this.onmousedownRange(data["event"], this.model.rightHandler);
        }
        if(message == "LeftHandlerMousedown") {
            this.onmousedownRange(data["event"], this.model.leftHandler);
        }

        if(message == "ValueChanged") {
            this.update(data["data"]);
        }
    }

    //
    // ***************************
    //

    createSlider(elem: JQuery): void {
        this.model.sliderId = 'slider_' + Model.counter;
        this.model.handlerId = 'handler_' + Model.counter;

        let handler = '<div class="slider__handler" id="' + this.model.handlerId + '"></div>';

        elem.addClass("slider");
        elem.attr("id", this.model.sliderId);
        elem.append(handler);

        this.view.addEventListener(elem);
        this.model.setElement(elem);
    }

    createRangeSlider(elem: JQuery) {
        this.model.sliderId = 'slider_' + Model.counter;
        this.model.handlerId = 'handler_' + Model.counter;

        let leftHandler = '<div class="slider__handler" id="' + 'left_' + this.model.handlerId + '"></div>';
        let rightHandler = '<div class="slider__handler" id="' + 'right_' + this.model.handlerId + '"></div>';
        let range = '<div class="slider__range" id="range_' + this.id + '"></div>'
        elem.addClass("slider");
        elem.attr("id", this.model.sliderId);
        elem.append(leftHandler);
        elem.append(rightHandler);
        elem.append(range);

        this.model.leftHandler = $(elem.children()[0]);
        this.model.rightHandler = $(elem.children()[1]);
        this.model.range = $(elem.children()[2]);

        this.view.addEventListenerRange(this.model.leftHandler, this.model.rightHandler);
        this.model.setElement(elem);

        this.setHandlerPosition(this.model.rightHandler, '16px');
    }

    // Moving handler
    onmousedown(e: any) {
        e.preventDefault();

        let that = this;

        let shiftX = e.clientX - that.model.elem.children().position().left;

        function moveAt(pageX: number) {
            if((pageX - shiftX) > -1 && (pageX - shiftX ) < 266) {
                let handler = that.model.getHandler();

                //that.model.setCurrentPercentage(that.posToPercentage(handler));
                that.model.setCurrentPercentage((pageX - shiftX)/265);
                let currentPercentage = that.model.getCurrentPercentage();
                // getter isn't working somewhy
                if(currentPercentage >= 1.0) {
                    that.model.setCurrentPercentage(1);
                } 
                if(currentPercentage < 0.035) {
                    that.model.setCurrentPercentage(0);
                } 
                //that.model.computationalValue = ((that.model.currentPercentage * ((that.model.defaults.end - that.model.defaults.start) + that.model.defaults.start)));
                that.model.setCurrentValue((that.model.currentPercentage * ((that.model.defaults.end - that.model.defaults.start) + that.model.defaults.start)));
                handler.css("left",  pageX - shiftX + 'px');
                //floating dolboeb
                //that.model.elem.children().children().html(<string><unknown>that.model.currentValue);

                if(that.model.defaults.isDiscrete) {
                    handler.css("left",
                                 that.model.arrValues[Math.ceil(that.model.currentValue/that.model.defaults.step)] + 'px');
                                 that.model.discreteValue = that.model.arrValues[Math.ceil(that.model.currentValue/that.model.defaults.step)]*that.model.defaults.end/265;
                }
            }
        }
        function onMouseMove(e: any) {
            moveAt(e.pageX);
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    onmousedownRange(e: any, handler: JQuery) {
        e.preventDefault();

        let that = this;

        let shiftX = e.clientX - handler.position().left;
        function moveAt(pageX: number) {
            if((pageX - shiftX) > -1 && (pageX - shiftX ) < 266) {
                let orientation = that.model.getHandlerOrientation(handler);
                //let percentage = that.posToPercentage(handler);
                let percentage = (pageX - shiftX)/265;
                
                if(percentage < 0.04) {
                    percentage = 0;
                } 
                if(percentage >= 1) {
                    percentage = 1;
                }
                if(orientation == "left") {
                    that.model.setCurrentPercentageLeft(percentage);
                    that.model.setCurrentValueLeft(Math.round(percentage * (that.model.defaults.end - that.model.defaults.start) + that.model.defaults.start));
                } else {
                    that.model.setCurrentPercentageRight(percentage);
                    that.model.setCurrentValueRight(Math.round(percentage * (that.model.defaults.end - that.model.defaults.start) + that.model.defaults.start));
                }
                handler.css("left",  pageX - shiftX + 'px');
                if(that.model.defaults.isDiscrete) {
                    if(orientation == "left") {
                        handler.css("left",
                                 that.model.arrValues[Math.ceil(that.model.currentValueLeft/that.model.defaults.step)] + 'px');
                                 that.model.discreteValue = that.model.arrValues[Math.ceil(that.model.currentValueLeft/that.model.defaults.step)]*that.model.defaults.end/265;
                    } else {
                        handler.css("left",
                                that.model.arrValues[Math.ceil(that.model.currentValueRight/that.model.defaults.step)] + 'px');
                                that.model.discreteValue = that.model.arrValues[Math.ceil(that.model.currentValueRight/that.model.defaults.step)]*that.model.defaults.end/265;  
                    }
                    
                }
                if(that.model.leftHandler.offset().left < that.model.rightHandler.offset().left) {
                    // left is left left
                    that.model.range.css("left", that.model.leftHandler.css("left"));
                } else {
                    that.model.range.css("left", that.model.rightHandler.css("left"));
                }

                let newWidth = Math.abs(that.model.rightHandler.offset().left - that.model.leftHandler.offset().left)+6;
                that.model.range.css("width", newWidth)
            }
        }

        function onMouseMove(e: any) {
            moveAt(e.pageX);
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    //**
    //  Use to get percentage
    //*

    posToPercentage(handler: JQuery): number {
        //let handler = document.getElementById(this.model.handlerId);
        let container = document.getElementById(this.model.sliderId);
        return (((handler.offset().left+6)/container.clientWidth)*100)/100;
    }

    setHandlerPosition(handler: JQuery, pos: string) {
        handler.css("left",  pos);
    }

   generateDiscrete(): Array<number> {
        let steps = ((this.model.defaults.end-this.model.defaults.start)/this.model.defaults.step);
        return Array.from(Array(steps+1).keys(), x => x*265/steps);
    }

    update(value: number) {
        if(value <= this.model.defaults.start) {
            value = this.model.defaults.start;
        }
        if(value >= this.model.defaults.end) {
            value = this.model.defaults.end;
        }
        // get percentage of desired value
        let percentage = value/this.model.defaults.end;
        let position = 266*percentage; 
        this.setHandlerPosition(this.model.getHandler(), position+'px');
    }
}