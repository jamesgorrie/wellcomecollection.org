import nunjucks from 'nunjucks';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as components from '../../common/views/components/Index';

export default class Component {
  constructor(env) {
    this.tags = ['componentJsx'];
    this.env = env;
  }

  parse(parser, nodes /* lexer */) {
    const token = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(token.value);

    return new nodes.CallExtension(this, 'run', args);
  };

  run(_/* context */, name, model = {}, children = []) {
    try {
      const childrenComponents = children
        .filter(_ => _)
        .map(c => {
          const modelWithKey = Object.assign({}, c.model, {key: c.name});

          return React.createElement(components[c.name], modelWithKey);
        });

      const Component = components[name];
      const modelWithChildren = Object.assign({}, model, {children: childrenComponents});
      const instantiatedComponent = React.createElement(Component, modelWithChildren);
      const html = ReactDOMServer.renderToString(instantiatedComponent);
      return new nunjucks.runtime.SafeString(html);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
};
