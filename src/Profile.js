import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSigner,
} from 'wagmi';

export default function Profile() {
  const { data: signer, isError, isLoadingSig } = useSigner();
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  console.log(signer);

  if (isConnected) {
    return (
      <div>
        {/* <div>{signer}</div> */}

        <div className=" text-white">
          {ensName ? `${ensName} (${address})` : address.slice(0, 6)+'....'}
        </div>
        <div className=" text-white">Connected to {connector?.name}</div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
