import theme from "@/styles/theme";

export function CheckIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="Icon / check">
        <path
          data-name="Path 10"
          d="M9.122.335a1.071 1.071 0 0 1 1.556 0 1.176 1.176 0 0 1 .092 1.509l-.092.108-5.5 5.714a1.07 1.07 0 0 1-1.452.1l-.1-.1L.322 4.237a1.175 1.175 0 0 1 0-1.616 1.07 1.07 0 0 1 1.452-.1l.1.1L4.4 5.24z"
          transform="translate(3 4)"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function AlretIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      data-name="icon / arlet"
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <circle data-name="타원 997" cx="8" cy="8" r="8" fill={color} />
      <path
        data-name="패스 7951"
        d="m1.076-9.9.16 6.042h1.525l.16-6.042zM2-1.173a1.015 1.015 0 0 0 1-1 1.014 1.014 0 0 0-1-.994.991.991 0 0 0-1 .997.992.992 0 0 0 1 .997z"
        transform="translate(6 13.9)"
        fill="#fff"
      />
    </svg>
  );
}

export function ArrowDownIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="btn / arr-down_bk">
        <path
          data-name="Path 3"
          d="M.293.293A1 1 0 0 1 1.613.21l.094.083L5 3.585 8.293.293A1 1 0 0 1 9.613.21l.094.083a1 1 0 0 1 .083 1.32l-.083.094-4 4a1 1 0 0 1-1.32.083l-.094-.083-4-4a1 1 0 0 1 0-1.414z"
          transform="translate(3 6)"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function ArrowLeftIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="btn / arr-left_bk">
        <path
          data-name="Path 3"
          d="M.293 9.707a1 1 0 0 0 1.32.083l.094-.083 4-4a1 1 0 0 0 .083-1.32l-.083-.094-4-4a1 1 0 0 0-1.5 1.32l.083.094L3.585 5 .293 8.293a1 1 0 0 0-.083 1.32z"
          transform="rotate(180 5 6.5)"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function ArrowRightIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      data-name="btn / arr-right_bk"
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <path
        data-name="Path 3"
        d="M.293.293A1 1 0 0 1 1.613.21l.094.083 4 4a1 1 0 0 1 .083 1.32l-.083.094-4 4a1 1 0 0 1-1.5-1.32l.083-.094L3.585 5 .293 1.707A1 1 0 0 1 .21.387z"
        transform="translate(6 3)"
        fill={color}
      />
    </svg>
  );
}

export function ArrowUpIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="btn / arr-up_bk">
        <path
          data-name="Path 3"
          d="M.293 5.707a1 1 0 0 0 1.32.083l.094-.083L5 2.415l3.293 3.292a1 1 0 0 0 1.32.083l.094-.083a1 1 0 0 0 .083-1.32l-.083-.094-4-4A1 1 0 0 0 4.387.21l-.094.083-4 4a1 1 0 0 0 0 1.414z"
          transform="translate(3 5)"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function CheckSquareIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 20 20"
    >
      <g data-name="btn_checkbox_bold_n" fill={color}>
        <rect width="20" height="20" rx="4" />
        <rect x="1" y="1" width="18" height="18" rx="3" />
      </g>
      <path
        data-name="Path 10"
        d="M8.293.293a1 1 0 0 1 1.5 1.32l-.083.094-5 5a1 1 0 0 1-1.32.083l-.094-.083-3-3a1 1 0 0 1 1.32-1.5l.094.083L4 4.585z"
        transform="translate(5 7)"
        fill="#fff"
      />
    </svg>
  );
}

export function DelIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="btn / del_gr">
        <path
          data-name="Path 3"
          d="M8.293 3.707 5 .415 1.707 3.707l-.095.083a1 1 0 0 1-1.32-1.5L3.586-1 .293-4.293a1 1 0 0 1 0-1.414 1 1 0 0 1 1.32-.084l.095.084L5-2.415l3.293-3.292a1 1 0 0 1 1.32-.084l.095.084a1 1 0 0 1 .082 1.319l-.083.095L6.414-1l3.293 3.293.083.094a1 1 0 0 1-.083 1.32l-.095.083a1 1 0 0 1-1.32-.083z"
          transform="translate(3 9)"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function HeartStrokeIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      id="_레이어_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 382.94 334.88"
      width={wd}
      height={ht}
    >
      <path
        fill={color}
        d="M3.41,83.17C16.43,32.41,63.35-2.38,115.6,.2c28.28,1.4,52.64,12.21,72.97,31.99,.88,.85,1.77,1.69,2.35,2.24,7.25-5.66,13.95-11.67,21.37-16.58,66.12-43.78,157.7-2.66,169.4,75.8,4.24,28.4-2.71,54.39-15.66,79.25-14.56,27.96-34.65,51.71-56.85,73.78-32.6,32.4-68.98,60.03-107.62,84.8-6.83,4.38-12.67,4.62-19.62,.19-45.52-29.01-87.89-61.84-124.33-101.88-19.4-21.31-36.33-44.34-47.5-71.18,0,0-17.22-32.58-6.69-75.43Zm355.77,25.13c-.33-2.82-.73-8.17-1.62-13.44-7.69-45.4-53.42-77.74-98.72-69.88-23.7,4.11-42.8,15.69-57.04,35.14-2.66,3.64-6,5.9-10.68,5.82-5.04-.08-8.11-3.08-10.91-6.85C151.7,20.79,97.67,12.63,59.33,40.8c-31.63,23.23-43.34,62.69-29.96,101.51,8.43,24.46,23.01,45.23,39.79,64.51,34.76,39.94,76.14,72.05,120.1,101.08,1.85,1.22,2.98,.89,4.6-.17,31.01-20.36,60.56-42.62,87.76-67.88,22.83-21.21,43.83-43.99,59.6-71.12,10.41-17.9,17.59-36.84,17.96-60.42Z"
      />
    </svg>
  );
}

export function HeartIcon({ color = "rgb(255, 43, 0)", wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 12.226 10.053"
    >
      <g data-name="icon / heart">
        <path
          fill={color}
          data-name="패스 7984"
          d="M11.616 1.5A3.306 3.306 0 0 0 8.991.009 3.3 3.3 0 0 0 6.553.8c-.145.123-.43.379-.44.377S5.819.927 5.674.8A3.3 3.3 0 0 0 3.236 0 3.306 3.306 0 0 0 .611 1.5 3.25 3.25 0 0 0 .28 4.723a7.009 7.009 0 0 0 1.593 2.253 19.176 19.176 0 0 0 4.01 3.016.467.467 0 0 0 .46 0 19.175 19.175 0 0 0 4.01-3.016 7.011 7.011 0 0 0 1.593-2.253 3.25 3.25 0 0 0-.33-3.223"
        />
      </g>
    </svg>
  );
}

export function InfoIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      data-name="icon / info"
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="타원 997">
        <circle cx="8" cy="8" r="8" fill={color} />
      </g>
      <path
        data-name="패스 7961"
        d="M-8.342-7.517A3.492 3.492 0 0 1-8.115-8.9a2.253 2.253 0 0 1 .833-.929 3.469 3.469 0 0 0 .737-.664 1.1 1.1 0 0 0 .226-.684 1.125 1.125 0 0 0-.39-.9 1.588 1.588 0 0 0-1.073-.337 1.569 1.569 0 0 0-.814.2 1.393 1.393 0 0 0-.52.52 1.516 1.516 0 0 0-.2.664h-.984a2.279 2.279 0 0 1 .337-1.136 2.271 2.271 0 0 1 .881-.823 2.668 2.668 0 0 1 1.285-.3 2.929 2.929 0 0 1 1.314.274 1.986 1.986 0 0 1 .842.751 2.048 2.048 0 0 1 .289 1.083 2.161 2.161 0 0 1-1.064 1.767 2.5 2.5 0 0 0-.626.568 1.642 1.642 0 0 0-.284.6 3.242 3.242 0 0 0-.072.732zm.491 2.291a.672.672 0 0 1-.5-.207.7.7 0 0 1-.2-.505.68.68 0 0 1 .2-.5.68.68 0 0 1 .5-.2.7.7 0 0 1 .505.2.672.672 0 0 1 .207.5.692.692 0 0 1-.2.51.692.692 0 0 1-.512.202z"
        transform="translate(15.796 17.284)"
        fill="#fff"
      />
    </svg>
  );
}

export function MarkIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="icon / mark">
        <g data-name="타원 1138">
          <circle cx="8" cy="8" r="8" fill={color} />
        </g>
        <path
          data-name="패스 7967"
          d="m1.076-9.9.16 6.042h1.525l.16-6.042zM2-1.173a1.015 1.015 0 0 0 1-1 1.014 1.014 0 0 0-1-.994.991.991 0 0 0-1 .997.992.992 0 0 0 1 .997z"
          transform="translate(6 13.9)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export function RefreshIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 11.787 13.47"
    >
      <path
        data-name="패스 27"
        d="M6.456.711a4.417 4.417 0 0 1 .813 2.554 4.45 4.45 0 0 1-4.445 4.446V6.44L0 8.346l2.824 1.905v-1.27a5.715 5.715 0 0 0 5.715-5.716A5.683 5.683 0 0 0 7.511 0z"
        transform="translate(3.248 3.219)"
        fill={color}
      />
      <path
        data-name="패스 28"
        d="M5.714 1.27a5.712 5.712 0 0 0-4.687 8.98l1.055-.711a4.44 4.44 0 0 1 3.632-7v1.27l2.823-1.904L5.714 0z"
        fill={color}
      />
    </svg>
  );
}

export function SearchIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      data-name="Icon / search_bk"
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 24 24"
    >
      <path
        data-name="Combined Shape"
        d="m18.387 19.79-.095-.083-3.678-3.678a9.009 9.009 0 1 1 1.414-1.414l3.678 3.678a1 1 0 0 1-1.32 1.5zM2 9a7 7 0 1 0 7-7 7.008 7.008 0 0 0-7 7z"
        transform="translate(2 2)"
        color={color}
      />
    </svg>
  );
}

export function ShareIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      width={wd}
      height={ht}
      id="_레이어_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 410.07 442.66"
    >
      <path
        fill={color}
        d="M325.87,28c30.83,0,55.92,25.09,55.92,55.92s-25.09,55.92-55.92,55.92-55.92-25.09-55.92-55.92,25.09-55.92,55.92-55.92m0-28c-46.35,0-83.92,37.57-83.92,83.92s37.57,83.92,83.92,83.92,83.92-37.57,83.92-83.92S372.21,0,325.87,0h0Z"
      />
      <path
        fill={color}
        d="M326.15,302.83c30.83,0,55.92,25.09,55.92,55.92s-25.09,55.92-55.92,55.92-55.92-25.09-55.92-55.92,25.09-55.92,55.92-55.92m0-28c-46.35,0-83.92,37.57-83.92,83.92s37.57,83.92,83.92,83.92,83.92-37.57,83.92-83.92-37.57-83.92-83.92-83.92h0Z"
      />
      <path
        fill={color}
        d="M83.92,165.41c30.83,0,55.92,25.09,55.92,55.92s-25.09,55.92-55.92,55.92-55.92-25.09-55.92-55.92,25.09-55.92,55.92-55.92m0-28C37.57,137.41,0,174.98,0,221.33s37.57,83.92,83.92,83.92,83.92-37.57,83.92-83.92-37.57-83.92-83.92-83.92h0Z"
      />
    </svg>
  );
}

export function TimerIcon({ color = theme.colors.darkGrey, wd, ht }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wd}
      height={ht}
      viewBox="0 0 16 16"
    >
      <g data-name="그룹 25">
        <path
          data-name="패스 18"
          d="M239.164 125.368a.6.6 0 0 1-.359-.12l-2.4-1.8a.6.6 0 0 1-.24-.479v-3.594a.6.6 0 1 1 1.2 0v3.294l2.156 1.617a.6.6 0 0 1-.36 1.078z"
          transform="translate(-228.715 -114.975)"
          fill={color}
        />
        <path
          data-name="패스 19"
          d="M8 16a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zM8 1.239A6.761 6.761 0 1 0 14.761 8 6.769 6.769 0 0 0 8 1.239z"
          fill={color}
        />
      </g>
    </svg>
  );
}
