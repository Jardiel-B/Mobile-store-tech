import * as React from 'react';
import { Navegacao } from './src/navigations/index';
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from './src/config/firebase-config';

export default function App() {

  initializeApp(firebaseConfig)

  return (
    <Navegacao/>
  );
}