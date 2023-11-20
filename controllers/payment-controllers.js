const { Laptop, Payment } = require("../models");



const index = async (req, res, next) => {
    try {
        const payments = await Payment.findAll({
            include: [
                {
                    model: Laptop,
                    as: "laptop", 
                },
            ],
        });
        res.status(200).json({ payment: payments });
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};

const store = async (req, res, next) => {
    try {
        const user = req.user;
        const { product, description, price, laptopId } = req.body;
        const laptop = await Laptop.findByPk(laptopId);
        if (!laptop) {
            return res.status(404).json({ message: " not found" });
           
        }

        
        const payment = await Payment.create({
            product,
            description,
            price,
            laptopId: laptop.id,
            userId: user.id,
        });
        await payment.reload({
            include: [
                {
                    model: Laptop,
                    as: "Laptop", 
                },
            ],
        });
        return res.status(201).json(Payment);
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};


const update = async (req, res, next) => {
    try {
        const paymentId = req.params.id;
        const { product, description, price } = req.body;
        const payment = await Payment.findOne({
            where: { id: paymentId },
        });

        if (!payment) {
            return res.status(404).json({ message: "not found" });
            
        }

        payment.product = product || payment.product;
        payment.description = description || payment.description;
        payment.price = price || payment.price;
        await payment.save();
        return res.status(200).json({
            product: payment.product,
            description: payment.description,
            price: payment.price,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};


const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: "not found" });
           
        }

        await payment.destroy();
        return res
            .status(200)
            .json({ message: `payment  id ${review.id} telah dihapus` });
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};
module.exports = { index, store, update, remove };