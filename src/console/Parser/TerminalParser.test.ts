import { describe, expect, it } from 'vitest';
import TerminalParser from '@console/Parser/TerminalParser';

describe('TerminalParser', () => {
    describe('TerminalParser.tokenize() additional tests', () => {
        it('should handle flag with equals sign', () => {
            const input = 'func --name=value';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({
                    value: '--name=value',
                    type: 'RAW',
                    isFlag: true
                })
            ]);
        });

        it('should handle escaped spaces', () => {
            const input = 'func some\\ string';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({
                    value: 'some string',
                    type: 'RAW',
                    wasEscaped: true
                })
            ]);
        });

        it('should handle newlines in quoted strings', () => {
            const input = 'func "hello\nworld"';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({
                    value: 'hello\nworld',
                    type: 'DOUBLE_QUOTED',
                    quoteChar: '"'
                })
            ]);
        });

        it('should handle dollar sign in quotes', () => {
            const input = 'func "$VAR"';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({
                    value: '$VAR',
                    type: 'DOUBLE_QUOTED',
                    quoteChar: '"'
                })
            ]);
        });
    });

    describe('TerminalParser.parse() additional tests', () => {
        it('should handle pipe operator', () => {
            const input = 'func1 | func2';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func1', type: 'RAW' }),
                expect.objectContaining({ value: '|', type: 'RAW' }),
                expect.objectContaining({ value: 'func2', type: 'RAW' })
            ]);
        });

        it('should handle redirection operators', () => {
            const input = 'func > output.txt';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({ value: '>', type: 'RAW' }),
                expect.objectContaining({ value: 'output.txt', type: 'RAW' })
            ]);
        });
    });

    describe('Edge cases', () => {
        it('should handle single character commands', () => {
            const input = 'a b c';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'a', type: 'RAW' }),
                expect.objectContaining({ value: 'b', type: 'RAW' }),
                expect.objectContaining({ value: 'c', type: 'RAW' })
            ]);
        });

        it('should handle unicode characters', () => {
            const input = 'func こんにちは "世界"';
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({ value: 'こんにちは', type: 'RAW' }),
                expect.objectContaining({
                    value: '世界',
                    type: 'DOUBLE_QUOTED',
                    quoteChar: '"'
                })
            ]);
        });

        it('should handle very long input', () => {
            const longString = 'a'.repeat(10000);
            const input = `func "${longString}"`;
            const result = TerminalParser.tokenize(input);
            expect(result).toEqual([
                expect.objectContaining({ value: 'func', type: 'RAW' }),
                expect.objectContaining({
                    value: longString,
                    type: 'DOUBLE_QUOTED',
                    quoteChar: '"'
                })
            ]);
        });
    });
})