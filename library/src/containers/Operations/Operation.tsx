import React from 'react';
import { Channel, Operation as OperationType } from '@asyncapi/parser';

import { Message } from '../Messages/Message';
import {
  Href,
  Markdown,
  Schema,
  Bindings,
  Tags,
  Extensions,
} from '../../components';

import { useConfig } from '../../contexts';
import { CommonHelpers, SchemaHelpers } from '../../helpers';
import { EXTERAL_DOCUMENTATION_TEXT } from '../../constants';
import { PayloadType } from '../../types';

interface Props {
  type: PayloadType;
  operation: OperationType;
  channelName: string;
  channel: Channel;
}

export const Operation: React.FunctionComponent<Props> = ({
  type = PayloadType.PUBLISH,
  operation,
  channelName,
  channel,
}) => {
  const config = useConfig();

  if (!operation || !channel) {
    return null;
  }

  const operationId = operation.id();
  const externalDocs = operation.externalDocs();
  // check typeof as fallback for older version than `2.2.0`
  const servers = typeof channel.servers === 'function' && channel.servers();

  const operationSummary = operation.summary();
  const parameters = SchemaHelpers.parametersToSchema(channel.parameters());

  return (
    <div>
      <div className="panel-item--center aui-px-8">
        <div className="aui-mb-4">
          <h3>
            <span
              className={`aui-font-mono aui-border aui-uppercase aui-p-1 aui-rounded aui-mr-2 ${
                type === PayloadType.PUBLISH
                  ? 'aui-border-blue-600 aui-text-blue-500'
                  : 'aui-border-green-600 aui-text-green-600'
              }`}
              title={type}
            >
              {type === PayloadType.PUBLISH ? 'PUB' : 'SUB'}
            </span>{' '}
            <span className="aui-font-mono aui-text-base">{channelName}</span>
          </h3>
        </div>

        {channel.hasDescription() && (
          <div className="aui-mt-2">
            <Markdown>{channel.description()}</Markdown>
          </div>
        )}
        {operationSummary && (
          <p className="aui-text-gray-600 aui-text-sm aui-mt-2">
            {operationSummary}
          </p>
        )}
        {operation.hasDescription() && (
          <div className="aui-mt-2">
            <Markdown>{operation.description()}</Markdown>
          </div>
        )}

        {externalDocs && (
          <ul className="aui-leading-normal aui-mt-2 aui-mb-4 aui-space-x-2 aui-space-y-2">
            {externalDocs && (
              <li className="aui-inline-block">
                <Href
                  className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                  href={externalDocs.url()}
                >
                  <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
                </Href>
              </li>
            )}
          </ul>
        )}

        {operationId && (
          <div className="aui-border aui-bg-gray-100 aui-rounded aui-px-4 aui-py-2 aui-mt-2">
            <div className="aui-text-sm aui-text-gray-700">
              Operation ID
              <span className="aui-border aui-text-orange-600 aui-rounded aui-text-xs aui-ml-2 aui-py-0 aui-px-2">
                {operationId}
              </span>
            </div>
          </div>
        )}

        {servers && servers.length > 0 ? (
          <div className="aui-mt-2 aui-text-sm">
            <p>Available only on servers:</p>
            <ul className="aui-flex aui-flex-wrap aui-leading-normal">
              {servers.map(server => (
                <li
                  className="aui-inline-block aui-mt-2 aui-mr-2"
                  key={server as string}
                >
                  <a
                    href={`#${CommonHelpers.getIdentifier(
                      'server-' + server,
                      config,
                    )}`}
                    className="aui-border aui-border-solid aui-border-blue-300 hover:aui-bg-blue-300 hover:aui-text-blue-600 aui-text-blue-500 aui-font-bold aui-no-underline aui-text-xs aui-rounded aui-px-3 aui-py-1 aui-cursor-pointer"
                  >
                    <span className="aui-underline">{server}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {parameters && (
          <div
            className="aui-mt-2"
            id={CommonHelpers.getIdentifier(
              `operation-${type}-${channelName}-parameters`,
              config,
            )}
          >
            <Schema
              schemaName="Parameters"
              schema={parameters}
              expanded={true}
            />
          </div>
        )}

        {channel.hasBindings() && (
          <div className="aui-mt-2">
            <Bindings
              name="Channel specific information"
              bindings={channel.bindings()}
            />
          </div>
        )}

        <Extensions name="Channel Extensions" item={channel} />

        {operation.hasBindings() && (
          <div className="aui-mt-2">
            <Bindings
              name="Operation specific information"
              bindings={operation.bindings()}
            />
          </div>
        )}

        <Extensions name="Operation Extensions" item={operation} />

        {operation.hasTags() && (
          <div className="aui-mt-2">
            <Tags tags={operation.tags()} />
          </div>
        )}
      </div>

      <div
        className="aui-w-full aui-mt-4"
        id={CommonHelpers.getIdentifier(
          `operation-${type}-${channelName}-message`,
          config,
        )}
      >
        {operation.hasMultipleMessages() ? (
          <div className="aui-mt-2">
            <p className="aui-px-8">
              Accepts <strong>one of</strong> the following messages:
            </p>
            <ul>
              {operation.messages().map((msg, idx) => (
                <li className="aui-mt-4" key={idx}>
                  <Message message={msg} index={idx} showExamples={true} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="aui-mt-2">
            <p className="aui-px-8">Accepts the following message:</p>
            <div className="aui-mt-2">
              <Message
                message={(operation.message as any)(0)}
                showExamples={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
