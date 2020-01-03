export class Model {
    static counter: number = 0;

    sliderId: string;
    handlerId: string;
    elem: JQuery;

    defaults: SliderOptions = {
        step: 1
    };

    constructor(options?:SliderOptions) {
        for(let key in options) {
            this.defaults[key] = options[key];
        }
    }
}