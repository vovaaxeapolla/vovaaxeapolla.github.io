import { makeAutoObservable } from 'mobx';
import React from 'react';

import { LineType } from '@src/types';

export default class LineData {
  public type: LineType;
  public children: string | JSX.Element | undefined;
  public props: any;

  constructor(type: LineType, children?: string | JSX.Element, props?: any) {
    makeAutoObservable(this);
    this.children = children;
    this.type = type;
    this.props = props;
  }

  public add(value: string) {
    if (typeof this.children === 'string') { this.children += value; } else { this.children = <>{this.children}{value}</>; }
  }

  public toString() {
    if (typeof this.children === 'string') return this.children?.toString();

    return 'LineData object';
  }

  static ParseLines = (tsx: JSX.Element) => {
    let tsxArray = [];

    if (!tsx) return [new LineData(LineType.ERROR, 'Передан пустой jsx')];

    if (tsx.type === React.Fragment || tsx.type === React.Suspense) {
      if (tsx.props.children) {
        if (typeof tsx.props.children === 'string' || !Array.isArray(tsx.props.children)) {
          tsxArray = [tsx.props.children] as React.ReactNode[];
        } else {
          tsxArray = tsx.props.children;
        }
      } else {
        return [new LineData(LineType.ERROR, 'Передан пустой jsx')];
      }
    } else {
      return [new LineData(LineType.ERROR, 'Передан не jsx')];
    }

    const lines: LineData[] = tsxArray.map((element: JSX.Element  ) => {
      switch (element.type) {
        case 'br':
          return new LineData(LineType.SPACE);

        case 'span':
          return new LineData(LineType.TEXT, <span className={element.props.className}>{element.props.children}</span>);

        case 'break':
          return new LineData(LineType.BREAK, element.props.children, element.props);

        case 'Suspense':
          return new LineData(LineType.TEXT, element);

        default:
          return new LineData(LineType.TEXT, element);
      }
    });

    return lines;
  };
}
