export default function DownloadLoading() {
  return (
    <div>
      <svg
        className="animate-spin 1s repeat-infinite"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="#e5e7eb" stroke-width="2" />
        <path
          d="M22 12c0-5.523-4.477-10-10-10"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
}
