interface SliderOptions {
    [index: string]: any
    step?: number
    end?: number
    start?: number
    range?: boolean
}

interface JQuery {
    slider(options?: SliderOptions): JQuery
}
