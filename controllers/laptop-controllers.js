const { Laptop, Payment } = require("../models");



const index = async (req, res, next) => {
    try {
        const laptops = await Laptop.findAll();
        res.status(200).json({ laptop: laptops });
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};


const store = async (req, res, next) => {
    try {
        const { product, description } = req.body;
        const laptop = await Laptop.create({ product, description });

        res.status(201).json(laptop);
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};


const show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const laptop = await laptops.findByPk(id, {
            include: [
                {
                    model: Payment,
                    as: "payments",
                },
            ],
        });

        if (!laptop) {
            return res.status(404).json({ message: "laptop is not found" });
           
        }

        res.status(200).json(laptop);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};


const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { product, description } = req.body;
        const laptop = await Laptop.findOne({ where: { id } });

        if (!laptop) {
            return res.status(404).json({ message: "laptop is not found" });
            
        }

        laptop.product = product || laptop.product;
        laptop.description = description || laptop.description;
        await laptop.save();

        return res.status(200).json(laptop);
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};


const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const laptop = await Laptop.findByPk(id);
        if (!laptop) {
            return res.status(404).json({ message: "laptop is not found" });
           
        }

        await Payment.destroy({ where: { laptopId: id } });
        await laptop.destroy();
        return res
            .status(200)
            .json({ message: `product ${laptop.title} telah dihapus` });
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};

module.exports = { index, store, show, update, remove };