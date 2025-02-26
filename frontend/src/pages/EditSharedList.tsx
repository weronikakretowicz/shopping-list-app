import axiosInstance from "@/api/axiosInstance";
import { useGetListById } from "@/api/shoppingList/useGetListById.ts";
import Layout from "@/components/Layout.tsx";
import { Spinner } from "@/components/Spinner.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ROUTES } from "@/pages/routes.ts";
import { addListSchema } from "@/schemas/addListSchema.ts";
import type { ListItem } from "@/types/List";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import type { z } from "zod";

type LocalListItem = Omit<ListItem, "_id" | "quantity" | "unit"> & {
  quantity?: string | undefined;
  unit?: string | undefined;
};

const EditSharedListList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

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

  const { data: list, isLoading: isLoadingList } = useGetListById(id);

  const updateListMutation = useMutation({
    mutationFn: async (data: { name: string; items: LocalListItem[]; updatedAt: string }) => {
      return axiosInstance.put(`/list/${id}`, {
        ...data,
        items: data.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        })),
      });
    },
    onSuccess: () => {
      toast.success("List updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", id] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });

      navigate(-1); // Go back to the previous page
    },
    onError: (error) => {
      toast.error("Failed to update list. Please try again.");
      console.error("Error updating list:", error);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof addListSchema>> = async (data) => {
    try {
      setIsLoading(true);

      await updateListMutation.mutateAsync({
        name: data.name,
        items: data.items.map((item) => ({
          ...item,
          bought: list?.items.find((i) => i.name === item.name)?.bought || false,
        })),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.reset({
      name: list?.name,
      items: list?.items.map((item) => ({
        name: item.name,
        quantity: item.quantity.toString(),
        unit: item.unit,
      })),
    });
  }, [list]);

  if (isLoadingList) {
    return (
      <Layout breadcrumbs={[]}>
        <div className="flex w-screen h-screen justify-center items-center">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        { label: "Shared list", path: ROUTES.SHAREDLISTS },
        { label: list?.name ?? "", path: location.pathname },
      ]}
    >
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full h-full justify-start items-start overflow-y-auto">
          <div className="flex w-full h-full px-4 py-3 justify-start items-start ">
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
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Loading...
                    </span>
                  ) : (
                    "Save Changes"
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
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={`name-${index}`}
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
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={`quantity-${index}`}
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
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            key={`unit-${index}`}
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
                            <Button
                              variant="destructive"
                              type="button"
                              className="cursor-pointer hover:bg-red-700 hover:text-white"
                              onClick={() => remove(index)}
                            >
                              Remove Product
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="btn-secondary"
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
      </div>
    </Layout>
  );
};

export default EditSharedListList;
