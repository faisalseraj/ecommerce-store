// withContextProvider.tsx
import React from 'react';

const withContextProvider = (Provider: any) => (WrappedComponent: any) => {
  const WithProvider = (props: any) => {
    return (
      <Provider>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

  return WithProvider;
};

export default withContextProvider;