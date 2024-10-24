"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { ComboBox } from "@/components/ui/combobox";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { COURSE_CATEGORIES } from "@/lib/utils";
import { CategorySchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CourseCategoryForm = ({
  initialData,
}: {
  initialData: CourseModelType;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category: initialData.category,
    },
  });

  const { isSubmitting } = form.formState;

  const router = useRouter();

  const updateCategorySubmit = async (
    values: z.infer<typeof CategorySchema>,
  ) => {
    try {
      console.log(values);
      const response = await axios.patch(
        `/api/courses/${initialData._id}`,
        values,
      );

      toast.success("Category updated!");
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
        <h1 className="text-lg font-medium">Course Category</h1>
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
              Edit Category
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateCategorySubmit)}
            className="space-y-3"
          >
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <ComboBox
                    options={COURSE_CATEGORIES}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            />

            <ButtonLoading isLoading={isSubmitting} type="submit">
              Save
            </ButtonLoading>
          </form>
        </Form>
      ) : (
        <span className="text-sm">
          {initialData.category ? (
            <>{initialData.category}</>
          ) : (
            <span className="mt-2 text-sm italic text-secondary-foreground">
              No category defined yet...
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default CourseCategoryForm;
