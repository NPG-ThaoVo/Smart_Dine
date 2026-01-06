import {
  QrCode,
  TableProperties,
  UtensilsCrossed,
  Sparkles,
  Receipt,
  ChefHat,
} from "lucide-react";
import FeatureCard from "../FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tính năng nổi bật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<QrCode />}
            title="QR Order"
            desc="Khách hàng quét mã QR tại bàn để xem menu và đặt món trực tiếp"
          />
          <FeatureCard
            icon={<TableProperties />}
            title="Quản lý bàn"
            desc="Theo dõi trạng thái bàn realtime, tự động sinh QR code"
          />
          <FeatureCard
            icon={<UtensilsCrossed />}
            title="Quản lý menu"
            desc="CRUD món ăn, phân loại danh mục, cập nhật tình trạng"
          />
          <FeatureCard
            icon={<Sparkles />}
            title="AI Content"
            desc="Tự động tạo mô tả hấp dẫn và gợi ý upsell cho từng món"
          />
          <FeatureCard
            icon={<Receipt />}
            title="Tính bill"
            desc="Quản lý session, tổng hợp order và xuất hóa đơn"
          />
          <FeatureCard
            icon={<ChefHat />}
            title="Realtime Order"
            desc="Nhận đơn hàng ngay lập tức, cập nhật trạng thái nhanh chóng"
          />
        </div>
      </div>
    </section>
  );
}
