import React from 'react';

import { Server } from './Server';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { SERVERS_TEXT } from '../../constants';

export const Servers: React.FunctionComponent = () => {
  const servers = useSpec().servers();
  const config = useConfig();

  if (!Object.keys(servers).length) {
    return null;
  }

  return (
    <section
      id={`${CommonHelpers.getIdentifier('servers', config)}`}
      className="aui-mt-16"
    >
      <h2 className="2xl:aui-w-7/12 aui-text-3xl aui-font-light aui-mb-4 aui-px-8">
        {SERVERS_TEXT}
      </h2>
      <ul>
        {Object.entries(servers).map(([serverName, server]) => (
          <li
            className="aui-mb-4"
            key={serverName}
            id={`${CommonHelpers.getIdentifier(
              `server-${serverName}`,
              config,
            )}`}
          >
            <Server serverName={serverName} server={server} key={serverName} />
          </li>
        ))}
      </ul>
    </section>
  );
};
