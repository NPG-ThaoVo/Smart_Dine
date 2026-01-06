import {
  ArrowRight,
  QrCode,
  TableProperties,
  UtensilsCrossed,
  Sparkles,
  Receipt,
  ChefHat,
} from "lucide-react";

export default function SmartDineLanding() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              🍜 SmartDine
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Hệ thống Order tại bàn thông minh với AI Content Generator
            </p>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Giúp khách hàng tự phục vụ và hỗ trợ chủ quán tự động hóa việc xây
              dựng nội dung Menu chuyên nghiệp thông qua AI
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admin"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md text-lg px-8 transition"
              >
                Vào trang quản trị
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/order/1"
                className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md text-lg px-8 transition"
              >
                Xem demo order
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tính năng nổi bật
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={<QrCode />}
              title="QR Order"
              desc="Khách hàng quét mã QR tại bàn để xem menu và đặt món trực tiếp"
            />
            <Feature
              icon={<TableProperties />}
              title="Quản lý bàn"
              desc="Theo dõi trạng thái bàn realtime, tự động sinh QR code"
            />
            <Feature
              icon={<UtensilsCrossed />}
              title="Quản lý menu"
              desc="CRUD món ăn, phân loại danh mục, cập nhật tình trạng"
            />
            <Feature
              icon={<Sparkles />}
              title="AI Content"
              desc="Tự động tạo mô tả hấp dẫn và gợi ý upsell cho từng món"
            />
            <Feature
              icon={<Receipt />}
              title="Tính bill"
              desc="Quản lý session, tổng hợp order và xuất hóa đơn"
            />
            <Feature
              icon={<ChefHat />}
              title="Realtime Order"
              desc="Nhận đơn hàng ngay lập tức, cập nhật trạng thái nhanh chóng"
            />
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Truy cập trang quản trị để quản lý nhà hàng của bạn
        </p>

        <a
          href="/admin"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 transition"
        >
          Bắt đầu ngay
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      <footer className="border-t py-8 text-center text-muted-foreground">
        © 2024 SmartDine. Hệ thống quản lý nhà hàng thông minh.
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-md hover:shadow-lg transition">
      <div className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
