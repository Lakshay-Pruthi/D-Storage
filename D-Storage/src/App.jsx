import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './Page/Main'
import Home from './Page/Home'
import Files from './Page/Files'
import File from './Page/File'
import About from './Page/About'

import Web3 from 'web3';
import { useEffect, useState } from 'react'
import DStorage from './contracts/DStorage.json'




function App() {
  require('dotenv').config();

  const provider = window.ethereum;

  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null);
  const [userAccount, setUserAccount] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(userAccount)



  // const web3 = new Web3('HTTP://127.0.0.1:7545');
  if (provider) {
    // WEB3 PROVIDER

    useEffect(() => {
      function loadWeb3() {
        setWeb3(new Web3(provider));
        ethereum.request({ method: 'eth_requestAccounts' });
      }

      provider && loadWeb3();
    }, [provider]);

  }


  useEffect(() => {
    async function loadContract() {
      const contract = new web3.eth.Contract(DStorage.abi, '0xd75822C744B60CbE1B0bEb93F019F0b95F015A03');
      setContract(contract);
    }
    web3 && loadContract();
  }, [web3])


  useEffect(() => {
    async function loadAccount() {
      const acc = await web3.eth.getAccounts();
      setUserAccount(acc[0]);
      setSelectedAccount(acc[0])
    }
    web3 && loadAccount();
  }, [web3, userAccount])

  ethereum.on("accountsChanged", () => {
    window.location.reload()
  });

  ethereum.on('chainChanged', (_chainId) => window.location.reload());


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} >
          <Route index element={<Home web3={web3} Contract={contract} userAccount={userAccount} setSelectedAccount={setSelectedAccount} />} />
          <Route path='Files' element={<Files web3={web3} Contract={contract} userAccount={userAccount} selectedAccount={selectedAccount} />} />
          <Route path='File/:index' element={<File web3={web3} Contract={contract} userAccount={userAccount} selectedAccount={selectedAccount} />} />
          <Route path='About' element={<About web3={web3} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
