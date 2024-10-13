"use client";

import FileUpload from "@/components/File-Upload";
import { Button } from "@/components/ui/button";
import { courseImageSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const CourseImageForm = ({ initialData }: { initialData: CourseModelType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const handleImageUpload = async (
    values: z.infer<typeof courseImageSchema>,
  ) => {
    try {
      const response = await axios.patch(
        `/api/courses/${initialData._id}`,
        values,
      );

      toast.success("Image uploaded!");
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
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm">
        <h1 className="text-lg font-medium">Course Image</h1>
        <Button
          onClick={toggleEditing}
          variant={"ghost"}
          className="mr-2 flex items-center gap-2"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircleIcon className="h-4 w-4" />
              Add an Image
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Update Image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex h-40 w-full items-center justify-center">
            <ImageIcon className="h-10 w-10" />
          </div>
        ) : (
          <div className="">
            <Image
              alt="Course Image"
              width={500}
              height={300}
              className="rounded-md object-cover"
              src={initialData.imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                handleImageUpload({ imageUrl: url });
              }
            }}
          />

          <div className="text-xs italic text-secondary-foreground">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseImageForm;
