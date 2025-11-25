// import Image from "next/image";
// import { useShallow } from "zustand/react/shallow";
// import useNoticeTap from "@/stores/useNoticeTap";

// const NoticeTrue = () => {
//   const { noticeId, } = useNoticeTap(
//     useShallow((state) => ({
//       noticeId: state.noticeId,
//     }))
//   );

//   // 현재 noticeId에 해당하는 fixPin 상태 찾기
//   const currentFixPin =
//     isFixPin.find((item) => item.id === noticeId)?.fixPin ?? false;

//   return (
//     <div>
//       <div className="flex flex-col p-[1.25rem] gap-[0.75rem]">
//         <div className="flex justify-between">
//           <p className="p-[0.1rem] w-[5.3rem] text-center text-[0.75rem] rounded-xl bg-[#F4F4F4] text-[#777777]">
//             경기도 하남시
//           </p>
//           {currentFixPin && (
//             <Image src="/icons/pin.svg" alt="pin" width={20} height={20} />
//           )}
//         </div>
//         <div className="flex flex-col gap-[0.5rem]">
//           <p className="text-[1rem] font-medium">
//             {noticeId} FAQ 제목 노출 영역
//           </p>
//           <div className="flex gap-1">
//             <p className="text-[0.75rem] font-normal text-[#777]">
//               김**(kim***@email.com)
//             </p>
//             <p className="text-[0.75rem] text-[#DDD]">|</p>
//             <p className="text-[0.75rem] font-normal text-[#777]">YYYY-MM-DD</p>
//           </div>
//         </div>
//         <p className="text-[0.875rem]">
//           공지사항 게시글 내용 노출되는 영역 공지사항 게시글 내용 노출되는 영역
//           공지사항 게시글 내용 노출되는 영역 공지사항 게시글 내용 노출되는 영역
//           공지사항 게시글 내용 노출되는 영역 공지사항 게시글 내용 노출되는 영역
//           공지사항 게시글 내용 노출되는 영역 공지사항 게시글 내용 노출되는 영역
//           공지사항 게시글 내용 노출되는 영역
//         </p>
//       </div>
//       <hr className="h-2 bg-[#F4F4F4] border-0" />
//     </div>
//   );
// };

// export default NoticeTrue;
