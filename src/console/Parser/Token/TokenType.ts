export default class TokenType {
    public name: string;
    public regexp: RegExp | string;
    constructor(name: string, regexp: RegExp | string) {
        this.name = name;
        this.regexp = regexp;
    }
}
