import { Amm } from "@nftperp/sdk/types";

export const AMMData: {
  AMM: Amm;
  Address: string;
  OSProSlug: string;
  ERC20Address?: `0x${string}`;
  label: string;
}[] = [
  {
    AMM: Amm["MILADY"],
    Address: "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    OSProSlug: "milady",
    ERC20Address: "0x227c7DF69D3ed1ae7574A1a7685fDEd90292EB48",
    label: "Milady",
  },
  {
    AMM: Amm["BAYC"],
    Address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    OSProSlug: "boredapeyachtclub",
    label: "Bored Ape Yacht Club",
  },
  {
    AMM: Amm["MAYC"],
    Address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    OSProSlug: "mutant-ape-yacht-club",
    label: "Mutant Ape Yacht Club",
  },
  {
    AMM: Amm["PUNKS"],
    Address: "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    OSProSlug: "wrapped-cryptopunks",
    ERC20Address: "0x269616d549d7e8eaa82dfb17028d0b212d11232a",
    label: "Cryptopunks",
  },
  {
    AMM: Amm["AZUKI"],
    Address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
    OSProSlug: "azuki",
    label: "Azuki",
  },
  {
    AMM: Amm["PPG"],
    Address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    OSProSlug: "pudgypenguins",
    label: "Pudgy Penguins",
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
