# SmartDine - Hệ thống Quản lý Nhà hàng Thông minh

## 1. Tổng quan Dự án (Project Overview)

SmartDine là một nền tảng quản lý nhà hàng hiện đại, được thiết kế để tối ưu hóa quy trình từ lúc khách hàng vào bàn, đặt món đến khi thanh toán. Hệ thống hỗ trợ cả hai giao diện: **Admin** (cho nhân viên/quản lý) và **Customer** (cho khách hàng tự đặt món qua QR Code).

**Mục tiêu chính:**

- Tăng hiệu suất phục vụ và giảm sai sót trong khâu gọi món.
- Cung cấp trải nghiệm "premium" với giao diện hiện đại (Glassmorphism).
- Cập nhật trạng thái đơn hàng và bàn theo thời gian thực.

---

## 2. Kiến trúc Kỹ thuật (Technical Architecture)

- **Frontend:** React + Vite.
- **Styling:** Tailwind CSS, Shadcn UI (với phong cách Glassmorphism chủ đạo).
- **Backend/Database:** NodeJS, MongoDB.
- **Icons:** Lucide React.

---

## 3. Mô hình Dữ liệu (Data Models)

### 3.1. Tables (Bàn)

- `id`, `number`, `status` (`available`, `occupied`, `reserved`), `currentSessionId`.

### 3.2. Menu & Categories (Thực đơn & Danh mục)

- **Category:** `id`, `name`, `order`.
- **MenuItem:** `name`, `price`, `description`, `image`, `isAvailable`, `aiDescription`, `upsellSuggestion`.

### 3.3. Session & Orders (Phiên phục vụ & Đơn hàng)

- **Session:** Theo dõi một lượt phục vụ từ khi mở bàn đến khi đóng bill.
- **Order:** Một lần gọi món trong một Phiên. Trạng thái: `pending`, `confirmed`, `completed`, `cancelled`.
- **OrderItem:** Chi tiết món ăn trong đơn, bao gồm trạng thái riêng (`preparing`, `served`).

---

## 4. Các Phân hệ Chính (Core Modules)

### 4.1. Phân hệ Admin (Quản trị)

- **Dashboard:** Tổng quan số liệu doanh thu, trạng thái bàn và đơn hàng gần đây.
- **Quản lý Đơn hàng (Orders):** Tiếp nhận và xác nhận đơn hàng từ khách. Phân loại theo tab: Chờ xác nhận, Đang xử lý, Hoàn thành.
- **Quản lý Thực đơn (Menu):** Thêm/Xóa/Sửa món ăn. Tích hợp AI để tạo mô tả hấp dẫn và gợi ý bán thêm (Upsell).
- **Quản lý Hóa đơn (Bills):** Theo dõi lịch sử thanh toán, xem chi tiết hóa đơn, xuất báo cáo doanh thu.
- **Hệ thống Thông báo:** Cảnh báo thời gian thực khi có đơn mới hoặc yêu cầu từ bàn.

### 4.2. Phân hệ Customer (Khách hàng)

- **Menu kỹ thuật số:** Xem danh sách món ăn theo danh mục với hình ảnh và mô tả sinh động.
- **Giỏ hàng & Đặt món:** Thêm món, tùy chỉnh số lượng và gửi đơn trực tiếp đến bếp.
- **Theo dõi đơn hàng (Order Tracking):** Xem tiến độ chế biến món ăn theo timeline (Đã nhận -> Đang chuẩn bị -> Sắp xong -> Đã phục vụ).
- **Gọi nhân viên/Thanh toán:** Tích hợp nút hỗ trợ nhanh tại bàn.

---

## 5. Thiết kế UI/UX (Design System)

Dự án sử dụng ngôn ngữ thiết kế **Premium Dark Mode** kết hợp với **Glassmorphism**:

- **Nền (Background):** Sử dụng các hiệu ứng Gradient chuyển động (Animated Gradient).
- **Thẻ (Cards):** Lớp phủ kính (Glassmorphism) với độ mờ (Backdrop Blur) và viền trắng nhẹ.
- **Tương tác:** Sử dụng Micro-animations (pulse, hover effects) để tạo cảm giác sống động.
- **Màu sắc:** Primary (màu cam/vàng đặc trưng), Emerald (thanh toán/thành công), Rose (hủy đơn/cảnh báo).

---

## 6. Luồng Người dùng (User Flow)

1. **Khách hàng** quét mã QR tại bàn -> Truy cập trang đặt món.
2. **Khách hàng** chọn món -> Gửi đơn -> Đơn xuất hiện ngay lập tức trên giao diện **Admin**.
3. **Admin** xác nhận đơn -> Bếp chuẩn bị -> Khách hàng thấy tiến độ cập nhật trên trang **Tracking**.
4. **Admin** phục vụ món -> Đánh dấu hoàn thành đơn.
5. **Khách hàng** yêu cầu tính tiền -> **Admin** đóng Session -> In hóa đơn và giải phóng bàn về trạng thái `available`.

---

## 7. Cấu hình & Bảo mật

- **Routing:** Hỗ trợ Clean URL cho các trang Admin và Customer.
- **Responsive:** Hoạt động tốt trên cả Mobile (Khách hàng) và Desktop/Tablet (Admin).
