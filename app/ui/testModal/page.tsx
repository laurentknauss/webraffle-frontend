import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function TestConnectButton() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f0f0',
      }}
    >
      <ConnectButton />
    </div>
  );
}
