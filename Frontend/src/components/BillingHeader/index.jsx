export function BillingHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Quản lý hóa đơn
        </h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi doanh thu và lịch sử thanh toán
        </p>
      </div>
    </div>
  );
}
