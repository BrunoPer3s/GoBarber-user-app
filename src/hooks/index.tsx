import { FormProvider } from '@unform/core';
import React from 'react';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    {children}
  </AuthProvider> 
)

export default AppProvider;