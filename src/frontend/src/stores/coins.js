import {observable, action, computed} from 'mobx';

class coins{
    @observable all = [];

    @observable existed = [];

    @observable etfValueHistory = [];

    @observable activeKey = null;

    @observable isLoading = false;

    @observable newPercentage = 0;

    @observable isLoadingExisted = false;

    @computed get etfValue(){
        let sum = 0;

        this.existed.forEach((record) => {

            let percentage = record.percentage / 100;

            record.coins.forEach((coinId) => {
                let coinData = this.all.slice().filter(r => r.id === coinId)[0];
                let coinBtcPrice = coinData.price_btc;
                sum += percentage * coinBtcPrice;
            })
        });

        return sum
    }

    @computed get etfValueUSD(){
        let sum = 0;

        this.existed.forEach((record) => {

            let percentage = record.percentage / 100;

            record.coins.forEach((coinId) => {
                let coinData = this.all.slice().filter(r => r.id === coinId)[0];
                let coinBtcPrice = coinData.price_usd;
                sum += percentage * coinBtcPrice;
            })
        });

        return sum
    }

    @computed get etfValueCNY(){
        let sum = 0;

        this.existed.forEach((record) => {

            let percentage = record.percentage / 100;

            record.coins.forEach((coinId) => {
                let coinData = this.all.slice().filter(r => r.id === coinId)[0];
                let coinBtcPrice = coinData.price_cny;
                sum += percentage * coinBtcPrice;
            })
        });

        return sum
    }


    @action async initExisted(){
        this.isLoadingExisted = true;
        await this.fetchAll();
        const response = await fetch("/api/existed");
        const status = await response.status;
        if (status === 200 || status === 304){
            const j = await response.json();
            this.existed = j.result;
            this.isLoadingExisted = false;
            if (this.existed.length > 0){
                this.activeKey = this.existed[0]._id;
            }
            return true;
        }
        else {
            console.log(response);
            this.isLoadingExisted = false;
            return false;
        }
    }

    @action async initEtfHistory(){
        const response = await fetch("/api/history");
        const status = await response.status;
        if (status === 200 || status === 304){
            const j = await response.json();
            this.etfValueHistory = j.result;
            return true;
        }
        else {
            console.log(response);
            return false;
        }
    }

    @action setActiveKey(key) {
        this.activeKey = key
    }

    @action setNewPercentage(value) {
        this.newPercentage = parseInt(value, 0)
    }

    @action filterExisted(pairsId){
        return this.existed.slice().filter(r => r._id === pairsId)[0]
    }

    @action updatePercentage(pairsId, value){
        const record = this.existed.slice().filter(r => r._id === pairsId)[0];
        record.percentage = value;
    }

    @action async deletePercentage(pairsId){
        const response = await fetch("/api/existed", {
            method: "DELETE",
            body: JSON.stringify({data: pairsId}),
        });
        const status = await response.status;
        console.log(status);
        if (status === 200 || status === 304){
            this.isLoading = false;
            return true;
        }
        else {
            console.log(response);
            this.isLoading = false;
            return false;
        }
    }

    @action async fetchAll(){
        this.isLoading = true;
        const response = await fetch("/api/coins");
        const status = await response.status;
        if (status === 200 || status === 304){
            const j = await response.json();
            this.all = j.result;
            this.isLoading = false;
            return true;
        }
        else {
            console.log(response);
            this.isLoading = false;
            return false;
        }
    }

    @action async syncAll(){
        const response = await fetch("/api/sync", {
            method: "POST",
            body: JSON.stringify({data: this.existed}),
        });
        const status = await response.status;
        if (status === 200 || status === 304){
            await this.initExisted();
            return true;
        }
        else {
            console.log(response);
            this.isLoading = false;
            return false;
        }
    }
}

const cs = new coins();

window.cs = cs;
export default cs;
