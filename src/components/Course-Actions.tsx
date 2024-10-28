"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import ConfirmActionModal from "./modals/Confirm-Action-Modal";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CourseActionsProps = {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
};

const CourseActions = ({
  disabled,
  isPublished,
  courseId,
}: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onCourseDeleteClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course Deleted!");

      router.push(`/teacher/courses`);

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
      await axios.patch(`/api/courses/${courseId}`, {
        isPublished: publishStatus,
      });

      toast.success(isPublished ? "Course Unpublished!" : "Course Published!");

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

      <ConfirmActionModal onConfirm={onCourseDeleteClick}>
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

export default CourseActions;
