
const contractAddress = 'TQasFxgp6JgbHXuUUZzK1cuownzKgkCvno'

const utils = {
    tronWeb: false,
    contract: false,
    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },
    async getWinner(){
        await this.contract.deterWinner()
    }
};

export default utils;