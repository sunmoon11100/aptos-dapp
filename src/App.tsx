import React from 'react';
import {AptosClient, Types} from "aptos";

// Create an AptosClient to interact with mainnet.
const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');

function App() {
  const liquidswapAddress = '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948';
  const apt = '0x1::aptos_coin::AptosCoin';
  const usdt = '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT';
  const uncorrelated = '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated';

  // Use the AptosClient to retrieve details about the account.
  const [resource, setResource] = React.useState<Types.MoveResource | null>(null);
  React.useEffect(() => {
    client.getAccountResource(
      liquidswapAddress,
      `0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::liquidity_pool::LiquidityPool<${usdt}, ${apt}, ${uncorrelated}>`
    ).then(setResource);
  }, []);
  const xReserve = (resource?.data as any)?.coin_x_reserve?.value;
  const yReserve = (resource?.data as any)?.coin_y_reserve?.value;
  return (
    <div className="App">
      <p key={1}>USDT: {xReserve}</p>
      <p key={2}>APT: {yReserve}</p>
    </div>
  );
}

export default App;
