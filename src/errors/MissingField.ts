export class MissingField extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "MissingField";
    }

}