import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Download, Printer } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
export function DialogQR({ open, onOpenChange, table }) {
  if (!table) return null;
  const qrValue = `${import.meta.env.VITE_API_URL}/table/${table._id}`;
  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas");
    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = `QR_${table.number}.png`;
    a.click();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form>
          <DialogHeader>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2
                id="radix-:rj:"
                className="text-lg font-semibold leading-none tracking-tight text-center"
              >
                QR Code - Bàn {table.number}
                <span className="text-muted-foreground ml-2">
                  ({table.name})
                </span>
              </h2>
            </div>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <QRCodeCanvas id="qr-canvas" value={qrValue} size={200} />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Khách hàng quét mã này để đặt món
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                className="bg-gray-100 text-black hover:bg-[#e9560c]/10 hover:text-[#e9560c] "
              >
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
              <Button className="bg-[#e9560c] text-white hover:bg-[#e9560c]/90 ">
                <Printer className="w-4 h-4 mr-2" />
                In QR
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
