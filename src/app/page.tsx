import { Composer } from "@/client";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Composer />
      </div>
    </div>
  );
}
