export class Model {
    static counter: number = 0;

    sliderId: string;
    handlerId: string;
    elem: JQuery;
    currentValue: number;
    arrValues: Array<number>;
    defaults: SliderOptions = {
        step: 1,
        isDiscrete: true
    };

    constructor(options?:SliderOptions) {
        for(let key in options) {
            this.defaults[key] = options[key];
        }
        this.currentValue = 0;
    }
}