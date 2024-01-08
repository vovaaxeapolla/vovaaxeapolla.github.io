import { winsStore } from "@src/App";
import { IModule } from "../Modules";
import HandwritingDigits from "./HandwritingDigits/HandwritingDigits";

const Games: IModule = {
    HandwritingDigits: {
        fn: async () => {
            winsStore.setWindow(<HandwritingDigits />, "fullscreen");
        },
        description: 'test',
        example: 'test',
        isExecutable: true
    },
}

export default Games;


