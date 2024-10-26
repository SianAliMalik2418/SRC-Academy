"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import ConfirmActionModal from "./modals/Confirm-Action-Modal";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChapterActionsProps = {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
};

const ChapterActions = ({
  disabled,
  isPublished,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChapterDeleteClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapter/${chapterId}`);

      toast.success("Chapter Deleted!");

      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPublishClick = async () => {
    try {
      setIsLoading(true);

      const publishStatus = !isPublished; // Toggle the publish status
      await axios.patch(
        `/api/courses/${courseId}/chapter/${chapterId}/chapterStatus`,
        {
          isPublished: publishStatus,
        },
      );

      toast.success(
        isPublished ? "Chapter Unpublished!" : "Chapter Published!",
      );

      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublishClick}
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmActionModal onConfirm={onChapterDeleteClick}>
        <div
          className={`flex items-center justify-center rounded border bg-primary p-2 text-primary-foreground hover:bg-primary/90 ${
            isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
          tabIndex={0}
          role="button"
          aria-disabled={isLoading || disabled}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash className="size-4" />
          )}
        </div>
      </ConfirmActionModal>
    </div>
  );
};

export default ChapterActions;
