import { RaiseMessage } from "./interfaces/observer_interface";

export class Model {
    static counter: number = 0;

    observers: any;

    sliderId: string;
    handlerId: string;
    leftHandlerId: string;
    rightHandlerId: string;

    elem: JQuery;
    leftHandler: JQuery;
    rightHandler: JQuery;
    range: JQuery;

    currentPercentage: number;
    currentPercentageLeft: number;
    currentPercentageRight: number;

    currentValue: number;
    discreteValue: number;
    currentValueLeft: number;
    currentValueRight: number;

    arrValues: Array<number>;

    // Either step or discrete option is used
    defaults: SliderOptions = {
        step: 1,
        start: 0,
        end: 100,
        isDiscrete: false,
        range: false,
    };

    constructor(options?:SliderOptions) {
        for(let key in options) {
            this.defaults[key] = options[key];
        }
        this.currentPercentage = 0;
        this.currentValue = 0;

        this.observers = [];
    }

    // ************************************
    // Observer pattern subject-related methods
    // 

    addSub(sub: any) {
        this.observers.push(sub);
    }

    remSub(sub: any) {
        var index = this.observers.indexOf(sub);
        this.observers.splice(index, index);        
    }

    raise(data: RaiseMessage) {
        Array.prototype.forEach.call(this.observers, (sub: any) => {
            sub.recieve(data)
        })
    }

    //
    // ************************************
    //

    setCurrentValue(value: number) {
        this.currentValue = value;
        this.raise({message: "ValueChanged",
                    data: value});
    }

    setCurrentValueLeft(value: number) {
        this.currentValueLeft = value;
        this.raise({message: "ValueChangedLeft",
                    data: value});
    }

    setCurrentValueRight(value: number) {
        this.currentValueRight = value;
        this.raise({message: "ValueChangedRight",
                    data: value});
    }

    getCurrentValue(): number {
        return this.currentValue;
    }

    setCurrentPercentage(value: number) {
        this.currentPercentage = value;
        this.raise({message: "PercentageChanged",
                            data: value});
    }

    setCurrentPercentageLeft(value: number) {
        this.currentPercentageLeft = value;
        this.raise({message: "PercentageChanged",
                            data: value});
    }

    setCurrentPercentageRight(value: number) {
        this.currentPercentageRight = value;
        this.raise({message: "PercentageChanged",
                            data: value});
    }

    getHandlerOrientation(handler: JQuery): string {
        if (handler == this.leftHandler) {
            return "left";
        } else {
            return "right";
        }
    }

    getCurrentPercentage(): number {
        return this.currentPercentage;
    }

    setElement(e: JQuery) {
        this.elem = e;
    }

    getHandler() {
        return this.elem.children()
    }

    getDefaults(): SliderOptions {
        return this.defaults;
    }

}