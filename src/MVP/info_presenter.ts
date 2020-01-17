import { Model } from "./model";

class InfoPresenter {
    model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    addInfoLabel(handler: JQuery) {
        let info = '<div class="slider__handler-info" id='+'info_' + this.model.handlerId + '"></div>';
        handler.append(info);
    }
}