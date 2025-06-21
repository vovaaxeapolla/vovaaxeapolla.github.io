import LineData from '@console/Line/LineData';
import Modules, { IModule } from '@console/Modules/Modules';
import { ConsoleStore } from '@src/stores';

const help: IModule = {
  help: {
    fn: ({ consoleStore }: { consoleStore: ConsoleStore }) => {
      const output = [
        LineData.ParseLines(
          <>
            <br></br>
            <span className="dyer-additional-gradient-1">┬ ┬┌─┐┬  ┌─┐┌─┐</span>
            <span className="dyer-additional-gradient-2">├─┤├┤ │  ├─┘ ┌┘</span>
            <span className="dyer-additional-gradient-3">┴ ┴└─┘┴─┘┴   o </span>
            <br></br>
          </>
        ),
      ];

      Object.entries(Modules).forEach(([moduleName, module]) => {
        output.push(
          LineData.ParseLines(
            <>
              <span className="dyer-accent">{moduleName.toUpperCase()}</span>
              <br />
            </>
          )
        );

        Object.entries(module).forEach(([fnName, fnData]) => {
          const dots = '.'.repeat(20 - fnName.length);

          output.push(
            LineData.ParseLines(
              <>
                <span>
                  <span className="dyer-success">{fnName}</span>
                  <span className="dyer-utility">{dots}</span>
                  {fnData.description}
                  <span
                    className="dyer-utility"
                    onClick={() => consoleStore.setInputValue(fnData.example)}
                    style={{ cursor: 'pointer' }}
                  >
                    {' | '}
                    {fnData.example}
                  </span>
                </span>
                <br />
              </>
            )
          );
        });

        output.push(
          LineData.ParseLines(
            <>
              <br />
            </>
          )
        );
      });

      return output.flat();
    },
    description: 'Возвращает список доступных команд;',
    example: 'help',
    isExecutable: true,
  },
};

export default help;
