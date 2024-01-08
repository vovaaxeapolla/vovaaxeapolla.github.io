import LineData from '@console/Line/LineData';
import { About } from '@console/Modules/Help/About/About';
import Modules, { IModule } from '@console/Modules/Modules';
import { winsStore } from '@src/App';
import { ConsoleStore } from '@src/stores';

const help: IModule = {
  about: {
    fn: () => {
      return winsStore.setWindow(<About />, 'fullscreen');
    },
    description: 'О проекте',
    example: 'about',
    isExecutable: true,
  },
  help: {
    fn: ({ consoleStore }: { consoleStore: ConsoleStore }) => {
      const output = [
        LineData.ParseLines(
          <>
            <br></br>
            <span className="dyer-additional-gradient-1">┬ ┬┌─┐┬  ┌─┐ ┌─┐</span>
            <span className="dyer-additional-gradient-2">├─┤├┤ │  ├─┘  ┌┘</span>
            <span className="dyer-additional-gradient-3">┴ ┴└─┘┴─┘┴    o </span>
            <br></br>
          </>
        ),
      ];

      for (const i in Modules) {
        const fns = Object.entries(Modules[i]);

        output.push(
          LineData.ParseLines(
            <>
              <break className="dyer-accent">
                {i.toUpperCase()}
              </break>
              <br />
            </>
          )
        );
        output.push(...fns.map((f) => {
          const dots = '.'.repeat(20 - f[0].length);

          return LineData.ParseLines(
            <>
              <span>
                <span className="dyer-success">{f[0]}</span>
                <span className="dyer-utility">{dots}</span>
                {f[1].description}
                <span className="dyer-utility" onClick={() => consoleStore.setInputValue(f[1].example)}> | {f[1].example}</span>
              </span>
              <br />
            </>
          );
        }));
        output.push(
          LineData.ParseLines(
            <>
              <br />
            </>
          )
        );
      }

      return output.flat();
    },
    description: 'Возвращает список доступных команд;',
    example: 'help',
    isExecutable: true,
  },
};

export default help;
