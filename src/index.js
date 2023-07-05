import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReducerHotelProvider from './hooks/context/reducer';
import AuthuserProvider from './hooks/context/authuser';
import RoomsProvider from './hooks/context/room';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <ReducerHotelProvider>
    <AuthuserProvider>
      <RoomsProvider>
      <App />
      </RoomsProvider>
     
    </AuthuserProvider>
    </ReducerHotelProvider>
  

    
  </React.StrictMode>
);
