import { Composer } from "@/client";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-bg flex items-center justify-center"
      style={{
        padding: "var(--sp-4)",
      }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "720px",
        }}
      >
        <Composer />
      </div>
    </div>
  );
}
