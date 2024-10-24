"use client";

import FileUpload from "@/components/File-Upload";
import { Button } from "@/components/ui/button";
import { AttachmentSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import axios from "axios";
import { File, Loader2, PlusCircleIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const CourseAttachmentForm = ({
  initialData,
}: {
  initialData: CourseModelType;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteAttachmentUrl, setDeleteAttachmentUrl] = useState<string | null>(
    null,
  );

  const router = useRouter();

  const handleAttachmentUpload = async (
    attachmentUrl: z.infer<typeof AttachmentSchema>,
  ) => {
    try {
      console.log(attachmentUrl);
      const response = await axios.post(
        `/api/courses/${initialData._id}/attachment`,
        attachmentUrl,
      );

      toast.success("Attachment Uploaded!");
      toggleEditing();
      router.refresh();
      console.log(response);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const handleAttachmentDelete = async (attachmentUrl: string) => {
    try {
      setDeleteAttachmentUrl(attachmentUrl);
      const response = await axios.delete(
        `/api/courses/${initialData._id}/attachment/${encodeURIComponent(attachmentUrl)}`,
      );

      toast.success("Attachment Deleted!");
      router.refresh();
      setDeleteAttachmentUrl(null);
      console.log(response);
    } catch (error) {
      toast.error("Something went wrong!");
      setDeleteAttachmentUrl(null);

      console.log(error);
    } finally {
      setDeleteAttachmentUrl(null);
    }
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4">
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Course Attachments</h1>
          <Button
            onClick={toggleEditing}
            variant={"ghost"}
            className="mr-2 flex items-center gap-2"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircleIcon className="h-4 w-4" />
                Add a File
              </>
            )}
          </Button>
        </div>

        {!isEditing &&
          initialData.attachments &&
          initialData.attachments.map((attachment) => (
            <div key={attachment.attachmentUrl} className="flex flex-col gap-3">
              <div className="flex w-full items-center justify-between rounded-md bg-secondary p-2">
                <div className="flex w-[80%] items-center overflow-hidden">
                  <File className="mr-2 h-4 w-4 flex-shrink-0" />
                  <p className="truncate">{attachment.attachmentName}</p>
                </div>

                <Button
                  onClick={() =>
                    handleAttachmentDelete(attachment.attachmentUrl)
                  }
                  className="w-[20%] bg-transparent"
                >
                  {deleteAttachmentUrl === attachment.attachmentUrl ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </div>
            </div>
          ))}

        {!isEditing && initialData.attachments.length === 0 && (
          <span className="mt-2 text-sm italic text-secondary-foreground">
            No attachments uploaded yet...
          </span>
        )}
      </div>

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                handleAttachmentUpload({ attachmentUrl: url });
              }
            }}
          />

          <div className="text-xs italic text-secondary-foreground">
            Upload files which might be useful for your students. *(pdf ,
            images, audio, video)
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAttachmentForm;
