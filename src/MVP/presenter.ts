import { Model } from "./model";
import { View } from "./view";
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

        elem.addClass("slider");
        elem.attr("id", sliderId);
        elem.append(handler);
    }

    onmousedown(e: any) {
        e.preventDefault();

        let that = this;

        let shiftX = e.clientX - that.model.elem.children().position().left;

        function moveAt(pageX: number) {
            if((pageX - shiftX) > 0 && (pageX - shiftX ) < 265) {
                that.model.elem.children().css("left",  pageX - shiftX + 'px');
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
}