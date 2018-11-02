/**
 * ==================================================
 * this is insane hahahah but i still love this style
 * ==================================================
 */
const moment = require('moment'); //pluguins format date

class ModuleQuran {
    constructor() {
    }

    getGenerate(users, surat) {
        this.sequenceNumber = 3;   
        let range = [];
        let mergeRange = []; //merge antar surat

        for (let itemSurat in surat){
            range = this.iteration(surat[itemSurat].total_ayat, surat[itemSurat]._id);
            mergeRange.push({_id: surat[itemSurat]._id, range: range});
        }

        this.dataRange = mergeRange;
        return this.assignUser(users);
    }

    iteration (n, id) {
        let range = [];
        let startNumber = 1;

        if (this.status === undefined) {
            this.status = false; //set this.status jika kosong
        }

        for (let i=1; n >= i; i++) {
            let tmpRange = '';

            if (this.status) {
                i = (i + this.selisih) - 1;
                this.status = false;
            } else {
                startNumber= i;
                i = (i + this.sequenceNumber) - 1;
            }
            
            if (i > n) {
                this.status = true;
                this.selisih = (i - n);
                i = n;
            }

            if (startNumber === i) tmpRange = startNumber
            else tmpRange = startNumber+'-'+i;

            range.push({ _id: id, data: tmpRange, status: this.status});
        }

        return range;
    }

    partAyat() {
        let tmpResult = new Array();
        for (let dataRange in this.dataRange) {
            let counter = 0;
            let totalDataRange  = this.dataRange[dataRange].range.length;
            let tmpResultLast = new Array();

            while (counter < totalDataRange) {
                let tmpData = (counter + this.sequenceNumber) - 1;
                let tmpDataPush = this.dataRange[dataRange].range.slice(counter, tmpData);

                if (this.statusFirst) {
                    this.statusFirst = false;
                    tmpResult[tmpResult.length - 1].push(tmpDataPush[0]);
                    ++counter;
                    ++tmpData;
                    tmpDataPush = this.dataRange[dataRange].range.slice(counter, tmpData);
                } 
                tmpResult.push(tmpDataPush);
                counter = tmpData;
            }

            tmpResultLast = tmpResult[tmpResult.length - 1];
            tmpResultLast = tmpResultLast[tmpResultLast.length - 1];

            if (tmpResultLast.status) {
                this.statusFirst = true;
            }
        }

        return tmpResult;
    }

    assignUser(users) {
        let result = new Array();
        let statusLoop = true;
        let addDay = 0;
        let tmpResult = this.partAyat();

        while (statusLoop) {
            let dateNew = moment('2018-09-20').add(addDay, 'days').format('YYYY-MM-DD');
            addDay++;
            for (let user in users) {
                for (let counter1 in tmpResult) {
                    result.push({
                        date: dateNew,
                        user: {_id:users[user]._id, name: users[user].name},
                        ayat: tmpResult[counter1]
                    });
                    tmpResult.shift(); //delete first index in array tmpResult
                    break;
                }
            }

            if (tmpResult.length == 0) {
                statusLoop = false;
            }
        }

        return result;
        // for (let a in result) {
        //     console.log(result[a])
        // }
    }
}
module.exports = ModuleQuran;