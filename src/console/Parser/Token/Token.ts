import TokenType from "./TokenType";

export default class Token {
    public type: TokenType;
    public text: string;
    constructor(type: TokenType, text: string) {
        this.type = type;
        this.text = text;
    }
}