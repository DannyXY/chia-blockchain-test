const { RPCAgent } = require("chia-agent");
const {createHash} = require('crypto')
const metadata = require("./metadata.json")
const {
  create_new_wallet,
  nft_get_nfts,
  get_wallets,
  nft_mint_bulk,
} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({ service: "wallet" });

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

let did_wallet_id = 0
// Create a backup did to use here
create_new_wallet(agent, {
  wallet_type: "did_wallet",
  did_type: "new",
  backup_dids:["did:chia:1plzd3t49kek2clpfmy7eam3hkmqtm8lu66uw8r3v3qgdu5vecnfsmsdmm7"],
  num_of_backup_ids_needed: 1,
  fee: 50,
  amount: 1
}).then((res)=> {did_wallet_id = res.wallet_id, console.log(res)} )


get_wallets(agent, null).then((res) => console.log(res))
let bulkNftArray = []

// Map through metadata to create array of metadata for the bulk mint
metadata.map(async (data, index) => {
  const url = `https://githubusercontent.mmm.com/${index+1}`
  const urlHash = hash(url)
  const meta_hash = hash(data)
  bulkNftArray.push({
    uris: [url],
    hash: urlHash,
    meta_uris: [
      `https:/localhost:3000/metadata/${index+1}`,
    ],
    meta_hash: meta_hash,
    license_uris: [
          "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE",
        ],
        license_hash:
        "30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
  })
})



const mintBulkParams = {
  wallet_id: did_wallet_id,
  metadata_list: bulkNftArray,
  fee: 500
}

nft_mint_bulk(agent, mintBulkParams).then((res) => console.log(res.success))


// Get NFTs in wallet
nft_get_nfts(agent, {
  wallet_id: nft_wallet_id,
}).then((res) => console.log(res.nft_list));
