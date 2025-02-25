import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

type SignOutDialogProps = {
  triggerClassName?: string;
};

const SignOutDialog = ({ triggerClassName }: SignOutDialogProps) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={`flex items-center gap-2 cursor-pointer ${triggerClassName || ""}`}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? Your session will be closed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut} className="text-secondary">
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutDialog;
