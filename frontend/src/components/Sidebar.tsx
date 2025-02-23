import { Button } from "@/components/ui/button";
import {
    ClipboardDocumentListIcon,
    ClipboardIcon,
    MoonIcon,
    SunIcon
} from "@heroicons/react/24/outline";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

type IconProps = {
    className: string;
};

const NAV_ITEMS = [
    {
        name: "My Lists",
        Icon: ({ className }: IconProps) => <ClipboardDocumentListIcon className={className} />,
        path: "/myLists",
    },
    {
        name: "Shared Lists",
        Icon: ({ className }: IconProps) => <ClipboardIcon className={className} />,
        path: "/sharedLists",
    },
] as const;

const BUTTON_STYLE =
    "w-full h-[60px] text-[18px] font-medium flex items-center justify-start gap-4";

export const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [theme, setTheme] = useState<"light" | "dark">("light");

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        // Przykładowo można dodać/usuwać klasę .dark na <body>:
        if (newTheme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    return (
        <nav className="flex flex-col justify-between w-full h-full">
            <div className="flex flex-col space-y-2 w-full">
                {NAV_ITEMS.map(({ name, path, Icon }) => {
                    let isActive = pathname.startsWith(path);

                    if (path === "/myLists") {
                        isActive =
                            pathname.startsWith("/myLists") ||
                            pathname.startsWith("/newList");
                    }

                    return (
                        <Button
                            key={name}
                            variant="ghost"
                            className={BUTTON_STYLE + (isActive ? " text-green" : "")}
                            onClick={() => navigate(path)}
                        >
                            <div className="flex justify-center items-center h-1/2">
                                <Icon className="w-full h-full" />
                            </div>
                            {name}
                        </Button>
                    );
                })}
            </div>

            <div className="flex">
                <div className="flex justify-center items-end m-2">
                    <Button
                        className="h-12 bg-transparent border"
                        onClick={handleThemeToggle}
                    >
                        {theme === "light" ? (
                            <MoonIcon className="w-6 h-6" />
                        ) : (
                            <SunIcon className="w-6 h-6 text-yellow-300" />
                        )}
                    </Button>
                </div>
            </div>
        </nav>
    );
};
