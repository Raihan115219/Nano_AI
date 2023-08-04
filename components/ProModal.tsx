import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/Hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  ArrowRight,
  MusicIcon,
  ImageIcon,
  VideoIcon,
  Code,
  Check,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/Stripe");
      window.location.href = response.data.url;
    } catch (error) {
      // console.log("Something went wrong", error);
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 ">
              <div className="flex items-center gap-x-2 font-bold py-1 ">
                Upgrade to NANO AI
                <Badge variant="premium" className="uppercase text-sm py-1 ">
                  Pro
                </Badge>
              </div>
            </DialogTitle>

            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium ">
              {tools.map((tool, i) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={onSubscribe}
              size="lg"
              variant="premium"
              className="w-full"
            >
              Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProModal;
