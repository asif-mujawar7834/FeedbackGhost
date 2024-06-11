import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CopyToClipboard({ value }: { value: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-md my-4 sm:flex">
      <Input value={value} readOnly />
      <Button
        onClick={handleCopy}
        className={`mt-2 sm:mt-0 sm:ml-2 ${
          isCopied ? "bg-green-500 text-white" : ""
        }`}
      >
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
