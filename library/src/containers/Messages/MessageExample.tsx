import React, { useState } from 'react';
import { Message, Schema } from '@asyncapi/parser';

import { CollapseButton, JSONSnippet } from '../../components';
import { MessageHelpers } from '../../helpers/message';
import { MessageExample as MessageExampleType } from '../../types';

interface Props {
  message: Message;
}

export const MessageExample: React.FunctionComponent<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  const payload = message.payload();
  const headers = message.headers();

  return (
    <div className="aui-bg-gray-800 aui-px-8 aui-py-4 aui-mt-4 aui--mx-8 2xl:aui-mx-0 2xl:aui-px-4 2xl:aui-rounded examples">
      <h4 className="text-white text-lg">Examples</h4>
      {payload && (
        <Example
          type="Payload"
          schema={payload}
          examples={MessageHelpers.getPayloadExamples(message)}
        />
      )}
      {headers && (
        <Example
          type="Headers"
          schema={headers}
          examples={MessageHelpers.getHeadersExamples(message)}
        />
      )}
    </div>
  );
};

interface ExampleProps {
  type: 'Payload' | 'Headers';
  schema: Schema;
  examples?: MessageExampleType[];
}

export const Example: React.FunctionComponent<ExampleProps> = ({
  type = 'Payload',
  schema,
  examples = [],
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="aui-mt-4">
      <div>
        <CollapseButton
          onClick={() => setExpand(prev => !prev)}
          chevronProps={{
            className: `aui-fill-current aui-text-gray-200 ${
              expand ? 'aui--rotate-180' : 'aui--rotate-90'
            }`,
          }}
        >
          <span className="aui-px-2 aui-py-1 aui-mr-2 aui-text-gray-200 aui-text-sm aui-border aui-rounded focus:aui-outline-none">
            {type}
          </span>
        </CollapseButton>
      </div>
      <div className={expand ? 'aui-block' : 'aui-hidden'}>
        {examples && examples.length > 0 ? (
          <ul>
            {examples.map((example, idx) => (
              <li className="aui-mt-4" key={idx}>
                <h5 className="aui-text-xs aui-font-bold aui-text-gray-500">
                  {example.name
                    ? `#${idx + 1} Example - ${example.name}`
                    : `#${idx + 1} Example`}
                </h5>
                {example.summary && (
                  <p className="aui-text-xs aui-font-bold aui-text-gray-500">
                    {example.summary}
                  </p>
                )}
                <div className="aui-mt-1">
                  <JSONSnippet
                    snippet={MessageHelpers.sanitizeExample(example.example)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="aui-mt-4">
            <JSONSnippet
              snippet={MessageHelpers.generateExample(schema.json())}
            />
            <h6 className="aui-text-xs aui-font-bold aui-text-gray-600 aui-italic aui-mt-2">
              This example has been generated automatically.
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};
