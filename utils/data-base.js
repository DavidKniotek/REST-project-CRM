// Our data will be stored in data/client-data.json file

const {readFile, writeFile} = require('fs').promises; // We'll be operating on files, so we need these two methods from node's files system.
const {join} = require('path');
const {v4: uuid} = require('uuid'); // We're importing uuid v4 via destructuring and renaming this function to 'uuid'.
class DataBase { // Object DataBase won't be in usage, until we don't add it to index.js file via 'require'.
    constructor(dataBaseFileName) { // here we're putting name of our file from 'data' folder; we can store various collections, eg. client-data.json, something-data.json. Our program will be able to handle with various information, not only one, which would be stated here in advance.

        this.dataBaseFileName = join(__dirname, '../data', dataBaseFileName); // We're connecting current folder with data-base.js file (__dirname) with data folder and with the data sent by the user (dataBaseFileName).

        this._load(); // '_' means internal function
    };

    async _load() {
        this._data = JSON.parse(await readFile(this.dataBaseFileName, 'utf8')); // Data sent by the user (this._data) will be read as a parsed JSON, written in utf8. If e.g. client-data.json will be an empty array, this._data will be also the empty array. If there will be some data, it will be written as an array of objects, e.g.: [ { "name": 'Name1' } ].
    };

    _save() {
        writeFile(this.dataBaseFileName, JSON.stringify(this._data), 'utf8'); // We're saving the new data in 'this.dataBaseFileName' file (e.g. as a content of client-data.json), changing array to JSON and writing the 'this._data' as a JSON and encoding it in utf8.
    };

    create(obj) {
        this._data.push({
            id: uuid(), // uuid generates unique encrypted character string and adds this string to the content of the .json file in data folder.

            ...obj, //spread operator, which duplicates the obj - when the user is putting the data, the unique id is added automatically to this data.

        }); // We're adding the passed obj to .json file (push, because .json file is an array of objects).

        this._save();
    };

    getAll() {
        return this._data;
    };

    getOne(id) {
        return this._data.find(oneObj => oneObj.id === id);
    }

    update(id, newObj) { // Look the right client up by the ID and changes its data.

        this._data = this._data.map(oneObj => {
            if (oneObj.id === id) {
                return {
                    ...oneObj,
                    ...newObj, // returning of these 2 spread objects allows to update its content: if in newObj will be something different from in oneObj, then this data from oneObj will be overwritten.
                };
            } else {
                return oneObj; // Returned object hasn't been changed.
            }
        });
        this._save();
    };

    delete(id) {
        this._data = this._data.filter(oneObj => oneObj.id !== id); // Returns new array (this._data) with all these elements, which had returned 'true'. All the id's contained in .json file ale checked and if one of them has the same id as the id passed as an argument, this id will be deleted.

        this._save();
    };

}

const dataBase = new DataBase('client-data.json'); // instance of the data base, in this app will be just one (only client-data.json).

module.exports = {
    dataBase,
};