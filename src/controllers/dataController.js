const Data = require('../models/Data');

exports.getData = async (req, res) => {
    try {
        // const filters = req.query;
        // const filterObject = {};
        // for (const key in filters) {
        //     if (filters.hasOwnProperty(key)) {
        //         filterObject[key] = filters[key];
        //     }
        // }

        const data = await Data.find({}).limit(30);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addData = async (req, res) => {
    try {
        const newDataArray = req.body; // Assuming req.body is an array of documents

        const savedDataArray = [];
        for (let i = 0; i < newDataArray.length; i++) {
            const newData = new Data(newDataArray[i]);
            const savedData = await newData.save();
            savedDataArray.push(savedData);
        }
        
        res.status(201).json(savedDataArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
