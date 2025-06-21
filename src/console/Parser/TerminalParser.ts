export interface Token {
    value: string;
    type: 'RAW' | 'SINGLE_QUOTED' | 'DOUBLE_QUOTED' | 'ESCAPED';
    quoteChar: "'" | '"' | null;
    startPos: number;
    endPos: number;
    wasEscaped: boolean;
    isFlag?: boolean;
}

interface Command {
    command: string;
    flags: Record<string, string | boolean>;
    args: string[];
    original: string;
}

export default class TerminalParser {
    static tokenize(input: string): Token[] {
        if (!input) return [];

        const trimmedInput = input.trim();
        if (!trimmedInput) return [];

        const tokens: Token[] = [];
        let currentToken = '';
        let isQuoted = false;
        let quoteChar: "'" | '"' | null = null;
        let escapeNext = false;
        let startPos = 0;
        let currentPos = 0;
        let wasEscaped = false;

        const pushToken = () => {
            if (currentToken) {
                tokens.push({
                    value: currentToken,
                    type: isQuoted
                        ? quoteChar === "'" ? 'SINGLE_QUOTED' : 'DOUBLE_QUOTED'
                        : 'RAW',
                    quoteChar,
                    startPos,
                    endPos: currentPos - 1,
                    wasEscaped,
                    isFlag: !isQuoted && (currentToken.startsWith('-') || currentToken.startsWith('--'))
                });
                currentToken = '';
                wasEscaped = false;
            }
        };

        for (const char of trimmedInput) {
            if (escapeNext) {
                currentToken += char;
                wasEscaped = true;
                escapeNext = false;
                currentPos++;
                continue;
            }

            if (char === '\\') {
                escapeNext = true;
                currentPos++;
                continue;
            }

            if (isQuoted) {
                if (char === quoteChar) {
                    pushToken();
                    isQuoted = false;
                    quoteChar = null;
                    currentPos++;
                    continue;
                }

                currentToken += char;
                currentPos++;
                continue;
            }

            if (char === ' ') {
                pushToken();
                startPos = currentPos + 1;
                currentPos++;
                continue;
            }

            if (char === '"' || char === "'") {
                pushToken();
                isQuoted = true;
                quoteChar = char;
                startPos = currentPos;
                currentPos++;
                continue;
            }

            currentToken += char;
            currentPos++;
        }

        pushToken();

        return tokens;
    }

    static parse(input: string): Command {
        const tokens = TerminalParser.tokenize(input);
        const command: Command = {
            command: tokens[0].value,
            args: [],
            flags: {},
            original: input,
        };

        for (let i = 1; i < tokens.length; i++) {
            const token = tokens[i];

            if (token.isFlag) {
                if (token.value.includes('=')) {
                    const [flag, value] = token.value.split('=');
                    command.flags[flag] = value;
                } else if (i + 1 < tokens.length && !tokens[i + 1].isFlag) {
                    command.flags[token.value] = tokens[i + 1].value;
                    i++;
                } else {
                    command.flags[token.value] = true;
                }
            } else {
                command.args.push(token.value);
            }
        }

        return command;
    }
}