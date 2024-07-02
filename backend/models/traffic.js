const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Traffic = sequelize.define('Traffic', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  redeemed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Traffic.createCoupon = async function (source) {
  let prefix;
  switch (source) {
    case 'instagram':
      prefix = 'i';
      break;
    case 'google':
      prefix = 'g';
      break;
    case 'facebook':
      prefix = 'f';
      break;
    case 'youtube':
      prefix = 'y';
      break;
    default:
      throw new Error(`Invalid source: ${source}`);
  }

  const token = prefix + Math.random().toString(36).substr(2, 6);
  return await Traffic.create({ token, source });
};

Traffic.redeemCoupon = async function (token) {
  const coupon = await Traffic.findOne({ where: { token } });
  if (coupon && !coupon.redeemed) {
    coupon.redeemed = true;
    await coupon.save();
    return coupon;
  } else {
    return null;
  }
};

module.exports = Traffic;
