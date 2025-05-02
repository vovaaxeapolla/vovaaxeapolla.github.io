import TokenType from '@console/parser/token/TokenType';

export default class Token {
    public type: TokenType;
    public text: string;
    constructor(type: TokenType, text: string) {
      this.type = type;
      this.text = text;
    }
}
