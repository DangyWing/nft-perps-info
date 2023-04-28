import { Amm } from "@nftperp/sdk/types";

export const AMMData: {
  AMM: Amm;
  ammName: string;
  Address: string;
  OSProSlug: string;
  ERC20Address?: `0x${string}`;
  label: string;
  nftPerpAmmAddress: `0x${string}`;
}[] = [
  {
    AMM: Amm["MILADY"],
    ammName: "milady",
    Address: "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    OSProSlug: "milady",
    ERC20Address: "0x227c7DF69D3ed1ae7574A1a7685fDEd90292EB48",
    label: "Milady",
    nftPerpAmmAddress: "0x28d45Df0D075f229aDcbAfF59Bf90d39e80D875E",
  },
  {
    AMM: Amm["BAYC"],
    ammName: "bayc",
    Address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    OSProSlug: "boredapeyachtclub",
    label: "Bored Ape Yacht Club",
    nftPerpAmmAddress: "0x604Ed62F5991d6a2C47b13B9E5d34cC1C5048e99",
  },
  {
    AMM: Amm["MAYC"],
    ammName: "mayc",
    Address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    OSProSlug: "mutant-ape-yacht-club",
    label: "Mutant Ape Yacht Club",
    nftPerpAmmAddress: "0x6BcCA37F6DEAcB3cfCA095f08F6d72C65D01992B",
  },
  {
    AMM: Amm["PUNKS"],
    ammName: "punks",
    Address: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    OSProSlug: "wrapped-cryptopunks",
    ERC20Address: "0x269616d549d7e8eaa82dfb17028d0b212d11232a",
    label: "Cryptopunks",
    nftPerpAmmAddress: "0xB504aC5a974c0856732E6DB14589A0A7CC2199e8",
  },
  {
    AMM: Amm["AZUKI"],
    ammName: "azuki",
    Address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
    OSProSlug: "azuki",
    label: "Azuki",
    nftPerpAmmAddress: "0xaf588bca9175cC4d6e981Ade462f0Af40331cb2e",
  },
  {
    AMM: Amm["PPG"],
    ammName: "ppg",
    Address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    OSProSlug: "pudgypenguins",
    label: "Pudgy Penguins",
    nftPerpAmmAddress: "0xaD7d8b1BEAF28225bBDD7F76D2604decFD0B6013",
  },
];

export const ERC20ContractAddresses: { AMM: Amm; Address: string }[] = [
  {
    AMM: Amm["MILADY"],
    Address: "0x227c7DF69D3ed1ae7574A1a7685fDEd90292EB48",
  },
  {
    AMM: Amm["PUNKS"],
    Address: "0x269616d549d7e8eaa82dfb17028d0b212d11232a",
  },
];
