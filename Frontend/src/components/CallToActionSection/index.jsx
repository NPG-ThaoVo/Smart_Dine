import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <>
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Truy cập trang quản trị để quản lý nhà hàng của bạn
        </p>

        <Link
          to="/admin"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 transition"
        >
          Bắt đầu ngay
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="border-t py-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} SmartDine. Hệ thống quản lý nhà hàng thông
        minh.
      </footer>
    </>
  );
}
