import Link from "next/link";
import { FC, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { Loader, SolanaLogo, SelectAndConnectWalletButton, ConnectWallet } from "components";
import styles from "./index.module.css";

import { createSPLToken } from "../../utils/createSPLToken"
import { CreateTokenButton } from '../../utils/CreateTokenButton';

const walletPublicKey = "";

export const SPLTokenView: FC = ({ }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  const [quantity, setQuantity] = useState(0);
  const [decimals, setDecimals] = useState(9);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-1 px-2 mx-2">
            <div className="text-sm breadcrumbs">
              <ul className="text-xl">
                <li>
                  <Link href="/">
                    <a>SOLANA-TOOLS</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
            <ConnectWallet onUseWalletClick={onUseWalletClick} />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  Create Solana <SolanaLogo /> token
                </h1>
                {/* Géner le NaN */}
                <div>
                  <form className="mt-[10%] mb-[5%]">

                    <label className="input-group input-group-vertical input-group-lg">Number of tokens to mint</label>
                    <input className="mb-[2%] text-black pl-1 border-2 border-black"
                      type="number"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      style={{
                        borderRadius:
                          "var(--rounded-btn,.5rem) var(--rounded-btn,.5rem)",
                      }}
                    />

                    <label className="input-group input-group-vertical input-group-lg">Number of decimals</label>
                    <input className="mb-[2%] text-black pl-1 border-2 border-black"
                      type="number"
                      required
                      value={decimals}
                      onChange={(e) => setDecimals(parseInt(e.target.value))}
                      style={{
                        borderRadius:
                          "var(--rounded-btn,.5rem) var(--rounded-btn,.5rem)",
                      }}
                    />

                    <label className="input-group input-group-vertical input-group-lg">Enable freeze authority</label>
                    <input className="mb-[2%] flex items-center mx-auto "
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(!isChecked)}
                    />
                  </form>
                  <CreateTokenButton connection={connection} publicKey={publicKey} wallet={wallet} quantity={quantity} decimals={decimals} isChecked={isChecked} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};