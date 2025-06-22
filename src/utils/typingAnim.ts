export function typingAnim(str: string, callback: Function) {
    const letters = str.toString().split('');
    let delay = 500 / letters.length;
    letters.forEach((letter: string, i: number) => {
        setTimeout(() => callback(letter), i * delay);
    })
} 