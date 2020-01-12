import * as $ from 'jquery';
import { Model } from "./model";
import { View } from "./slider_view";
import { RaiseMessage } from "./interfaces/observer_interface";

export class Presenter {
    model: Model;
    view: View;

    handler: HTMLElement;

    constructor(m: Model, v: View) {
        Model.counter += 1;

        this.model = m;
        this.view = v;

        this.handler = <HTMLElement>document.querySelector(this.model.handlerId);

        this.view.addSub(this);

        this.model.arrValues = this.generateDiscrete();
    }

    // ***************************
    // Observer-related
    //

    recieve(data: RaiseMessage) {
        if(data["message"] == "mousedown") {
            this.onmousedown(data["event"]);
        }
    }

    //
    // ***************************
    //

    createSlider(elem: JQuery): void {
        this.model.sliderId = 'slider_' + Model.counter;
        this.model.handlerId = 'handler_' + Model.counter;
        
        this.buildSlider(elem, this.model.handlerId, this.model.sliderId);
        this.view.addEventListener(elem);

        this.model.elem = elem;


    }

    buildSlider(elem: JQuery, handlerId: string, sliderId: string) {
        let handler = '<div class="slider__handler" id="' + handlerId + '"></div>';
        let info = '<div class="slider__handler-info" id='+'info_' + handlerId + '"></div>';

        elem.addClass("slider");
        elem.attr("id", sliderId);
        elem.append(handler);
        elem.children().append(info)
    }

    // Moving handler
    onmousedown(e: any) {
        e.preventDefault();

        let that = this;

        let shiftX = e.clientX - that.model.elem.children().position().left;
        function moveAt(pageX: number) {
            if((pageX - shiftX) > -1 && (pageX - shiftX ) < 266) {
                that.model.currentPercentage = that.posToPercentage();

                if(that.model.currentPercentage >= 1.0) {
                    that.model.currentPercentage = 1;
                } 
                if(that.model.currentPercentage < 0) {
                    that.model.currentPercentage = 0;
                } 
                
                that.model.currentValue = Math.round(that.model.currentPercentage * (that.model.defaults.end - that.model.defaults.start) + that.model.defaults.start);
                that.model.elem.children().css("left",  pageX - shiftX + 'px');
                that.model.elem.children().children().html(<string><unknown>that.model.currentValue);
                if(that.model.defaults.isDiscrete) {
                that.model.elem.children().css("left",
                  that.model.arrValues[Math.ceil(that.posToPercentage()/that.model.defaults.step)] + 'px');
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

    //**
    //  Use to get percentage
    //*

    posToPercentage(): number {
        let handler = document.getElementById(this.model.handlerId);
        let container = document.getElementById(this.model.sliderId);
        return (((handler.offsetLeft+6)/container.clientWidth)*100)/100;
    }

    setHandlerPosition(pos: string) {
        this.model.elem.children().css("left",  pos);
    }

   generateDiscrete(): Array<number> {
        return Array.from(Array(this.model.defaults.step+1).keys(), x => x*265/this.model.defaults.step)
    }
}