/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ChaptersList from "@/components/Chapters-List";
import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChapterSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CourseChapterForm = ({
  initialData,
}: {
  initialData: CourseModelType;
}) => {
  const [isCreatingChapter, setIsCreatingChapter] = useState(false);
  const [isUpdatingChapterOrder, setIsUpdatingChapterOrder] = useState(false);

  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    defaultValues: {
      chapterTitle: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const createChapterSubmit = async (values: z.infer<typeof ChapterSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${initialData._id}/chapter`,
        values,
      );

      toast.success("Course Chapter created!");
      router.refresh();
      toggleCreatingChapter();

      console.log(response);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdatingChapterOrder(true);
      await axios.post(`/api/courses/${initialData._id}/chapter/reorder`, {
        list: updatedData,
      });

      router.refresh();

      setIsUpdatingChapterOrder(false);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      setIsUpdatingChapterOrder(false);
    } finally {
      setIsUpdatingChapterOrder(false);
    }
  };

  const onEditChapter = (id: string) => {
    router.push(`/teacher/courses/${initialData._id}/chapter/${id}`);
  };

  const toggleCreatingChapter = () => setIsCreatingChapter((prev) => !prev);

  return (
    <div className="relative flex flex-col gap-3 rounded-md bg-slate-900 p-4">
      {isUpdatingChapterOrder && (
        <div className="absolute right-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-md bg-secondary">
          <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <h1 className="text-lg font-medium">Course Chapters</h1>
        <Button
          onClick={toggleCreatingChapter}
          variant={"ghost"}
          className="mr-2 flex items-center gap-2"
        >
          {isCreatingChapter ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 cursor-pointer" />
              Add Chapter
            </>
          )}
        </Button>
      </div>

      {isCreatingChapter && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createChapterSubmit)}
            className="space-y-3"
          >
            <FormField
              name="chapterTitle"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="eg, 'Introduce your course..'"
                    {...field}
                  />
                </FormControl>
              )}
            />

            <ButtonLoading
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </ButtonLoading>
          </form>
        </Form>
      )}

      {!isCreatingChapter && !initialData?.chapters?.length ? (
        <span className="mt-2 text-sm italic text-secondary-foreground">
          No chapters yet...
        </span>
      ) : (
        !isCreatingChapter && (
          <>
            <ChaptersList
              items={
                initialData.chapters?.sort(
                  (a, b) => (a.position ?? 0) - (b.position ?? 0),
                ) || []
              }
              onEdit={onEditChapter}
              onReorder={onReorder}
            />

            <span className="mt-3 text-sm italic text-secondary-foreground">
              Drag and Drop to reorder chapters.
            </span>
          </>
        )
      )}
    </div>
  );
};

export default CourseChapterForm;
