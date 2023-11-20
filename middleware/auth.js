const { User, Payment } = require("../models");
const { verifyToken } = require("../helpers/jwt");


const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "user not authentication" });
            
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res
                .status(401)
                .json({ message: "user not authentication" });
           
        }

        const user = await User.findOne({ where: { id: decoded?.id } });
        if (!user) {
            return res.status(401).json({ message: "user not found" });
            
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};

const isAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.user;
        if (!isAdmin) {
            return res
                .status(401)
                .json({ message: "for  admin only " });
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};
const isUserOwn = async (req, res, next) => {
    try {
        const payment = await Payment.findOne({ where: { id: req.params.id } });
        const user = req.user;
        if (!payment) {
            return res.status(404).json({ message: "payment not found" });
        }
        if (payment.userId !== user.id) {
            return res
                .status(404)
                .json({ message: "cannot accsess this data" });
        }

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
};

module.exports = { authUser, isAdmin, isUserOwn };