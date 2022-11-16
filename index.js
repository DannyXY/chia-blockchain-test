const { RPCAgent } = require("chia-agent");
const {
  create_new_wallet,
  nft_mint_nft,
  nft_get_nfts,
  get_wallets,
  nft_get_by_did,
} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({ service: "wallet" });
const params = {
  wallet_type: "nft_wallet",
};

const nft_wallet_id = 0
const did_wallet_id = 0
const didWalletDid = ""

const nftParam = {
  wallet_id: nft_wallet_id,
  uris: ["https://images.pexels.com/photos/4812689/pexels-photo-4812689.jpeg"],
  hash: "995b5e2837fa68292e88dd5f900ea83953aafcb6bfb7c086f1ba7671946c4600",
  fee: 0,
};

const nftWithDidParams = {
  wallet_id: did_wallet_id,
  uris: ["https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"],
  hash: "0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
  meta_uris: [
    "https://pastebin.com/raw/BHZc1suk",
    "https://pastebin.com/raw/bnzGwjmB",
  ],
  meta_hash: "07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
  license_uris: [
    "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE",
  ],
  license_hash:
    "30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
  royalty_address:
    "txch1ape36g8rn8fm7d53z8rvngjkwhlkr83p28vnrpha94zt25szh8aq6anp3y",
  royalty_percentage: 175,
  target_address:
    "txch1ezy69gr6gpmu5e3hvyrn07ls7gqrw66s93pt555xcw50x25a2g7q3l3f8m",
  edition_number: 1,
  edition_total: 5,
  fee: 615000000,
};

// Create Wallet without DID
create_new_wallet(agent, {
  wallet_type: "nft_wallet",
  name: "My NFT Wallet (RPC/non-DID)",
  fee: 200,
}).then((res) => nft_wallet_id = res.wallet_id);

// Create wallet with DID
create_new_wallet(agent, {
  wallet_type: "did_wallet",
  did_type: "new",
  amount: 1,
  backup_dids: [
    didWalletDid,
  ],
  num_of_backup_ids_needed: 1,
  fee: 10,
}).then((res) => did_wallet_id=res.wallet_id);

// Get all current wallets
get_wallets(agent, null).then((res) => console.log(res));

// Mint NFT on non DID wallet
nft_mint_nft(agent, nftParams).then((res) => {
  console.log(res);
});

// Mint NFT on DID wallet
nft_mint_nft(agent, nftWithDidParams).then((res) => {
  console.log(res);
});

// Get NFTs in wallet
nft_get_nfts(agent, {
  wallet_id: nft_wallet_id,
}).then((res) => console.log(res.nft_list));
