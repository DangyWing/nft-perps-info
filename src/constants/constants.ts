import { Amm } from "@nftperp/sdk/types";

export const ClearingHouseAddress: `0x${string}` =
  "0x6fc05B7DFe545cd488E9D47d56CFaCA88F69A2e1";

export const AMMData: {
  AMM: Amm;
  ammName: string;
  Address: `0x${string}`;
  OSProSlug: string;
  ERC20Address?: `0x${string}`;
  nftPerpAmmAddress: `0x${string}`;
  nfexProjectName: string;
  maxLeverage: number;
}[] = [
  {
    AMM: Amm["REMIO"],
    ammName: "remio",
    Address: "0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab",
    OSProSlug: "remilio-babies",
    ERC20Address: "0xa35Bd2246978Dfbb1980DFf8Ff0f5834335dFdbc",
    nfexProjectName: "Remilio Babies",
    nftPerpAmmAddress: "0x8215797e793b39fd2E8d1e9760c39a7Bea16ad55",
    maxLeverage: 5,
  },
  {
    AMM: Amm["MILADY"],
    ammName: "milady",
    Address: "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    OSProSlug: "milady",
    ERC20Address: "0x227c7DF69D3ed1ae7574A1a7685fDEd90292EB48",
    nfexProjectName: "Milady",
    nftPerpAmmAddress: "0x28d45Df0D075f229aDcbAfF59Bf90d39e80D875E",
    maxLeverage: 10,
  },
  {
    AMM: Amm["BAYC"],
    ammName: "bayc",
    Address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    OSProSlug: "boredapeyachtclub",
    nfexProjectName: "Bored Ape Yacht Club",
    nftPerpAmmAddress: "0x604Ed62F5991d6a2C47b13B9E5d34cC1C5048e99",
    maxLeverage: 10,
  },
  {
    AMM: Amm["MAYC"],
    ammName: "mayc",
    Address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    OSProSlug: "mutant-ape-yacht-club",
    nfexProjectName: "Mutant Ape Yacht Club",
    nftPerpAmmAddress: "0x6BcCA37F6DEAcB3cfCA095f08F6d72C65D01992B",
    maxLeverage: 10,
  },
  {
    AMM: Amm["PUNKS"],
    ammName: "punks",
    Address: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    OSProSlug: "wrapped-cryptopunks",
    ERC20Address: "0x269616d549d7e8eaa82dfb17028d0b212d11232a",
    nfexProjectName: "Cryptopunks",
    nftPerpAmmAddress: "0xB504aC5a974c0856732E6DB14589A0A7CC2199e8",
    maxLeverage: 10,
  },
  {
    AMM: Amm["AZUKI"],
    ammName: "azuki",
    Address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
    OSProSlug: "azuki",
    nfexProjectName: "Azuki",
    nftPerpAmmAddress: "0xaf588bca9175cC4d6e981Ade462f0Af40331cb2e",
    maxLeverage: 10,
  },
  {
    AMM: Amm["PPG"],
    ammName: "ppg",
    Address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    OSProSlug: "pudgypenguins",
    nfexProjectName: "Pudgy Penguins",
    nftPerpAmmAddress: "0xaD7d8b1BEAF28225bBDD7F76D2604decFD0B6013",
    maxLeverage: 5,
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
