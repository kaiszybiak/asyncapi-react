import React from 'react';

import { Schema } from './Schema';

import { SchemaHelpers } from '../helpers';

interface Props {
  name?: string;
  bindings: any;
}

export const Bindings: React.FunctionComponent<Props> = ({
  name = 'Binding specific information',
  bindings,
}) => {
  if (!bindings || !Object.keys(bindings).length) {
    return null;
  }

  const renderedBindings = Object.entries(bindings).map(
    ([bindingName, binding]) => {
      const schema = SchemaHelpers.jsonToSchema(binding);
      const schemaName = (
        <div className="aui-inline-block aui-text-sm">
          <span>{name}</span>
          <span className="aui-bg-teal-500 aui-font-bold aui-no-underline aui-text-white aui-uppercase aui-rounded aui-mx-2 aui-px-2 aui-py-1 aui-text-xs">
            {bindingName}
          </span>
        </div>
      );
      return (
        <Schema schemaName={schemaName} schema={schema} key={bindingName} />
      );
    },
  );
  return <>{renderedBindings}</>;
};
