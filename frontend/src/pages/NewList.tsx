import { useAddList } from "@/api/shoppingList/shoppingList.queries.ts";
import Layout from "@/components/Layout.tsx";
import { Spinner } from "@/components/Spinner.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ROUTES } from "@/pages/routes.ts";
import { addListSchema } from "@/schemas/addListSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";

const NewList = () => {
  const navigate = useNavigate();
  const addListMutation = useAddList();

  const form = useForm<z.infer<typeof addListSchema>>({
    resolver: zodResolver(addListSchema),
    defaultValues: {
      name: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit: SubmitHandler<z.infer<typeof addListSchema>> = async (data) => {
    try {
      await addListMutation.mutateAsync({
        ...data,
        items: data.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        })),
      });

      navigate(ROUTES.MYLISTS);
    } catch (error) {
      toast.error("Failed to create list. Please try again.");
      console.error("Error creating list:", error);
    }
  };

  return (
    <Layout
      breadcrumbs={[
        { label: "My List", path: ROUTES.MYLISTS },
        { label: "Create new", path: ROUTES.NEWLIST },
      ]}
    >
      <div className="flex w-full h-full">
        <div className="flex w-full h-full px-4 py-3 justify-start items-start">
          <div className="flex-6 flex-col justify-center gap-7">
            <div className="flex justify-between items-end sticky px-4 py-5 top-0 z-10 bg-white dark:bg-gray-800">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-3/5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>List Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter list name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <Button
                type="button"
                className="btn-secondary"
                variant="default"
                disabled={addListMutation.isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                {addListMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Spinner />
                    Loading...
                  </span>
                ) : (
                  "Create New List"
                )}
              </Button>
            </div>

            <div className="overflow-y-auto p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold mb-2">Products</h2>
                    {fields.map((item, index) => (
                      <div key={item.id} className="space-y-4 border p-4 rounded mb-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.name` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" min={1} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.unit` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. kg, pcs, L" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button variant="destructive" type="button" onClick={() => remove(index)}>
                            Remove Product
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="default"
                      className="btn-primary"
                      onClick={() => append({ name: "", quantity: "1", unit: "" })}
                    >
                      Add Product
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewList;
