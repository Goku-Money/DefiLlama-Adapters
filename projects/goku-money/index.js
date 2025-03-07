const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2, sumTokensExport } = require('../helper/unwrapLPs')

const COLLATERALS = {
  [ADDRESSES.manta.USDC]: {
    activePool: "0x50ef8B64c02B7913f15CbCDF0E7F44CC261195D6",
    defaultPool: "0xac84B99F253F05b00bff36a06fA1CA5f5754E80F",
  },
  [ADDRESSES.manta.USDT]: {
    activePool: "0x74242b001869037594c8b59b191DF7284c6A3801",
    defaultPool: "0xF42cE1F6F90Ea3B6254E2390B7E9467Fb1584AAA",
  },
  "0x6Fae4D9935E2fcb11fC79a64e917fb2BF14DaFaa": {
    activePool: "0x00A14CF3A66De2D4585F399Ed4240d0F2730fFCB",
    defaultPool: "0x6851255D2CEc9D66502282D3C6F11f552186eDA7",
  },
  [ADDRESSES.manta.WETH]: {
    activePool: "0xd58300481551F2bB81343abB5C6288fEaCC72Be4",
    defaultPool: "0x2C903a6858374925f5020B8EA2D88E545515eD4D",
  }
}

const GAI_TOKEN_ADDRESS = "0xcd91716ef98798A85E79048B78287B13ae6b99b2"
const GAI_STAKES = {
  USDC: "0xC5392Be704A4654444CcEE4A8407cbF4A0ed5F2A",
  USDT: "0x000aF1623BeCcd809c51cD2440cc8E1B55D191b4",
  TIA: "0x333E6492B5c2eAfAFCB709c5914D53b01C640b33",
  WETH: "0x5E9924f545Ed8116b1Ae4315653e1b0E52a2bfc4",
}

const GOK_TOKEN_ADDRESS = "0x387660bc95682587efc12c543c987abf0fb9778f"
const GOK_STAKES = {
  USDC: "0x60e47C06E3999c1Ef8bC5A424FCd665925CB0FB1",
  USDT: "0x1343804D5936EA6E98988F27870b913b1c93081e",
  TIA: "0xD2fBB34Bd69EC810AF2D243eA2192e7c89a696dA",
  WETH: "0x4CF0Ac5Ac97E8d58e798eBc4EaB9afF17481c5F5",
}

async function tvl(ts, _block, chainBlocks, { api }) {
  const tokensAndOwners = []
  for (const [collateral, collateralInfo] of Object.entries(COLLATERALS)) {
    const { activePool, defaultPool } = collateralInfo
    tokensAndOwners.push([collateral, activePool])
    tokensAndOwners.push([collateral, defaultPool])
  }

  for(const owner of Object.values(GAI_STAKES)) {
    tokensAndOwners.push([GAI_TOKEN_ADDRESS, owner])
  }

  for(const owner of Object.values(GOK_STAKES)) {
    tokensAndOwners.push([GOK_TOKEN_ADDRESS, owner])
  }
  return sumTokens2({ api, tokensAndOwners, })
}

module.exports = {
  start: 1698768000, // 01 Nov 2023
  methodology: "Total locked collateral assets (in ERC-20 form) in ActivePool and DefaultPool, plus total staked GAI in StabilityPool",
  manta: {
    tvl,
    staking: sumTokensExport({ owners: [...Object.values(GOK_STAKES), ...(Object.values(GAI_STAKES))],  tokens: [GOK_TOKEN_ADDRESS, GAI_TOKEN_ADDRESS]}),
  },
};
