const express = require("express");
const laptopRoutes = require("./routes/laptop-routes.js");
const paymentRoutes = require("./routes/payment-routes.js");
const userRoutes = require("./routes/user-routes.js");



const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/laptop", laptopRoutes);
app.use("/payment", paymentRoutes);
app.use(userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});