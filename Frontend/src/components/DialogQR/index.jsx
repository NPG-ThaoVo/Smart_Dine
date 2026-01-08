import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Printer } from "lucide-react";

export function DialogQR({ open, onOpenChange, handleDownload }) {
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
                QR Code - Bàn 1
                <span className="text-muted-foreground ml-2">(Bàn cửa sổ)</span>
              </h2>
            </div>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <svg
                height="200"
                width="200"
                viewBox="0 0 45 45"
                role="img"
                id="qr-code-svg"
              >
                <path
                  fill="#FFFFFF"
                  d="M0,0 h45v45H0z"
                  shape-rendering="crispEdges"
                ></path>
                <path
                  fill="#000000"
                  d="M4 4h7v1H4zM13 4h2v1H13zM21 4h1v1H21zM27 4h1v1H27zM29 4h3v1H29zM34,4 h7v1H34zM4 5h1v1H4zM10 5h1v1H10zM12 5h1v1H12zM16 5h1v1H16zM19 5h2v1H19zM22 5h1v1H22zM26 5h1v1H26zM28 5h1v1H28zM30 5h1v1H30zM32 5h1v1H32zM34 5h1v1H34zM40,5 h1v1H40zM4 6h1v1H4zM6 6h3v1H6zM10 6h1v1H10zM14 6h1v1H14zM16 6h1v1H16zM19 6h3v1H19zM23 6h1v1H23zM25 6h1v1H25zM27 6h1v1H27zM30 6h2v1H30zM34 6h1v1H34zM36 6h3v1H36zM40,6 h1v1H40zM4 7h1v1H4zM6 7h3v1H6zM10 7h1v1H10zM13 7h1v1H13zM18 7h4v1H18zM23 7h2v1H23zM29 7h4v1H29zM34 7h1v1H34zM36 7h3v1H36zM40,7 h1v1H40zM4 8h1v1H4zM6 8h3v1H6zM10 8h1v1H10zM13 8h2v1H13zM17 8h1v1H17zM19 8h4v1H19zM24 8h2v1H24zM27 8h1v1H27zM29 8h3v1H29zM34 8h1v1H34zM36 8h3v1H36zM40,8 h1v1H40zM4 9h1v1H4zM10 9h1v1H10zM12 9h4v1H12zM19 9h2v1H19zM22 9h1v1H22zM24 9h1v1H24zM27 9h2v1H27zM30 9h1v1H30zM32 9h1v1H32zM34 9h1v1H34zM40,9 h1v1H40zM4 10h7v1H4zM12 10h1v1H12zM14 10h1v1H14zM16 10h1v1H16zM18 10h1v1H18zM20 10h1v1H20zM22 10h1v1H22zM24 10h1v1H24zM26 10h1v1H26zM28 10h1v1H28zM30 10h1v1H30zM32 10h1v1H32zM34,10 h7v1H34zM12 11h1v1H12zM15 11h4v1H15zM21 11h1v1H21zM24 11h5v1H24zM8 12h4v1H8zM14 12h1v1H14zM16 12h3v1H16zM21 12h1v1H21zM23 12h2v1H23zM27 12h2v1H27zM30 12h3v1H30zM34 12h2v1H34zM39 12h1v1H39zM4 13h3v1H4zM8 13h2v1H8zM15 13h1v1H15zM19 13h2v1H19zM23 13h1v1H23zM26 13h1v1H26zM30 13h4v1H30zM36 13h1v1H36zM39 13h1v1H39zM6 14h3v1H6zM10 14h1v1H10zM12 14h2v1H12zM15 14h6v1H15zM22 14h1v1H22zM24 14h3v1H24zM28 14h4v1H28zM33 14h1v1H33zM35 14h4v1H35zM6 15h2v1H6zM9 15h1v1H9zM15 15h3v1H15zM20 15h2v1H20zM25 15h1v1H25zM30 15h2v1H30zM33 15h1v1H33zM35 15h2v1H35zM38 15h1v1H38zM4 16h1v1H4zM7 16h1v1H7zM9 16h2v1H9zM12 16h2v1H12zM15 16h2v1H15zM18 16h1v1H18zM21 16h1v1H21zM23 16h1v1H23zM27 16h1v1H27zM33 16h2v1H33zM37,16 h4v1H37zM7 17h1v1H7zM9 17h1v1H9zM12 17h1v1H12zM15 17h2v1H15zM18 17h1v1H18zM20 17h2v1H20zM27 17h2v1H27zM31 17h3v1H31zM36 17h1v1H36zM38 17h2v1H38zM5 18h1v1H5zM7 18h1v1H7zM10 18h5v1H10zM16 18h2v1H16zM22 18h2v1H22zM25 18h1v1H25zM28 18h1v1H28zM30 18h3v1H30zM36 18h3v1H36zM5 19h1v1H5zM12 19h2v1H12zM16 19h3v1H16zM20 19h1v1H20zM23 19h1v1H23zM27 19h2v1H27zM30 19h1v1H30zM32 19h2v1H32zM35 19h2v1H35zM38 19h1v1H38zM4 20h1v1H4zM8 20h1v1H8zM10 20h1v1H10zM13 20h2v1H13zM16 20h1v1H16zM18 20h1v1H18zM21 20h2v1H21zM24 20h1v1H24zM26 20h1v1H26zM28 20h1v1H28zM33 20h3v1H33zM37 20h2v1H37zM40,20 h1v1H40zM4 21h2v1H4zM8 21h2v1H8zM11 21h3v1H11zM19 21h1v1H19zM22 21h3v1H22zM27 21h1v1H27zM29 21h4v1H29zM36 21h1v1H36zM10 22h1v1H10zM15 22h4v1H15zM20 22h2v1H20zM24 22h3v1H24zM28 22h1v1H28zM30 22h3v1H30zM35 22h1v1H35zM37 22h1v1H37zM4 23h2v1H4zM7 23h2v1H7zM14 23h4v1H14zM20 23h1v1H20zM22 23h2v1H22zM26 23h2v1H26zM30 23h1v1H30zM33 23h4v1H33zM38 23h1v1H38zM40,23 h1v1H40zM6 24h1v1H6zM8 24h3v1H8zM13 24h8v1H13zM23 24h3v1H23zM31 24h1v1H31zM33 24h2v1H33zM37 24h2v1H37zM4 25h1v1H4zM6 25h4v1H6zM11 25h1v1H11zM13 25h4v1H13zM18 25h1v1H18zM20 25h1v1H20zM23 25h1v1H23zM25 25h1v1H25zM28 25h1v1H28zM30 25h2v1H30zM36 25h1v1H36zM39 25h1v1H39zM5 26h1v1H5zM7 26h1v1H7zM10 26h1v1H10zM14 26h2v1H14zM17 26h1v1H17zM19 26h6v1H19zM27 26h7v1H27zM37 26h1v1H37zM4 27h1v1H4zM8 27h2v1H8zM12 27h2v1H12zM15 27h4v1H15zM20 27h1v1H20zM22 27h1v1H22zM24 27h1v1H24zM26 27h3v1H26zM30 27h1v1H30zM32 27h4v1H32zM38 27h1v1H38zM5 28h1v1H5zM10 28h2v1H10zM13 28h7v1H13zM22 28h2v1H22zM25 28h2v1H25zM28 28h1v1H28zM30 28h2v1H30zM33 28h3v1H33zM38 28h1v1H38zM40,28 h1v1H40zM4 29h4v1H4zM9 29h1v1H9zM11 29h1v1H11zM14 29h1v1H14zM18 29h1v1H18zM21 29h1v1H21zM23 29h2v1H23zM26 29h1v1H26zM29 29h1v1H29zM31 29h2v1H31zM36 29h1v1H36zM39 29h1v1H39zM6 30h3v1H6zM10 30h1v1H10zM12 30h1v1H12zM15 30h1v1H15zM17 30h4v1H17zM23 30h3v1H23zM29 30h1v1H29zM31 30h3v1H31zM35 30h4v1H35zM7 31h1v1H7zM9 31h1v1H9zM13 31h2v1H13zM19 31h1v1H19zM22 31h1v1H22zM26 31h1v1H26zM28 31h1v1H28zM30 31h2v1H30zM34,31 h7v1H34zM4 32h2v1H4zM8 32h6v1H8zM16 32h1v1H16zM19 32h1v1H19zM21 32h4v1H21zM27 32h2v1H27zM32 32h5v1H32zM38 32h1v1H38zM12 33h4v1H12zM18 33h1v1H18zM22 33h1v1H22zM25 33h3v1H25zM29 33h4v1H29zM36 33h2v1H36zM4 34h7v1H4zM12 34h3v1H12zM17 34h1v1H17zM21 34h1v1H21zM23 34h1v1H23zM26 34h2v1H26zM32 34h1v1H32zM34 34h1v1H34zM36 34h3v1H36zM4 35h1v1H4zM10 35h1v1H10zM12 35h1v1H12zM14 35h2v1H14zM17 35h9v1H17zM28 35h1v1H28zM30 35h1v1H30zM32 35h1v1H32zM36 35h1v1H36zM38 35h1v1H38zM4 36h1v1H4zM6 36h3v1H6zM10 36h1v1H10zM12 36h3v1H12zM16 36h4v1H16zM25 36h1v1H25zM27 36h2v1H27zM32 36h8v1H32zM4 37h1v1H4zM6 37h3v1H6zM10 37h1v1H10zM13 37h1v1H13zM15 37h1v1H15zM18 37h3v1H18zM28 37h1v1H28zM31 37h1v1H31zM34 37h2v1H34zM37 37h1v1H37zM4 38h1v1H4zM6 38h3v1H6zM10 38h1v1H10zM14 38h1v1H14zM17 38h2v1H17zM21 38h8v1H21zM30 38h1v1H30zM32 38h1v1H32zM34 38h1v1H34zM37 38h3v1H37zM4 39h1v1H4zM10 39h1v1H10zM13 39h1v1H13zM15 39h3v1H15zM19 39h1v1H19zM21 39h7v1H21zM31 39h1v1H31zM33 39h3v1H33zM37 39h3v1H37zM4 40h7v1H4zM13 40h1v1H13zM16 40h1v1H16zM19 40h4v1H19zM25 40h1v1H25zM28 40h1v1H28zM30 40h2v1H30zM33 40h2v1H33zM36 40h1v1H36zM38,40 h3v1H38z"
                  shape-rendering="crispEdges"
                ></path>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Khách hàng quét mã này để đặt món
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  handleDownload();
                  handleClick();
                }}
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
