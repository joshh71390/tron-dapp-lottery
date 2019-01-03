import TronWeb from 'tronweb';
import Utils from 'utils';

export default class Tron{

    async init(){
        await Utils.setTronWeb(TronWeb);
    }

    async getLottery(){
        await Utils.getWinner()
    }
    
}