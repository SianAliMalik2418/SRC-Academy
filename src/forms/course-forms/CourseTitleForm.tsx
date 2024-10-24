"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TitleSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CourseTitleForm = ({ initialData }: { initialData: CourseModelType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof TitleSchema>>({
    resolver: zodResolver(TitleSchema),
    defaultValues: {
      title: initialData.title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const updateTitleSubmit = async (values: z.infer<typeof TitleSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${initialData._id}`,
        values,
      );

      toast.success("Title updated!");
      router.refresh();
      toggleEditing();

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
        <h1 className="text-lg font-medium">Course Title</h1>
        <Button
          onClick={toggleEditing}
          variant={"ghost"}
          className="mr-2 flex items-center gap-2"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateTitleSubmit)}
            className="space-y-3"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <Input
                    defaultValue={initialData.title}
                    disabled={isSubmitting}
                    placeholder="eg, 'Advance Web Development'"
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
              Save
            </ButtonLoading>
          </form>
        </Form>
      ) : (
        <span className="text-sm">{initialData.title}</span>
      )}
    </div>
  );
};

export default CourseTitleForm;
