import * as $ from 'jquery'

export class View {

    static counter: number = 0;
    sliderId: string;
    handlerId: string;

    constructor() {
        View.counter += 1;
    }
    createSlider(elem: JQuery): void {
        this.sliderId = 'slider_' + View.counter;
        this.handlerId = 'handler_' + View.counter;
        
        let handler = '<div class="slider__handler" id="' + this.handlerId + '"></div>';

        elem.addClass("slider");
        elem.attr("id", this.sliderId);
        elem.append(handler);
    }
}