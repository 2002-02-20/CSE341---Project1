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

        if (contact.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    });

};

const createUser = async (req, res) => {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
        return res.status(400).json({ 
            status: 400,
            message: "Missing required fields" 
        });
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongoDb.getDb().db('project1').collection('contacts').insertOne(user);
    if (result.acknowledged) {
        res.status(201).json({
            status: 201,
            "result": result
        });
    } else {
        res.status(500).json({ status: 500, message: result.error || 'Some error occurred while creating the user.' });
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongoDb.getDb().db('project1').collection('contacts').updateOne({ _id: userId }, { $set: user });
    if (result.modifiedCount > 0) {
        res.status(200).json({
            status: 200,
            result
        });
    } else {
        res.status(404).json({ status: 404, message: 'User not found' });
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongoDb.getDb().db('project1').collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(200).json({ status: 200, message: 'User deleted successfully' });
    } else {
        res.status(404).json({ status: 404, message: 'User not found' });
    }
};


module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
