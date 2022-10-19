const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser   : true,
    dbName            : 'ny'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect('mongodb://root:example@mongo', clientOptions)
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}