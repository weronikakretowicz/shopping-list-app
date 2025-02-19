import { useNavigate } from 'react-router-dom';
import {Header} from "../components/Header.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";

const WelcomePage = () => {
    const navigate = useNavigate();
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/assets/grocery_background.jpeg';
        img.onload = () => setBgLoaded(true);
    }, []);

    return (
        <div className="relative h-screen w-screen">
            <Header>
                <Button
                    variant="default"
                    onClick={() => {
                        if (localStorage.getItem("access_token")) {
                            navigate("/home");
                        } else navigate("/login");
                    }}
                    className="px-4 py-2 btn-primary"
                >
                    Login
                </Button>
            </Header>

            <div
                className="absolute inset-0 bg-center bg-cover w-full h-full"
                style={{backgroundImage: "url('/assets/grocery_background.jpeg')"}}
            ></div>

            {bgLoaded && (
                <div className="absolute inset-0 w-full h-full bg-black opacity-50 transition-opacity duration-500"></div>
            )}

            <div
                // className="relative flex items-start h-full text-white z-10 px-4 text-center"
                className=""
            >
                <div
                    // className="relative flex flex-col items-start md:justify-start sm:justify-center h-full text-white px-10 mt-24"
                >
                    <h1 className="text-3xl font-bold mb-4">Welcome to CoList</h1>
                    <p className="text-2xl mb-8 font-semibold">
                        Sharing your shopping list has never been <span className="italic">easier!</span>
                    </p>
                    <p className="mb-2">
                        Invite your family and friends to collaborate on your list.
                    </p>
                    <p className="mb-2">
                        Get real-time updates as items are added, removed, or changed.
                    </p>
                    <p className="mb-8">
                        Organize and manage your shared shopping list seamlessly.
                    </p>
                    <Button
                        variant="default"
                        onClick={() => navigate("/register")}
                        className="px-4 py-2 btn-primary"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
