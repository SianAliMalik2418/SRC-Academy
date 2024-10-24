"use client";

import FileUpload from "@/components/File-Upload";
import { Button } from "@/components/ui/button";
import { ChapterVideoSchema } from "@/schemas/schemas";
import { Chapter } from "@/types/types";
import axios from "axios";
import { Pencil, PlusCircleIcon, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import MuxPlayer from "@mux/mux-player-react";

const ChapterVideoForm = ({
  initialData,
  courseId,
}: {
  initialData: Chapter;
  courseId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const handleImageUpload = async (
    values: z.infer<typeof ChapterVideoSchema>,
  ) => {
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapter/${initialData._id}`,
        values,
      );

      toast.success("Video uploaded!");
      toggleEditing();
      router.refresh();
      console.log(response);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <h1 className="text-lg font-medium">Chapter Video</h1>
        <Button
          onClick={toggleEditing}
          variant={"ghost"}
          className="mr-2 flex items-center gap-2"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircleIcon className="h-4 w-4" />
              Add a Video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Update Video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div
            style={{ height: "400px;", backgroundColor: "gray" }}
            className="h-[400px]rounded flex w-full items-center justify-center rounded-md"
          >
            <Video className="h-10 w-10" />
          </div>
        ) : (
          <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                handleImageUpload({ videoUrl: url });
              }
            }}
          />

          <div className="text-xs italic text-secondary-foreground">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
