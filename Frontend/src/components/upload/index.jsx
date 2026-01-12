import React, { useState, useRef } from "react";
import { Image, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function CloudinaryUpload({ onUpload, defaultImage, onRemove }) {
  const [preview, setPreview] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    } else {
      setPreview(null);
    }
  }, [defaultImage]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Định dạng file không được hỗ trợ. Vui lòng chọn .jpg, .jpeg, .png hoặc .webp");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn! Vui lòng chọn file dưới 5MB.");
      return;
    }
    setPreview(URL.createObjectURL(file));
    onUpload(file); // gửi file lên page
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    onUpload(null);
    if (onRemove) onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>Hình ảnh món</Label>
      <div className="relative w-32 h-32">
        <label className="w-full h-full border-2 border-dashed border-muted-foreground/25 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer gap-2 overflow-hidden relative block">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleUpload}
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Image className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                Thêm ảnh
              </span>
            </>
          )}
        </label>
        {preview && (
          <button
            onClick={handleRemove}
            type="button"
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        JPG, PNG hoặc WebP. Tối đa 5MB.
      </p>
    </div>
  );
}