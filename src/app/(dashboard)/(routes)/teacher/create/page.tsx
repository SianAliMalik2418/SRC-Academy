"use client";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/buttonLoading";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TitleSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const TeacherPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof TitleSchema>>({
    resolver: zodResolver(TitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof TitleSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      console.log(response);
      toast.success("Course created!");
      router.push(`/teacher/courses/${response.data.course._id}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex h-[85vh] w-screen max-w-5xl flex-col items-center justify-center gap-3 p-5">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Name your course</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What would you like to name your course? Don&apos;t worry you can
            change it later.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Course Title</FormLabel>
                  <Input
                    placeholder="eg, 'Advance Web Development'"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <div className="mt-4 flex gap-1">
              <Button
                variant={"ghost"}
                type="button"
                size={"sm"}
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>

              <ButtonLoading
                isLoading={isSubmitting}
                disabled={!isValid || isSubmitting}
                type="submit"
                size={"sm"}
              >
                Continue
              </ButtonLoading>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TeacherPage;
