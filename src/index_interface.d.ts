interface SliderOptions {
    [index: string]: any
    step?: number
    end?: number
    start?: number
}

interface JQuery {
    slider(options?: SliderOptions): JQuery
}
