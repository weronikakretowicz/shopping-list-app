import { useShareList } from "@/api/shoppingList/useShareList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { List, ListItem } from "@/types/List";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ListCardProps = {
  list: List;
  onItemStatusChange: (listId: string, itemId: string, checked: boolean) => void;
  onEditClick?: (listId: string) => void;
  onDeleteClick?: (listId: string) => void;
};

// Components
const ListItemComponent = ({
  item,
  onCheckboxChange,
}: {
  item: ListItem;
  onCheckboxChange: (id: string, checked: boolean) => void;
}) => (
  <li className="flex items-center justify-between gap-2 group">
    <div className="flex items-center gap-2 flex-1">
      <Checkbox
        id={item._id}
        checked={item.bought}
        onCheckedChange={(checked) => onCheckboxChange(item._id, checked as boolean)}
        className="cursor-pointer"
      />
      <label
        htmlFor={item._id}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1",
          item.bought && "line-through text-gray-500 dark:text-gray-400",
        )}
      >
        {item.name}
      </label>
    </div>
    <Badge variant="outline" className="ml-auto">
      {item.quantity} {item.unit}
    </Badge>
  </li>
);

const ListOptionsMenu = ({
  onEditClick,
  onShareClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onShareClick: () => void;
  onDeleteClick: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        aria-label="List options"
      >
        <EllipsisVerticalIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
      <DropdownMenuItem
        onClick={onEditClick}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <PencilIcon className="w-4 h-4" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={onShareClick}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ShareIcon className="w-4 h-4" />
        <span>Share</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={onDeleteClick}
        className="flex items-center gap-2 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SharePopup = ({
  isOpen,
  onClose,
  emails,
  onEmailsChange,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  emails: string;
  onEmailsChange: (value: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share List</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Share this list with others to collaborate
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="emails" className="text-sm font-medium">
              Email addresses
            </Label>
            <Input
              id="emails"
              placeholder="example@email.com, another@email.com"
              value={emails}
              onChange={(e) => onEmailsChange(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Separate multiple emails with commas
            </p>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export const ListCard = ({ list, onItemStatusChange, onEditClick, onDeleteClick }: ListCardProps) => {
  const [items, setItems] = useState<ListItem[]>(list.items);
  const [isSharePopupOpen, setSharePopupOpen] = useState(false);
  const [emails, setEmails] = useState<string>("");
  const { mutate: shareList } = useShareList();

  useEffect(() => {
    setItems(list.items);
  }, [list.items]);

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setItems(items.map((item) => (item._id === itemId ? { ...item, bought: checked } : item)));
    onItemStatusChange(list._id, itemId, checked);
  };

  const handleShareSubmit = async () => {
    const emailList = emails.split(",").map((email) => email.trim());
    try {
      shareList({ listId: list._id, participants: emailList });

      setSharePopupOpen(false);
      setEmails("");
    } catch (error) {
      console.error("Error sharing list:", error);
    }
  };

  const completedItemsCount = items.filter((item) => item.bought).length;
  const progress = items.length > 0 ? (completedItemsCount / items.length) * 100 : 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow w-[360px] max-h-[360px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{list.name}</CardTitle>
          <div className="relative">
            <ListOptionsMenu
              onEditClick={() => onEditClick?.(list._id)}
              onShareClick={() => setSharePopupOpen(true)}
              onDeleteClick={() => onDeleteClick?.(list._id)}
            />
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-2">
          <div className="bg-green-500 h-1 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </CardHeader>

      <CardContent className="pb-2 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item) => (
            <ListItemComponent key={item._id} item={item} onCheckboxChange={handleCheckboxChange} />
          ))}
        </ul>
      </CardContent>

      <CardFooter className="text-xs text-gray-500 pt-1 mt-auto">
        <div className="flex justify-between w-full">
          <span>
            {completedItemsCount} of {items.length} completed
          </span>
          <span>Created: {new Date(list.createdAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>

      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setSharePopupOpen(false)}
        emails={emails}
        onEmailsChange={setEmails}
        onSubmit={handleShareSubmit}
      />
    </Card>
  );
};
