import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Marquee from "react-fast-marquee";
import {
  useAddress,
  useContract,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Login from '../components/Login';
import Loading from '../components/Loading';
import { useState } from 'react';


const Home: NextPage = () => {
  const address = useAddress();
  const [userTicket, setUserTicket] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);


  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-[#111720] min-h-screen flex felx-col">
      <Head>
        <title>PLUTO DRAW</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png"
        />
      </Head>

      <div className="flex-1">
        {/* Header */}
        <Header />
        <Marquee className="bg-[#1b2735] p-5 mb-5" gradient={false} speed={100}>
          <div className="flex space-x-2 mx-10">
            <h4 className="text-white font-bold">
              Last Winner:
            </h4>
            <h4 className="text-white font-bold">
              Previous winnings:{" "}
            </h4>
          </div>
        </Marquee>

        {/* Next Draw */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className='stats-container'>
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>

            <div className="flex justify-between p-2 space-x-2">
              <div className='stats'>
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">0.1 MATIC</p>
              </div>

              <div className='stats'>
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">100</p>
              </div>
            </div>

            {/* counter Timer */}
            {/*  */}
          </div>

          <div className="stats-container space-y-2">
            <div className='stats-container'>
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price Per Ticket</h2>
                <p>0.01 MATIC</p>
              </div>

              <div className="flex text-white items-center space-x-2 bg-[#91B18] border-[#004337] border p-4">
                <p>TICKET</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                  <p>Total cost tickets</p>
                  <p>
                    {/* {ticketPrice &&
                      Number(
                        ethers.utils.formatEther(ticketPrice?.toString())
                      ) * quantity}{" "}
                    {currency} */}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service fees</p>
                  <p>
                    {/* {ticketCommission &&
                      ethers.utils.formatEther(
                        ticketCommission?.toString()
                      )}{" "}
                    {currency} */}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button
                // onClick={handleClick}
                // disabled={
                //   expiration?.toString() < Date.now().toString() ||
                //   remainingTickets?.toNumber() === 0
                // }
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 font-semibold px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed"
              >
                Buy {quantity} Tickets for{" "}
                {/* {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                  quantity}{" "}
                {currency} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
