import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="Logo" src="/logo.jpg" fill />
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="text-4xl font-bold text-green-600">Nano</span> is
        thinking...
      </p>
    </div>
  );
};
