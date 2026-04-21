import React, { useState } from "react";

// Modern SVG Icons matching your reference
const ChevronLeft = () => (
  <svg
    width="20"
    height="20"
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
    width="20"
    height="20"
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

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(null);
  const totalPages = 1000;

  const getPageRange = () => {
    let range = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }
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

  return (
    <div style={styles.screenWrapper}>
      {/* CSS to hide browser number arrows */}
      <style>{`
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={styles.paginationPill}>
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          style={{
            ...styles.navBtn,
            color: currentPage === 1 ? "#ccc" : "#333",
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {/* Static Width Numbers Area */}
        <div style={styles.numbersArea}>
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
                      <div style={styles.menuDown}>
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
                  <button
                    onClick={() => setCurrentPage(item)}
                    style={{
                      ...styles.pageBtn,
                      backgroundColor:
                        currentPage === item ? "#000" : "transparent",
                      color: currentPage === item ? "#fff" : "#333",
                    }}
                  >
                    {item}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          style={{
            ...styles.navBtn,
            color: currentPage === totalPages ? "#ccc" : "#333",
          }}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>

        <div style={styles.divider} />

        {/* Dynamic Input Field */}
        <div style={styles.inputContainer}>
          <span style={styles.label}>Page</span>
          <input
            type="text"
            value={currentPage}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (
                val === "" ||
                (parseInt(val) >= 1 && parseInt(val) <= totalPages)
              ) {
                setCurrentPage(val === "" ? "" : parseInt(val));
              }
            }}
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
    minHeight: "100vh",
    background: "#f8f9fa",
    fontFamily: "'Quicksand', sans-serif",
  },
  paginationPill: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "6px 12px",
    borderRadius: "50px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  numbersArea: {
    display: "flex",
    width: "300px",
    justifyContent: "center",
    alignItems: "center",
  },
  slot: { width: "42px", display: "flex", justifyContent: "center" },
  pageBtn: {
    border: "none",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    fontFamily: "inherit",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
  },
  dotBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#999",
  },
  navBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
  },
  divider: {
    width: "1px",
    height: "20px",
    background: "#eee",
    margin: "0 10px",
  },
  inputContainer: { display: "flex", alignItems: "center", gap: "4px" },
  input: {
    width: "48px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "5px 0",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  },
  label: { fontSize: "12px", color: "#888" },
  menuDown: {
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    zIndex: 100,
    width: "110px",
    overflow: "hidden",
  },
  menuItem: {
    padding: "10px",
    fontSize: "12px",
    cursor: "pointer",
    textAlign: "center",
    borderBottom: "1px solid #f5f5f5",
    color: "#333",
    backgroundColor: "#fff",
  },
};
