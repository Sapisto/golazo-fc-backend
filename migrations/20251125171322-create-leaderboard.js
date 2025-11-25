'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboards', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      playerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      teamId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      goals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rcPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totdPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaderboards');
  },
};
