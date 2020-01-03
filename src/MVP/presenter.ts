import { Model } from "./model";
import { View } from "./view";

export class Presenter {
    private model: Model;
    private view: View;
    private handler: HTMLElement;

    constructor(m: Model, v: View) {
        Model.counter += 1;

        this.model = m;
        this.view = v;
        this.handler = <HTMLElement>document.querySelector(this.model.handlerId);
    }

    createSlider(elem: JQuery): void {
        this.model.sliderId = 'slider_' + Model.counter;
        this.model.handlerId = 'handler_' + Model.counter;
        
        this.view.buildSlider(elem, this.model.handlerId, this.model.sliderId);
        this.view.addEventListener(elem);

        this.model.elem = elem;
    }
}