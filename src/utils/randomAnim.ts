export function randomAnim(
    str: string,
    callback: (currentChar: string, progress: number) => void,
    options: {
        speed?: number;
        randomChars?: string;
        randomizeProbability?: number;
    } = {}
) {
    const {
        speed = 300,
        randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
        randomizeProbability = 0.7
    } = options;

    const letters = str.split('');
    let currentIndex = 0;
    let currentText = '';

    const animate = () => {
        if (currentIndex >= letters.length) return;

        let displayText = currentText;
        for (let i = currentIndex; i < letters.length; i++) {
            if (Math.random() < randomizeProbability || i === currentIndex) {
                displayText += randomChars[Math.floor(Math.random() * randomChars.length)];
            } else {
                displayText += letters[i];
            }
        }

        callback(displayText, currentIndex / letters.length);

        if (Math.random() > 0.5 || currentIndex === letters.length - 1) {
            currentText += letters[currentIndex];
            currentIndex++;
        }

        setTimeout(animate, speed);
    };

    animate();
}