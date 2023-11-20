'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Laptops",
      [
          {
              product : "Asus ROG Gaming",
              description: "Procecor : Intel core i9, Ram : 16 gb",
              createdAt: new Date(),
              updatedAt: new Date(),
          },
      ],
      {}
  );
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Laptop', null, {});
     
  }
};
