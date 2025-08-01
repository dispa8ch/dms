import React from "react";

export function formatStatus(status: string) {
  const normalized = status.toLowerCase();

  const statusMap: Record<
    string,
    { label: string; color: string; bg: string }
  > = {
    active: { label: "Active", color: "#00b48aff", bg: "#b7ffeeff" },
    pending: { label: "Pending", color: "#ffae00ff", bg: "#fff5dfff" },
    cancelled: { label: "Cancelled", color: "red", bg: "#fed5d5ff" },
    delivered: { label: "Delivered", color: "blue", bg: "#d8dbffff" },
    failed: { label: "Failed", color: "crimson", bg: "#ffeeff" },
    default: { label: status, color: "gray", bg: "#e3e3e3ff" },
  };

  const { label, color, bg } = statusMap[normalized] || statusMap.default;

  return (
    <span
      style={{
        padding: "0.3rem 0.7rem",
        borderRadius: "1rem",
        fontWeight: 400,
        fontSize: "0.8rem",
        backgroundColor: `${bg}`,
        color,
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}
