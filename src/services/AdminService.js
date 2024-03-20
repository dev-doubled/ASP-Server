import { Art } from "../models/Art.js";
import { Comment } from "../models/Comment.js";
import { ReplyComment } from "../models/ReplyComment.js";
import { User } from "../models/User.js";
import { Payment } from "../models/Payment.js";
import { Package } from "../models/Package.js";
import { Feature } from "../models/Feature.js";

class AdminService {
  async getAllData() {
    try {
      const [users, arts, totalAmountResult] = await Promise.all([
        User.find(),
        Art.find(),
        Payment.aggregate([
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              totalAmount: 1,
            },
          },
        ]),
      ]);
      let totalCountAllComments = 0;
      const commentCount = await Comment.aggregate([
        { $project: { commentCount: { $size: "$comments" } } },
        { $group: { _id: null, totalCount: { $sum: "$commentCount" } } },
        { $project: { _id: 0, totalCount: 1 } },
      ]);
      totalCountAllComments +=
        commentCount.length > 0 ? commentCount[0].totalCount : 0;
      const comments = await Comment.find();
      for (const comment of comments) {
        for (const commentId of comment.comments) {
          const replyComments = await ReplyComment.find({ commentId });
          for (const replyComment of replyComments) {
            totalCountAllComments += replyComment.replyComments.length;
          }
        }
      }
      let totalAmount =
        totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;
      totalAmount = parseFloat(totalAmount.toString().replace(/\.?0+$/, ""));
      return {
        totalUsers: users.length,
        totalArts: arts.length,
        totalCountAllComments,
        totalAmount,
      };
    } catch (error) {
      throw error;
    }
  }

  async countPackage() {
    try {
      const packages = await Package.find({
        name: { $in: ["Basic", "Business", "Enterprise"] },
      });
      const featureCounts = await Promise.all(
        packages.map(async (pkg) => {
          const features = await Feature.find({ packageId: pkg._id });
          return features.length;
        })
      );

      return featureCounts;
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminService();
