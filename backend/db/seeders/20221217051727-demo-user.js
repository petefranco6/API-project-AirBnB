'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Users';
   await queryInterface.bulkInsert(options, [
    {
      firstName: "Demo",
      lastName: "lition",
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 1
    },
    {
      firstName: "Fake",
      lastName: "User1",
      email: 'user1@user.io',
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 1
    },
    {
      firstName: "Fake",
      lastName: "User2",
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 2
    },
    {
      firstName: "Fake",
      lastName: "user3",
      email: 'user3@user.io',
      username: 'FakeUser3',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 1
    },
    {
      firstName: "Fake",
      lastName: "User4",
      email: 'user4@user.io',
      username: 'FakeUser4',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 1
    },
    {
      firstName: "Fake",
      lastName: "User5",
      email: 'user5@user.io',
      username: 'FakeUser5',
      hashedPassword: bcrypt.hashSync('password'),
      roleId: 1
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
