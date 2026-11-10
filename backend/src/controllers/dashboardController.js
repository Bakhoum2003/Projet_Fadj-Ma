const Medicine = require('../models/Medicine');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getStats = asyncHandler(async (req, res) => {
  const lowStockThreshold = Number(process.env.LOW_STOCK_THRESHOLD) || 10;
  const [stats] = await Medicine.aggregate([
    {
      $group: {
        _id: null,
        totalMedicines: { $sum: 1 },
        totalUnitsAvailable: { $sum: '$quantity' },
        outOfStock: { $sum: { $cond: [{ $eq: ['$quantity', 0] }, 1, 0] } },
        lowStock: { $sum: { $cond: [{ $and: [{ $gt: ['$quantity', 0] }, { $lte: ['$quantity', lowStockThreshold] }] }, 1, 0] } },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalMedicines: stats?.totalMedicines || 0,
      totalUnitsAvailable: stats?.totalUnitsAvailable || 0,
      outOfStock: stats?.outOfStock || 0,
      lowStock: stats?.lowStock || 0,
      lowStockThreshold,
    },
  });
});
