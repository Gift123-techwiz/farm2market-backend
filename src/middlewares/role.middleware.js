const { AppDataSource } = require('../config/database');

exports.verifiedFarmerOnly = async (req, res, next) => {
  try {
    if (req.user.role !== 'farmer') {
      return res.status(403).json({ success: false, message: 'Only farmers can access this resource' });
    }

    const badgeRepo = AppDataSource.getRepository('VerifiedBadge');
    const badge = await badgeRepo.findOne({ where: { user_id: req.user.id } });

    if (!badge || badge.status !== 'approved') {
      return res.status(403).json({ success: false, message: 'Farmer must be verified to perform this action' });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};