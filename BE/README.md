# Node.js CRUD MVC Backend

Backend API xây dựng bằng **Node.js**, **Express** và **MongoDB** theo mô hình **MVC**.  
Project phù hợp để học tập, làm đồ án hoặc phát triển các chức năng CRUD cơ bản.

---

## 🚀 Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors
- nodemon (dùng khi develop)

---

## 📁 Cấu trúc thư mục (tham khảo)

src/
├── config/ # Cấu hình (database)
├── controllers/ # Controller xử lý request
├── models/ # Schema MongoDB
├── routes/ # Định nghĩa API routes
├── utils/ # Hàm dùng chung (response)
├── app.js # Cấu hình express & middleware
└── server.js # Entry point, chạy server

yaml
Copy code

---

## ⚙️ Yêu cầu môi trường

- Node.js >= 18
- MongoDB (local hoặc MongoDB Atlas)

---

## 🔧 Cài đặt project

### 1️⃣ Clone repository

```bash
git clone <repository-url>
cd nodejs-crud-mvc
Cài đặt dependencies
npm install

🔐 Cấu hình biến môi trường

Tạo file .env ở thư mục gốc:

PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/nodejs_crud_mvc
FRONTEND_URL=http://localhost:3000

▶️ Chạy project
Chạy ở chế độ development (tự reload)
npm run dev

Chạy ở chế độ production
npm start


Server sẽ chạy tại:

http://localhost:3001

📡 API

Base URL:

/api


Ví dụ:

/api/users
/api/auth


(Tùy theo routes bạn định nghĩa)

📝 Ghi chú

Project sử dụng ES Module ("type": "module")

Đã cấu hình CORS để kết nối frontend

Dễ mở rộng thêm:

JWT Authentication

Socket.IO

Swagger API Documentation