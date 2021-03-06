'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Listing, { foreignKey: 'listingId' });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      days: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      listingFirstImageUrl: DataTypes.STRING,
      listingPricePerNight: DataTypes.INTEGER,
      listingCity: DataTypes.STRING,
      listingLat: DataTypes.DECIMAL,
      listingLng: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
