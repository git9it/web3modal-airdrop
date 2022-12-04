import Header from './components/Header';
import Main from './components/Main';
import './App.css';
import { Web3Modal } from '@web3modal/react';
import { Web3Button } from '@web3modal/react';
import initWeb3Modal from './initWeb3Modal';
import {WagmiConfig} from 'wagmi';
const {ethereumClient, wagmiClient} = initWeb3Modal()


export default function App() {

  return (
    <WagmiConfig client={wagmiClient}>
      <div className="h-screen w-screen bg-[url('../public/img/wallpaper.jpg')]">
        <Header Web3Button={Web3Button} />
        <Main />
        <Web3Modal
          projectId="c68cdf13f3a77f0902d493dee999a1b9"
          theme="dark"
          accentColor="default"
          ethereumClient={ethereumClient}
        />
        <div className="container flex flex-col items-center px-3 pt-20 mx-auto space-y-5 break-all lg:text-xl"></div>
      </div>
    </WagmiConfig>
  );
}
