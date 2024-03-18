import React, { createContext, useContext } from 'react';

type Environment = {
    environment: string;
    apiUrl: string;
};

type EnvironmentProviderProps = {
    environment: string;
    apiUrl: string;
    children: React.ReactNode;
};

const EnvironmentContext = createContext<Environment | undefined>(undefined);

export const EnvironmentProvider: React.FC<EnvironmentProviderProps> = ({ environment, apiUrl, children }) => {
    return (
        <EnvironmentContext.Provider value={{ environment, apiUrl }}>
            {children}
        </EnvironmentContext.Provider>
    );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within a EnvironmentProvider');
  }
  return context;
};
