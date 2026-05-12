import { useEffect, useMemo, useRef, useState } from "react";

const networkItems = [
  {
    id: "ethereum",
    name: "Ethereum",
    subName: "(ECR-20)",
    iconFile: "ico-ethereum.png"
  },
  {
    id: "solana",
    name: "Solana",
    subName: "SPL",
    iconFile: "ico-solana.png"
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    subName: "ONE",
    iconFile: "ico-arbitrum.png"
  }
];

const formatUsdcAmount = (amount) => {
  return `${amount.toLocaleString("en-US")}USDC`;
};

const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`;

const COPY_TOAST_MS = 2500;

function App() {
  const [selectedNetworkId, setSelectedNetworkId] = useState(null);
  const [step, setStep] = useState("select-network");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const copyToastTimerRef = useRef(null);
  const [remainingSeconds, setRemainingSeconds] = useState(47 * 3600 + 59 * 60 + 59);
  const isNextEnabled = selectedNetworkId !== null;
  const selectedNetwork = networkItems.find((item) => item.id === selectedNetworkId);
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const itemName = "spot-print shirt dress";
  const orderAmount = 1000000000;
  const displayOrderAmount = formatUsdcAmount(orderAmount);
  const formattedRemainingTime = useMemo(() => {
    const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }, [remainingSeconds]);

  useEffect(() => {
    if (step !== "order-success") {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [step]);

  // 주문 완료 단계를 벗어나면 복사 토스트 타이머 정리
  useEffect(() => {
    if (step === "order-success") {
      return;
    }
    if (copyToastTimerRef.current !== null) {
      window.clearTimeout(copyToastTimerRef.current);
      copyToastTimerRef.current = null;
    }
    setIsCopyToastVisible(false);
  }, [step]);

  useEffect(() => {
    return () => {
      if (copyToastTimerRef.current !== null) {
        window.clearTimeout(copyToastTimerRef.current);
      }
    };
  }, []);

  const handleCopyWalletAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      if (copyToastTimerRef.current !== null) {
        window.clearTimeout(copyToastTimerRef.current);
      }
      setIsCopyToastVisible(true);
      copyToastTimerRef.current = window.setTimeout(() => {
        setIsCopyToastVisible(false);
        copyToastTimerRef.current = null;
      }, COPY_TOAST_MS);
    } catch (error) {
      // 클립보드 API 미지원 환경 대응
      window.prompt("주소를 복사하세요.", address);
    }
  };

  return (
    <main className="fe-page">
      <section className="fe-mobile" aria-label="결제창">
        <header className="fe-header">
          <div className="fe-header-left" aria-label="서비스명">
            <img className="fe-logo" src={imagePath("logo.svg")} alt="Pesto" />
          </div>
          <button className="fe-close-button" type="button" aria-label="닫기">
            <img
              src={imagePath("ico-close.svg")}
              alt=""
            />
          </button>
        </header>

        {step === "select-network" ? (
          <>
            <section className="fe-amount-section" aria-labelledby="fe-amount">
              <p className="fe-amount-label">Pay</p>
              <h1 id="fe-amount" className="fe-amount-value">
                19.9 USDC
              </h1>
            </section>

            <div className="fe-divider" />

            <section className="fe-network-section" aria-labelledby="select-network-title">
              <h2 id="select-network-title" className="fe-network-title">
                Select Network
              </h2>
              <ul className="fe-network-list">
                {networkItems.map((item, idx) => {
                  const isSelected = selectedNetworkId === item.id;
                  const isLast = idx === networkItems.length - 1;

                  return (
                    <li key={item.id} className="fe-network-item">
                      <button
                        className="fe-network-button"
                        type="button"
                        onClick={() => setSelectedNetworkId(item.id)}
                        aria-pressed={isSelected}
                      >
                        <span className="fe-network-info">
                          <span className="fe-network-icon" aria-hidden="true">
                            <img
                              src={imagePath(item.iconFile)}
                              width={32}
                              height={32}
                              alt=""
                              decoding="async"
                            />
                          </span>
                          <span className="fe-network-texts">
                            <span className="fe-network-name">{item.name}</span>
                            <span className="fe-network-subname">{item.subName}</span>
                          </span>
                        </span>
                        <span className="fe-network-check" aria-hidden="true">
                          <img
                            src={
                              isSelected
                                ? imagePath("ico-check-circle-green-on.svg")
                                : imagePath("ico-check-circle-off.svg")
                            }
                            alt=""
                          />
                        </span>
                      </button>
                      {!isLast && <div className="fe-network-divider" aria-hidden="true" />}
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        ) : (
          <>
            <section className="fe-success-section" aria-labelledby="order-success-title">
              <img
                className="fe-success-icon"
                src={imagePath("ico-check-circle-green-on.svg")}
                alt=""
                aria-hidden="true"
              />
              <h1 id="order-success-title" className="fe-success-title">
                Order Placed Successfully!
              </h1>
            </section>
            <div className="fe-divider" />
            <section className="fe-detail-section" aria-label="주문 상세">
              <dl className="fe-detail-list">
                <div className="fe-detail-row">
                  <dt className="fe-detail-key">Item</dt>
                  <dd className="fe-detail-value">{itemName}</dd>
                </div>
                <div className="fe-detail-row">
                  <dt className="fe-detail-key">Amount</dt>
                  <dd className="fe-detail-value">{displayOrderAmount}</dd>
                </div>
              </dl>
              <div className="fe-detail-divider" />
              <dl className="fe-detail-list">
                <div className="fe-detail-row">
                  <dt className="fe-detail-key">Expires in</dt>
                  <dd className="fe-detail-value">{formattedRemainingTime}</dd>
                </div>
                <div className="fe-detail-row">
                  <dt className="fe-detail-key">Network</dt>
                  <dd className="fe-detail-value">{selectedNetwork?.name ?? "-"}</dd>
                </div>
                <div className="fe-detail-row is-address">
                  <dt className="fe-detail-key">Wallet adress</dt>
                  <dd className="fe-detail-value">
                    <span className="fe-wallet-address">{walletAddress}</span>
                    <div className="fe-action-buttons">
                      <button
                        className="fe-copy-button"
                        type="button"
                        onClick={() => handleCopyWalletAddress(walletAddress)}
                      >
                        <img className="fe-copy-icon" src={imagePath("ico-copy.svg")} alt="" />
                        Copy
                      </button>
                      <button
                        className="fe-copy-button fe-wallet-qr-button"
                        type="button"
                        onClick={() => setIsQrModalOpen(true)}
                      >
                        <img className="fe-qr-icon" src={imagePath("ico-qr.svg")} alt="" />
                        QR
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </section>
          </>
        )}

        <footer className="fe-footer">
          <div className="fe-footer-inner">
            <button
              className="fe-next-button"
              type="button"
              disabled={step === "select-network" ? !isNextEnabled : false}
              onClick={() => {
                if (step === "select-network" && !isNextEnabled) {
                  return;
                }

                if (step === "select-network") {
                  setStep("order-success");
                  return;
                }

                window.location.href = "../landing/pages/complete.html";
              }}
            >
              {step === "select-network" ? "Next" : "Done"}
            </button>
          </div>
        </footer>

        {/* Toast_Notification / Type2 — Copy 성공 시 (피그마 301:312) */}
        {isCopyToastVisible && (
          <div className="fe-toast-layer" aria-live="polite" role="status">
            <div className="fe-toast-wrap">
              <p className="fe-toast-text">Copied to clipboard</p>
            </div>
          </div>
        )}

        {isQrModalOpen && (
          <div
            className="fe-qr-modal-layer"
            role="dialog"
            aria-modal="true"
            aria-label="QR 코드 팝업"
          >
            <div className="fe-qr-modal-dim" onClick={() => setIsQrModalOpen(false)} />
            <section className="fe-qr-modal-card">
              <div className="fe-qr-modal-header">
                <button
                  className="fe-close-button"
                  type="button"
                  aria-label="닫기"
                  onClick={() => setIsQrModalOpen(false)}
                >
                  <img src={imagePath("ico-close.svg")} alt="" />
                </button>
              </div>
              <div className="fe-qr-modal-content">
                <h2 className="fe-qr-modal-title">
                  <span>Scan with</span>
                  <span>your crypto wallet</span>
                </h2>
                <div className="fe-qr-image-placeholder" aria-hidden="true" />
                <div className="fe-qr-address-box">
                  <p className="fe-qr-network">{selectedNetwork?.name ?? "Ethereum"}</p>
                  <p className="fe-qr-address">{walletAddress}</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
