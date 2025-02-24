import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useAccessToken } from "@/atoms/accessToken.ts";
import { ROUTES } from "./routes.ts";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [accessToken] = useAccessToken();

  return (
    <div className="flex relative min-h-screen w-screen">
      <div
        className="absolute inset-0 bg-center bg-cover w-full h-full"
        style={{ backgroundImage: "url('/assets/grocery_background.jpeg')" }}
      >
        <Header>
          <Button
            variant="default"
            onClick={() => {
              if (accessToken) {
                navigate(ROUTES.BOARD);
              } else navigate("/login");
            }}
            className="px-4 py-2 btn-primary"
          >
            Login
          </Button>
        </Header>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="flex flex-row text-white h-full w-full">
          <div className="flex flex-1 flex-col justify-start mt-28 items-center z-10 p-4 ">
            <h1 className="text-3xl font-bold mb-4">Welcome to CoList</h1>
            <p className="text-2xl mb-8 font-semibold">
              Sharing your shopping list has never been{" "}
              <span className="italic">easier!</span>
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
          <div className="flex flex-1" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
