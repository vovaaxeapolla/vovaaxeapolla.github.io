import { IModule } from "../Modules";
import Snake from "./Snake/Snake";
import TicTacToe from "./TicTacToe/TicTacToe";
import { winsStore } from "@src/App";

const Games: IModule = {
    Snake: {
        fn: async () => {
            winsStore.setWindow(<Snake />, "fullscreen");
        },
        description: 'Запускает игру',
        example: 'Snake',
        isExecutable: true
    },

    TicTacToe: {
        fn: async () => {
            winsStore.setWindow(<TicTacToe />, "fullscreen");
        },
        description: 'Запускает игру',
        example: 'TicTacToe',
        isExecutable: true
    },
}

export default Games;


