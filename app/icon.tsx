import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131209",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 14,
            height: 20,
            borderRadius: 3,
            background: "linear-gradient(180deg, #d4553f 0%, #b23a2e 100%)",
            border: "1.5px solid #e8b64a",
          }}
        />
      </div>
    ),
    size,
  );
}
