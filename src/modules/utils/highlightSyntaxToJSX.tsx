import TerminalParser from "@src/console/Parser/TerminalParser";

export default function highlightSyntaxToJSX(input: string): JSX.Element {
    const tokens = TerminalParser.tokenize(input);
    return (
        <>
            {
                tokens.map((token, index) => {
                    let value = token.value;
                    let className = '';

                    if (token.isFlag) {
                        className = 'terminal-flag';
                    } else if (token.type === 'SINGLE_QUOTED') {
                        className = 'terminal-single-quoted';
                        value = `'${value}'`;
                    } else if (token.type === 'DOUBLE_QUOTED') {
                        className = 'terminal-double-quoted';
                        value = `"${value}"`;
                    } else if (token.wasEscaped) {
                        className = 'terminal-escaped';
                        value = `\\${value}`;
                    } else if (token === tokens[0]) {
                        className = 'terminal-command';
                    } else {
                        className = 'terminal-arg';
                    }

                    return (
                        <span key={index} className={className} >
                            {value}{' '}
                        </span>
                    );
                })
            }
        </>
    );
}