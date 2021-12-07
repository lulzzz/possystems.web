import React, { createElement } from 'react';

describe('JSX', () => {
  it('call React.createElement', () => {
    const createElementSpy = jest.spyOn(React, 'createElement');
    <h1>Hello, JSX</h1>;
    expect(createElementSpy).toHaveBeenCalledWith('h1', null, 'Hello, JSX');
  });
});
