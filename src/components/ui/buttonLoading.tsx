import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { forwardRef } from "react";

interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ isLoading, children, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={isLoading} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      </Button>
    );
  },
);

ButtonLoading.displayName = "ButtonLoading";

export default ButtonLoading;
