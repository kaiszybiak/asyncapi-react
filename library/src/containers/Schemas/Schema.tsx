import React from 'react';
import { Schema as SchemaType } from '@asyncapi/parser';

import { Schema as SchemaComponent } from '../../components';

interface Props {
  schemaName: string;
  schema: SchemaType;
}

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
}) => {
  if (!schema) {
    return null;
  }

  return (
    <div>
      <div className="panel-item--center aui-px-8">
        <div className="aui-shadow aui-rounded aui-px-4 aui-py-2 aui-border aui-bg-gray-200">
          <SchemaComponent schemaName={schemaName} schema={schema} />
        </div>
      </div>

      <div className="aui-w-full aui-mt-4" />
    </div>
  );
};
