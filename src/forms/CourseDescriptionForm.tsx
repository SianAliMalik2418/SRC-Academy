"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { courseDescriptionSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CourseDescriptionForm = ({
  initialData,
}: {
  initialData: CourseModelType;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof courseDescriptionSchema>>({
    resolver: zodResolver(courseDescriptionSchema),
    defaultValues: {
      description: initialData.description,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const updateDescriptionSubmit = async (
    values: z.infer<typeof courseDescriptionSchema>,
  ) => {
    try {
      console.log(values);
      const response = await axios.patch(
        `/api/courses/${initialData._id}`,
        values,
      );

      toast.success("Description updated!");
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
        <h1 className="text-base font-medium md:text-lg">Course Description</h1>
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
              Edit Description
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateDescriptionSubmit)}
            className="space-y-3"
          >
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="eg, 'This course is about...'"
                    minLength={1}
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
        <span className="text-sm">
          {initialData.description ? (
            <>{initialData.description}</>
          ) : (
            <span className="mt-2 text-sm italic text-secondary-foreground">
              No description...
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default CourseDescriptionForm;
