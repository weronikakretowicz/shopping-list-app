import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type ListItem = {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    bought: boolean;
};

export type List = {
    _id: string;
    name: string;
    items: ListItem[];
    owner: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type ListCardProps = {
    list: List;
    onItemStatusChange: (listId: string, itemId: string, checked: boolean) => void;
    onEditClick?: (listId: string) => void;
    onDeleteClick?: (listId: string) => void;
}

export const ListCard = ({ list, onItemStatusChange, onEditClick, onDeleteClick }: ListCardProps) => {
    const [items, setItems] = useState<ListItem[]>(list.items);

    const handleCheckboxChange = (itemId: string, checked: boolean) => {
        setItems(
            items.map((item) =>
                item._id === itemId ? { ...item, bought: checked } : item
            )
        );
        onItemStatusChange(list._id, itemId, checked);
    };

    const handleEditClick = () => {
        if (onEditClick) {
            onEditClick(list._id);
        }
    };

    const completedItemsCount = items.filter((item) => item.bought).length;
    const progress = items.length > 0 ? (completedItemsCount / items.length) * 100 : 0;

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow w-[360px] max-h-[360px]">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{list.name}</CardTitle>
                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => onDeleteClick?.(list._id)}
                            className={clsx(
                                "flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 ",
                                "hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer",
                                "hover:bg-red-700 hover:[&>*]:text-white"
                            )}
                            aria-label="Edit list"
                        >
                            <TrashIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 " />
                        </button>
                        <button
                            onClick={handleEditClick}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                            aria-label="Edit list"
                        >
                            <PencilIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-2">
                    <div
                        className="bg-green-500 h-1 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </CardHeader>

            <CardContent className="pb-2 overflow-y-auto">
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li
                            key={item._id}
                            className="flex items-center justify-between gap-2 group"
                        >
                            <div className="flex items-center gap-2 flex-1">
                                <Checkbox
                                    id={item._id}
                                    checked={item.bought}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(item._id, checked as boolean)
                                    }
                                    className="cursor-pointer"
                                />
                                <label
                                    htmlFor={item._id}
                                    className={cn(
                                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1",
                                        item.bought && "line-through text-gray-500 dark:text-gray-400"
                                    )}
                                >
                                    {item.name}
                                </label>
                            </div>

                            <Badge variant="outline" className="ml-auto">
                                {item.quantity} {item.unit}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="text-xs text-gray-500 pt-1 mt-auto">
                <div className="flex justify-between w-full">
                    <span>
                        {completedItemsCount} of {items.length} completed
                    </span>
                    <span>
                        Created: {new Date(list.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
};
