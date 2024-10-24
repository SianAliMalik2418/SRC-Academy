"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { ChapterAcessSchema } from "@/schemas/schemas";
import { Chapter } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ChapterAcessForm = ({
  initialData,
  courseId,
}: {
  initialData: Chapter;
  courseId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof ChapterAcessSchema>>({
    resolver: zodResolver(ChapterAcessSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const updateChapterAccessSubmit = async (
    values: z.infer<typeof ChapterAcessSchema>,
  ) => {
    try {
      console.log(values);
      const response = await axios.patch(
        `/api/courses/${courseId}/chapter/${initialData._id}`,
        values,
      );

      toast.success("Chapter Access Status updated!");
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
    <div className="flex flex-col gap-3 rounded-md bg-slate-900 p-4">
      <div className="flex items-center justify-between text-sm">
        <h1 className="text-base font-medium md:text-lg">Chapter Access</h1>
        <Button
          onClick={toggleEditing}
          variant={"ghost"}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit Access
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateChapterAccessSubmit)}>
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormDescription>
                    Check this if you want this chapter to be available for
                    free.
                  </FormDescription>
                </FormItem>
              )}
            />
            <ButtonLoading
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
              type="submit"
              className="mt-4"
            >
              Save
            </ButtonLoading>
          </form>
        </Form>
      ) : (
        <span className="text-sm">
          {initialData.isFree ? (
            <p className="text-sm italic text-muted">
              This chapter is free for access.{" "}
            </p>
          ) : (
            <span className="mt-2 text-sm italic text-secondary-foreground">
              This chapter is not free to access.
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default ChapterAcessForm;
