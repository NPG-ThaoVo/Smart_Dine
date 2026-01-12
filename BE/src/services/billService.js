import Bill from "../models/billsModel.js";

// tạo bill
export const createBill = async (billData) => {
  const bill = await Bill.create(billData);
  return Bill.findById(bill._id).populate('sessionId');
};

// lấy tất cả bills
export const getAllBills = async (page = 1, limit = 10, status = null) => {
  const skip = (page - 1) * limit;
  const filter = status ? { status } : {};

  const [bills, total] = await Promise.all([
    Bill.find(filter)
      .populate({
        path: 'sessionId',
        populate: {
          path: 'tableId',
          select: 'tableNumber'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Bill.countDocuments(filter)
  ]);

  return {
    bills,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

// lấy bill theo id
export const getBillById = async (billId) => {
  return Bill.findById(billId).populate({
    path: 'sessionId',
    populate: {
      path: 'tableId',
      select: 'tableNumber'
    }
  });
};

// lấy thống kê doanh thu
export const getBillStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [allStats, todayStats] = await Promise.all([
    Bill.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalBills: { $sum: 1 },
          paidBills: {
            $sum: { $cond: [{ $eq: ["$status", "PAID"] }, 1, 0] }
          },
          unpaidBills: {
            $sum: { $cond: [{ $eq: ["$status", "UNPAID"] }, 1, 0] }
          }
        }
      }
    ]),
    Bill.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          todayRevenue: { $sum: { $cond: [{ $eq: ["$status", "PAID"] }, "$totalAmount", 0] } },
          todayBills: { $sum: 1 }
        }
      }
    ])
  ]);

  const all = allStats.length > 0 ? allStats[0] : {
    totalRevenue: 0,
    totalBills: 0,
    paidBills: 0,
    unpaidBills: 0
    
  };

  const today = todayStats.length > 0 ? todayStats[0] : {
    todayRevenue: 0
    , todayBills: 0
  };

  return {
    ...all,
    todayRevenue: today.todayRevenue,
    todayBills: today.todayBills
  };
};