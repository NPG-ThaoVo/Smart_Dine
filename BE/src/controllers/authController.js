import { successResponse, errorResponse } from "../utils/response.js";
import admin from "../config/firebase.js";
import User from "../models/userModel.js";
import { generateTokens } from "../services/authService.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const googleLoginController = async (req, res) => {
  try {
    const { token: idToken } = req.body;

    // Token bắt buộc
    if (!idToken) {
      return errorResponse(res, "Token is required", 400, "TOKEN_REQUIRED");
    }

    // Kiểm tra format JWT (phải có 3 phần)
    const tokenParts = idToken.split(".");
    if (tokenParts.length !== 3) {
      return errorResponse(
        res,
        "Invalid token format. Firebase ID token must have 3 parts.",
        400,
        "INVALID_TOKEN_FORMAT"
      );
    }

    // Xác thực token Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Tìm user theo email
    let user = await User.findOne({ email });

    if (user) {
      // Nếu user có rồi → bổ sung thông tin Google nếu thiếu
      if (!user.googleId) {
        user.googleId = uid;
        user.avatar = picture || user.avatar;
        user.authType = "google";
        await user.save();
      }
    } else {
      // Nếu chưa có → tạo mới
      const randomPassword = Math.random().toString(36).slice(-8);

      user = await User.create({
        googleId: uid,
        email,
        name,
        avatar: picture,
        authType: "google",
        password: randomPassword,
      });
    }

    // Tạo token đăng nhập
    const tokens = generateTokens(user._id);

    // Lưu refresh token
    await User.findByIdAndUpdate(user._id, {
      refreshToken: tokens.refreshToken,
    });

    // Set cookie
    res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

    // Response
    return successResponse(res, "Đăng nhập thành công", {
      accessToken: tokens.accessToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("🚀 ~ googleLoginController ~ error:", error);

    // Lỗi token Không hợp lệ
    if (error.code === "auth/argument-error") {
      return errorResponse(
        res,
        "Invalid Firebase ID token format",
        400,
        "INVALID_TOKEN_FORMAT"
      );
    }

    // Token hết hạn
    if (error.code === "auth/id-token-expired") {
      return errorResponse(
        res,
        "Firebase ID token has expired",
        401,
        "TOKEN_EXPIRED"
      );
    }

    // Lỗi chung
    return errorResponse(res, "Authentication failed", 401, "AUTH_FAILED");
  }
};
