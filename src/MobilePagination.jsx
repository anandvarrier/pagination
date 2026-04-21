import React, { useState } from "react";

// Modern SVG Icons
const ChevronLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 19L8 12L15 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5L16 12L9 19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function MobileApp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(null);
  const totalPages = 1000;

  const getPageRange = () => {
    let range = [];
    if (currentPage < 5) {
      range = [1, 2, 3, 4, 5, "dot-right", totalPages];
    } else if (currentPage > totalPages - 4) {
      range = [
        1,
        "dot-left",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      range = [
        1,
        "dot-left",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "dot-right",
        totalPages,
      ];
    }
    return range;
  };

  const handleJump = (amount) => {
    setCurrentPage((prev) => Math.max(1, Math.min(totalPages, prev + amount)));
    setShowMenu(null);
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val === "" || (parseInt(val) >= 1 && parseInt(val) <= totalPages)) {
      setCurrentPage(val === "" ? "" : parseInt(val));
    }
  };

  return (
    <div style={styles.screenWrapper}>
      <div style={styles.mobileCard}>
        {/* TOP ROW: Arrows & Number Slots */}
        <div style={styles.topRow}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            style={{
              ...styles.navBtn,
              color: currentPage === 1 ? "#ccc" : "#000",
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          <div style={styles.numberStrip}>
            {getPageRange().map((item, index) => {
              const isEllipsis = item === "dot-left" || item === "dot-right";

              return (
                <div key={index} style={styles.slot}>
                  {isEllipsis ? (
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() =>
                          setShowMenu(showMenu === item ? null : item)
                        }
                        style={styles.dotBtn}
                      >
                        ...
                      </button>
                      {showMenu === item && (
                        <div style={styles.menuUp}>
                          <div
                            onClick={() =>
                              handleJump(item === "dot-left" ? -100 : 100)
                            }
                            style={styles.menuItem}
                          >
                            Jump 100{item === "dot-left" ? "-" : "+"}
                          </div>
                          <div
                            onClick={() =>
                              handleJump(item === "dot-left" ? -50 : 50)
                            }
                            style={styles.menuItem}
                          >
                            Jump 50{item === "dot-left" ? "-" : "+"}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => setCurrentPage(item)}
                      style={{
                        ...styles.pageBtn,
                        backgroundColor:
                          currentPage === item ? "#000" : "transparent",
                        color: currentPage === item ? "#fff" : "#333",
                        fontWeight: currentPage === item ? "700" : "500",
                      }}
                    >
                      {item}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            style={{
              ...styles.navBtn,
              color: currentPage === totalPages ? "#ccc" : "#000",
            }}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>

        {/* BOTTOM ROW: Page Input (Centered) */}
        <div style={styles.bottomRow}>
          <span style={styles.label}>Page</span>
          <input
            type="text"
            inputMode="numeric"
            value={currentPage}
            onChange={handleInputChange}
            style={styles.input}
          />
          <span style={styles.label}>of {totalPages}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  screenWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f8f9fa",
    fontFamily: "'Quicksand', sans-serif",
  },
  mobileCard: {
    background: "#fff",
    padding: "24px 16px",
    borderRadius: "28px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
    width: "92%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberStrip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  slot: {
    width: "40px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  navBtn: {
    border: "none",
    background: "none",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  pageBtn: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "14px",
    cursor: "pointer",
  },
  dotBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#999",
    padding: "0 5px",
    height: "36px",
    display: "flex",
    alignItems: "center",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },
  input: {
    width: "65px",
    height: "44px",
    textAlign: "center",
    border: "1px solid #eee",
    borderRadius: "12px",
    fontSize: "16px",
    fontFamily: "inherit",
    outline: "none",
    backgroundColor: "#fcfcfc",
    fontWeight: "600",
  },
  label: { fontSize: "14px", color: "#999", fontWeight: "500" },
  menuUp: {
    position: "absolute",
    bottom: "45px", // Opens UPWARDS on mobile to stay clear of the input row
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    zIndex: 100,
    width: "110px",
    overflow: "hidden",
  },
  menuItem: {
    padding: "12px",
    fontSize: "12px",
    cursor: "pointer",
    textAlign: "center",
    borderBottom: "1px solid #f9f9f9",
    color: "#333",
    backgroundColor: "#fff",
  },
};
