export class LabelInputHtmlClass {
    containerClass: string = undefined;
    labelClass: string = undefined;
    inputClass: string = undefined;
    constructor(containerClass= 'field grid',labelClass = 'col-12 mb-2 md:col-4 md:mb-0', inputClass = 'col-12 md:col-8') {
        this.containerClass = containerClass;
        this.labelClass = labelClass;
        this.inputClass = inputClass;
    }
}
