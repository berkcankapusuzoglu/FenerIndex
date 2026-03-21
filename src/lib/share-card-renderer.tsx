import type { Rumor } from "@/lib/supabase/types";

export function renderShareCard(rumor: Rumor) {
  const total = rumor.believe_count + rumor.cap_count;
  const believePct = total > 0 ? Math.round((rumor.believe_count / total) * 100) : 50;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: "linear-gradient(135deg, #00205B 0%, #001440 50%, #000B20 100%)",
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#FFD700",
            fontSize: "20px",
            fontWeight: 800,
            color: "#00205B",
          }}
        >
          FI
        </div>
        <span
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          FenerIndex
        </span>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(255,215,0,0.15)",
            border: "1px solid rgba(255,215,0,0.3)",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFD700",
            textTransform: "uppercase",
          }}
        >
          {rumor.category}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          {rumor.title}
        </div>
        {rumor.player_name && (
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "8px",
            }}
          >
            {rumor.player_name}
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "#FFD700" }}>BELIEVE {believePct}%</span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}>
            {total} vote{total !== 1 ? "s" : ""}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            CAP {100 - believePct}%
          </span>
        </div>
        <div
          style={{
            display: "flex",
            height: "16px",
            borderRadius: "999px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              width: `${believePct}%`,
              background: "linear-gradient(90deg, #FFD700, #FFC107)",
              borderRadius: "999px 0 0 999px",
            }}
          />
          <div
            style={{
              width: `${100 - believePct}%`,
              background: "rgba(255,255,255,0.2)",
              borderRadius: "0 999px 999px 0",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "4px",
          }}
        >
          Cast your vote at fenerindex.vercel.app
        </div>
      </div>
    </div>
  );
}
