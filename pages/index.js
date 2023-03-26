import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
const web3 = require('@solana/web3.js');
const spl = require('@solana/spl-token')
import { TOKEN_PROGRAM_ID, getMint, createMint } from "@solana/spl-token";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const emptyState = {
    publicKey: '',
    amount: ''
  }
  const updateState = (e) => {
    setState({
      ...state,
      [e.target.placeholder]: e.target.value
    })
  }
  const [state, setState] = useState(emptyState)
  
const SendToken = async () => {
  console.log("Send Token")
  // Connect to cluster
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

  // connect to a previously generated wallet
  let secretKey = Uint8Array.from([34, 233, 184, 232, 222, 241, 38, 183, 33, 223, 136, 41, 235, 18, 12, 175, 232, 188, 173, 250, 151, 22, 218, 31, 10, 92, 106, 60, 167, 170, 42, 81, 12, 122, 153, 12, 133, 13, 28, 125, 170, 214, 246, 183, 110, 90, 66, 24, 217, 231, 129, 148, 155, 26, 215, 57, 14, 74, 96, 216, 164, 236, 213, 79])

  const myKeypair = web3.Keypair.fromSecretKey(secretKey);

  const fromWallet = myKeypair;


  // Generate a new wallet to receive newly minted token
  const destPublicKey = new web3.PublicKey(state.publicKey);
  const destMint = new web3.PublicKey("6pFZHafwwMmsGTFktjtGW5BZTAJpQEJA1Be4Nqeeu5jM");

  const tokenM = new web3.PublicKey("6pFZHafwwMmsGTFktjtGW5BZTAJpQEJA1Be4Nqeeu5jM")
  //console.log(toWallet.publicKey)

  // Get the token account of the fromWallet address, and if it does not exist, create it
  const fromTokenAccount = await spl.getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      tokenM,
      fromWallet.publicKey
  );

  // Get the token account of the toWallet address, and if it does not exist, create it
  const toTokenAccount = await spl.getOrCreateAssociatedTokenAccount(connection, fromWallet, tokenM, destPublicKey);

  // Mint 1 new token to the "fromTokenAccount" account we just created



  // Transfer the new token to the "toTokenAccount" we just created
  let signature = await spl.transfer(
      connection,
      fromWallet,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      state.amount * web3.LAMPORTS_PER_SOL
  );
  console.log('mint tx:', signature);
}

  return (
    <main className="h-screen">
      <header>
        <h1>Send Token @kunalgg</h1>
      </header>
      <section className='flex flex-col'>
        <input type="text" onChange={updateState} placeholder='publicKey'/>
        <input type="text" onChange={updateState} placeholder='amount'/>
        <button onClick={SendToken}>
          Send Token
        </button >
      </section>
    </main>
  )




}

