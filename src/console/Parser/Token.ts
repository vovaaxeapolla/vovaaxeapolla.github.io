
export  class TokenType {
  public name: string;
  public regexp: RegExp | string;
  constructor(name: string, regexp: RegExp | string) {
    this.name = name;
    this.regexp = regexp;
  }
}

export  class Token {
    public type: TokenType;
    public text: string;
    constructor(type: TokenType, text: string) {
      this.type = type;
      this.text = text;
    }
}
