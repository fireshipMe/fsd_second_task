export class Model {
    private defaults = {
        start: 0,
        end: 100,
        step: 1,
        orientation: "horizontal",
        range: false,
    };

    constructor(
        private step?: number,
        private orientation?: string,
        private range?: boolean,
        private start?: number,
        private end?: number
    ) {
        this.defaults.step = step;
        this.defaults.orientation = orientation;
        this.defaults.range = range;
        this.defaults.start = start;
        this.defaults.end = end;
    }
}