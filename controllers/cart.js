import { Cart } from '../models/model.js';
import jwt from 'jsonwebtoken';
import middleware from './middleware.js';

const cartController = {
    getIdUser: async (req, res) => {
        try {
            const token = middleware.getToken(req, res);
            const idUser = jwt.decode(token).id;
            return idUser;
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    getAllItems: async (req, res) => {
        try {
            const allItems = await Cart.find().populate('books', 'title');
            res.status(200).json(allItems);
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    getCartUser: async (req, res) => {
        try {
            const idUser = await cartController.getIdUser(req, res);
            const cartUser = await Cart.findOne({ userId: idUser });
            res.status(200).json(cartUser);
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    addCart: async (req, res, idUser) => {
        try {
            const newItem = new Cart({
                books: req.params.id,
                userId: idUser,
            });
            await newItem.save();
            return newItem;
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    updateQuantity: async (req, res) => {
        try {
            res.status(200).json('updated quantity');
        } catch (err) {
            res.status(200).json({
                status: 'fail',
                message: err.message,
            });
        }
    },

    updateCart: async (req, res) => {
        try {
            const idUser = await cartController.getIdUser(req, res);
            const item = await Cart.findOne({ userId: idUser });

            if (item) {
                await item.updateOne({
                    $addToSet: { books: req.params.id },
                });

                res.status(200).json('Updated Successfully!');
            } else {
                await cartController.addCart(req, res, idUser);
                res.status(200).json('New item added!');
            }
        } catch (err) {
            res.status(400).json({
                status: 'Fail',
                message: err.message,
            });
        }
    },

    deleteCart: async (req, res) => {
        try {
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        }
    },
};

export default cartController;
