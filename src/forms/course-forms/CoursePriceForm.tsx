"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { PriceSchema } from "@/schemas/schemas";
import { CourseModelType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const CoursePriceForm = ({ initialData }: { initialData: CourseModelType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof PriceSchema>>({
    resolver: zodResolver(PriceSchema),
    defaultValues: {
      price: initialData.price,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const updatePriceSubmit = async (values: z.infer<typeof PriceSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${initialData._id}`,
        values,
      );

      toast.success("Course Price updated!");
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
        <h1 className="text-lg font-medium">Course Price</h1>
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
              Edit Price
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updatePriceSubmit)}
            className="space-y-3"
          >
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <Input
                    defaultValue={initialData.price}
                    step={"5"}
                    disabled={isSubmitting}
                    placeholder="eg, '$88'"
                    type="number"
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
          {initialData.price ? (
            <>{formatPrice(initialData.price)}</>
          ) : (
            <span className="mt-2 text-sm italic text-secondary-foreground">
              Price not set yet...
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default CoursePriceForm;
