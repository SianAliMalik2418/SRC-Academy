import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary font-semibold",
        success: "bg-emerald-700 border-emarald-800 text-secondary",
      },
      defaultVariant: {
        variant: "warning",
      },
    },
  },
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div
      className={cn(
        bannerVariants({ variant }),
        "flex w-full flex-col items-center justify-center gap-1 md:flex-row",
      )}
    >
      <Icon className="mr-2 size-4" />
      {label}
    </div>
  );
};

export default Banner;
