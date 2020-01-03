interface SliderOptions {
    [index: string]: any
    step?: number
}

interface JQuery {
    slider(options?: SliderOptions): JQuery
}
