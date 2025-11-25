"use client";

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { FileWithPreviewType } from "@/schema/collector/reason/Reason.schema";
import { validateImageFile } from "@/utils/imageUtils";

// 폼 타입 정의
interface PhotoFormType {
  files: FileWithPreviewType[];
}

export default function ChangePhoto({
  maxPhoto = 10,
  detailData,
  onDeletePhoto,
  canAddMore = true
}: {
  maxPhoto?: number;
  detailData?: WasteCollectorDetailType;
  onDeletePhoto?: (index: number, isExisting: boolean) => void;
  canAddMore?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, getValues } = useFormContext<PhotoFormType>();
  const { fields, append, remove } = useFieldArray<PhotoFormType>({
    control,
    name: "files"
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      validateImageFile(file);

      // 현재 폼의 필드와 서버에 저장된 이미지의 총 개수 확인
      const currentFiles = getValues("files") || [];
      const existingPhotosCount = detailData?.adminUploadFileList?.length || 0;
      const totalCount = currentFiles.length + existingPhotosCount;

      if (totalCount >= maxPhoto) {
        toast({
          description: `이미지는 최대 ${maxPhoto}개까지만 업로드 가능합니다.`
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;

        // FileWithPreviewType 형식으로 append
        const fileData: FileWithPreviewType = {
          file: file,
          preview: preview
        };

        append(fileData);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      toast({
        title: "이미지 처리 오류",
        description: "이미지 파일이 유효하지 않습니다.",
        variant: "destructive"
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    if (onDeletePhoto) {
      onDeletePhoto(index, true);
    } else {
      console.log("삭제 함수가 제공되지 않았습니다:", index);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    remove(index);
  };

  if (!detailData) return null;

  const existingPhotosCount = detailData.adminUploadFileList?.length || 0;
  const totalCount = existingPhotosCount + fields.length;
  const hasAdminFiles = existingPhotosCount > 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[4px]">
        <Label className="font-bold text-[16px]">앨범</Label>
        <span className="text-[12px] text-gray80">
          ({totalCount}/{maxPhoto})
        </span>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      <section className="grid grid-cols-3 mt-[12px] gap-[12px]">
        {canAddMore && totalCount < maxPhoto && (
          <Button
            type="button"
            className="flex w-[100px] h-[100px] items-center justify-center gap-2 bg-gray20 hover:bg-gray30 p-4"
            onClick={handleAddImage}
          >
            <Plus className="w-6 h-6" color="#A5A5A5" />
          </Button>
        )}

        {/* 사용자가 새로 업로드한 이미지 표시 */}
        {fields.map((field, index) => {
          const fileData = field as unknown as FileWithPreviewType;
          return (
            <div key={field.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <div className="w-[100px] h-[100px] relative">
                  {fileData.preview ? (
                    <Image
                      src={fileData.preview}
                      alt={`사용자 ${index + 1}번째 이미지`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Skeleton className="w-[100px] h-[100px]" />
                  )}
                </div>
                <Button
                  type="button"
                  className="w-[20px] h-[20px] absolute right-2 top-2 bg-red-500 rounded-full p-0"
                  onClick={() => handleRemoveNewImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}

        {/* 서버에 이미 저장된 이미지 표시 */}
        {hasAdminFiles &&
          detailData.adminUploadFileList.map((item, index) => (
            <div key={`existing-${index}`} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <div className="w-[100px] h-[100px] relative">
                  <Image
                    src={item}
                    alt={`관리자 ${index + 1}번째 이미지`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  className="w-[20px] h-[20px] absolute right-2 top-2 bg-red-500 rounded-full p-0"
                  onClick={() => handleRemoveExistingImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
