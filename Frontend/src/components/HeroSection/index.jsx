import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
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
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md text-lg px-8 transition"
            >
              Vào trang quản trị
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/order/1"
              className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md text-lg px-8 transition"
            >
              Xem demo order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
