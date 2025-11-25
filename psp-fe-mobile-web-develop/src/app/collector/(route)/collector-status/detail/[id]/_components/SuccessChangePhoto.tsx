"use client";

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  deleteWastetPhoto,
  getWasteCollectionDetail,
  postWastePhoto
} from "@/apis/collector/collector-status/collectorStatusApis";
import { toast } from "@/hooks/use-toast";
import ChangePhoto from "./ChangePhoto";

// 사진 폼 타입 정의
type PhotoFormType = {
  files: { file: File }[];
};

// API 요청 파라미터 타입 정의
type SuccessPostPhotoParam = {
  wasteCollectionRequestId: string;
  files: File[];
};

export default function SuccessChangePhoto({
  requestId,
  detailData,
  onPhotoUpdate
}: {
  requestId: string;
  detailData: WasteCollectorDetailType;
  onPhotoUpdate?: () => void; // 사진 업데이트 콜백 추가
}) {
  const router = useRouter();
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  // PhotoFormType을 사용하는 폼으로 변경
  const form = useForm<PhotoFormType>({
    defaultValues: {
      files: []
    }
  });

  const { formState, watch, setValue } = form;
  const watchFiles = watch("files");

  // 컴포넌트 마운트 시 기존 이미지 로드
  useEffect(() => {
    if (
      detailData?.adminUploadFileList &&
      Array.isArray(detailData.adminUploadFileList)
    ) {
      setExistingPhotos(detailData.adminUploadFileList);
    }
  }, [detailData]);

  // 파일이 변경될 때마다 자동 저장 로직
  useEffect(() => {
    // 파일이 있고 제출 중이 아닐 때만 저장 실행
    if (watchFiles.length > 0) {
      handleSavePhotos();
    }
  }, [watchFiles]);

  const handleSavePhotos = async () => {
    try {
      const fileObjects = watchFiles.map((fileItem) => fileItem.file);

      // SuccessPostPhotoParam 타입으로 변환
      const submitData: SuccessPostPhotoParam = {
        wasteCollectionRequestId: requestId,
        files: fileObjects
      };
      console.log("Saving photos:", submitData);
      await postWastePhoto(submitData);
      toast({
        title: "성공",
        description: "사진이 성공적으로 저장되었습니다."
      });

      // 폼 초기화
      setValue("files", []);

      // 데이터 다시 불러오기
      const updatedData = await getWasteCollectionDetail({
        requestId: requestId
      });
      if (updatedData.content?.adminUploadFileList) {
        setExistingPhotos(updatedData.content.adminUploadFileList);
      }

      // 부모 컴포넌트에 업데이트 알림
      if (onPhotoUpdate) {
        onPhotoUpdate();
      }
    } catch (error: any) {
      toast({
        description: `${(error as ApiError).message ?? "사진 등록에 실패 했습니다."}`
      });
    }
  };

  const onSubmit = async (data: PhotoFormType) => {
    try {
      const fileObjects = data.files.map((fileItem) => fileItem.file);

      const submitData: SuccessPostPhotoParam = {
        wasteCollectionRequestId: requestId,
        files: fileObjects
      };

      await postWastePhoto(submitData);

      // 부모 컴포넌트에 업데이트 알림
      if (onPhotoUpdate) {
        onPhotoUpdate();
      }

      router.push("/collector/collector-status");
    } catch (error: any) {
      toast({
        description: `${(error as ApiError).message}`
      });
    }
  };

  // 문자열에서 id 값을 추출하는 함수
  const extractIdFromString = (str: string): string | null => {
    // id= 다음에 오는 값을 추출하는 정규식
    const idMatch = str.match(/[?&]id=([^&]*)/);
    return idMatch ? idMatch[1] : null;
  };

  const handleDeletePhoto = async (index: number, isExisting: boolean) => {
    try {
      if (isExisting) {
        // 기존 이미지 삭제 (서버에 저장된 이미지)
        // 삭제할 이미지 URL 가져오기
        const imageUrl = existingPhotos[index];
        console.log("Image URL to delete:", imageUrl);

        // 이미지 URL에서 id 값 추출
        const imageId = extractIdFromString(imageUrl);
        console.log("Extracted ID:", imageId);

        // 삭제할 이미지를 제외한 나머지 이미지 목록 생성
        const updatedExistingPhotos = [...existingPhotos];
        updatedExistingPhotos.splice(index, 1);
        setExistingPhotos(updatedExistingPhotos);

        // 서버에 삭제 요청 보내기
        await deleteWastetPhoto({
          fileId: imageId || ""
        });

        toast({
          description: "사진이 성공적으로 삭제되었습니다."
        });

        // 부모 컴포넌트에 업데이트 알림
        if (onPhotoUpdate) {
          onPhotoUpdate();
        }
      } else {
        // 새로 추가한 이미지 삭제 (아직 서버에 저장되지 않은 이미지)
        const newFiles = [...watchFiles];
        newFiles.splice(index, 1);
        setValue("files", newFiles);
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        description: `${(error as ApiError).message ?? "사진 삭제에 실패했습니다."}`
      });
    }
  };

  const handleClose = () => {
    router.push("/collector/collector-status");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ChangePhoto
          detailData={{
            ...detailData,
            adminUploadFileList: existingPhotos
          }}
          maxPhoto={3}
          onDeletePhoto={handleDeletePhoto}
          canAddMore={existingPhotos.length + watchFiles.length < 3}
        />
      </form>
    </FormProvider>
  );
}
