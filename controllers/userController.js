const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    const result = await mongoDb.getDb().db('project1').collection('contacts').find();

    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
}

const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongoDb.getDb().db('project1').collection('contacts').find({ _id: userId });
    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });
};

module.exports = {
    getAllUsers,
    getSingleUser
};
