import { makeAutoObservable } from 'mobx';
import React from 'react';

export default class LineData {
  public type: string;
  public children: string | JSX.Element | undefined;
  public props: unknown;

  constructor(type: string, children?: string | JSX.Element, props?: unknown) {
    makeAutoObservable(this);
    this.children = children;
    this.type = type;
    this.props = props;
  }

  public add(value: string) {
    if (typeof this.children === 'string') {
      this.children += value;
    } else {
      this.children = React.createElement(React.Fragment, null, this.children, value);
    }
  }

  public toString() {
    if (typeof this.children === 'string') return this.children?.toString();

    return 'LineData object';
  }

  static ParseLines = (tsx: JSX.Element) => {
    let tsxArray = [];

    if (!tsx) return [new LineData('error', 'Передан пустой jsx')];

    if (tsx.type === React.Fragment || tsx.type === React.Suspense) {
      if (tsx.props.children) {
        if (typeof tsx.props.children === 'string' || !Array.isArray(tsx.props.children)) {
          tsxArray = [tsx.props.children] as React.ReactNode[];
        } else {
          tsxArray = tsx.props.children;
        }
      } else {
        return [new LineData('error', 'Передан пустой jsx')];
      }
    } else {
      return [new LineData('error', 'Передан не jsx')];
    }

    const lines: LineData[] = tsxArray.map((element: JSX.Element) => {
      switch (element.type) {
        case 'br':
          return new LineData('space');

        case 'span':
          return new LineData('text', React.createElement('span', { className: element.props.className }, element.props.children));

        case 'break':
          return new LineData('break', element.props.children, element.props);

        case 'Suspense':
          return new LineData('text', element);

        default:
          return new LineData('text', element);
      }
    });

    return lines;
  };
}
