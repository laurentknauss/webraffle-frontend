'use client'; 

import { GraphClient } from '@graphprotocol/client-cli';
import { createContext, useContext } from 'react';

const client = new GraphClient({
  // Your Graph Protocol client configuration
});

const GraphContext = createContext(client);

export const useGraphClient = () => useContext(GraphContext);

const GraphProvider = ({ children }) => (
  <GraphContext.Provider value={client}>
    {children}
  </GraphContext.Provider>
);

export default GraphProvider;
