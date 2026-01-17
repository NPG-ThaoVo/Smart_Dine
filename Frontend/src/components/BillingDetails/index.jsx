import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { Spinner } from "../ui/spinner";
const BillingDetails = ({ open, onOpenChange, bill }) => {

    if (bill == null) {
        return <Spinner />;
    }
    else {
        // total: 879.992,3 ₫ => remove đ => 879.992,3
        console.log("🚀 ~ BillingDetails ~ bill:", bill)
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Receipt className="w-5 h-5" />Chi tiết bàn
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="bg-card border rounded-lg p-4">
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-bold">SMARTDINE</h2>
                                <p className="text-sm text-muted-foreground">Hóa đơn thanh toán</p>
                            </div>
                            <div className="text-sm space-y-1 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bàn:</span>
                                    <span className="font-medium">{bill.table}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Thời gian:</span>
                                    <span>{bill.time}</span>
                                </div>
                            </div>
                            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                            {/* <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>{bill.items[0].name}</span>
                                    <span>{bill.items[0].price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>{bill.items[1].name}</span>
                                    <span>{bill.items[1].price}</span>
                                </div>
                            </div> */}
                            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Tạm tính</span>
                                    <span>{bill.total} ₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>VAT (10%)</span>
                                    <span>{bill.total * 0.1}</span>
                                </div>
                                <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary">{bill.total + bill.total * 0.1} ₫</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => onOpenChange(false)}>
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }


};

export default BillingDetails;
