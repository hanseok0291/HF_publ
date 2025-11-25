"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ReasonFormType } from "@/schema/collector/reason/Reason.schema";
import useReasonData from "@/stores/useReasonData";
import { validateImageFile } from "@/utils/imageUtils";
import { FileWithPreview } from "../[id]/_components/ReasonClient";

function ReasonPhoto({ maxPhoto = 10 }: { maxPhoto?: number }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, getValues } = useFormContext<ReasonFormType>();
  const { fields, append, remove, replace } = useFieldArray<ReasonFormType>({
    control,
    name: "files"
  });

  const { files, setFiles } = useReasonData();

  // store에 데이터가 있을 때만 한 번 필드 초기화
  useEffect(() => {
    if (files?.length > 0 && fields.length === 0) {
      replace(files);
      console.log("store 데이터로 필드 초기화:", files);
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("adminUploadFileList");
    if (storedData) {
      try {
        const urlList = JSON.parse(storedData);

        // URL 배열을 FileWithPreview 형식으로 변환
        const fileDataList: FileWithPreview[] = urlList.map((url: any) => ({
          preview: url,
          isUrl: true, // URL인지 구분하기 위한 플래그 추가
          file: null // 실제 파일은 없음
        }));

        replace(fileDataList);
        setFiles(fileDataList);
        console.log("localStorage URL 데이터로 필드 초기화:", fileDataList);
      } catch (error) {
        console.error("localStorage 데이터 파싱 오류:", error);
      }
    }
  }, [replace, setFiles]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      try {
        validateImageFile(file);

        const currentFiles = getValues("files") || [];
        if (currentFiles.length >= maxPhoto) {
          alert(`이미지는 최대 ${maxPhoto}개까지만 업로드 가능합니다.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;

          // FileData 형식으로 append
          const fileData: FileWithPreview = {
            file: file,
            preview: preview
          };
          console.log("fileData:", fileData);
          append(fileData);

          // setTimeout 대신 비동기로 처리
          Promise.resolve().then(() => {
            const updatedFiles = getValues("files") || [];
            setFiles(updatedFiles);
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("이미지 처리 중 오류:", error);
        alert("이미지 파일이 유효하지 않습니다.");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [append, getValues, maxPhoto, setFiles]
  );

  const handleAddImage = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveImage = useCallback(
    (index: number) => {
      remove(index);

      // 제거 후 상태 업데이트
      Promise.resolve().then(() => {
        const updatedFiles = getValues("files") || [];
        setFiles(updatedFiles);
      });
    },
    [remove, getValues, setFiles]
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[4px]">
        <Label className="font-bold text-[16px]">앨범</Label>
        <span className="text-[12px] text-gray80">
          ({fields.length}/{maxPhoto})
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
        {fields.length < maxPhoto && (
          <Button
            type="button"
            className="flex w-[100px] h-[100px] items-center justify-center gap-2 bg-gray20 hover:bg-gray30 p-4"
            onClick={handleAddImage}
          >
            <Plus className="w-6 h-6" color="#A5A5A5" />
          </Button>
        )}
        {fields.map((field, index) => {
          // field를 FileData로 타입 단언
          const fileData = field as unknown as FileWithPreview;

          return (
            <div key={field.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 relative">
                <div className="w-[100px] h-[100px] relative">
                  {!fileData.preview ? (
                    <Skeleton className="w-[100px] h-[100px]" />
                  ) : (
                    <Image
                      src={fileData.isUrl ? fileData.preview : fileData.preview}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <Button
                  type="button"
                  className="w-[20px] h-[20px] absolute right-2 top-2 bg-red-500 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default memo(ReasonPhoto);
