import { ReactNode } from "react";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
  withBorder?: boolean;
  textColor?: string;
};

export const Header = ({ children, textColor = "secondary", withBorder = false }: HeaderProps) => {
  return (
    <nav
      className={`flex h-24 justify-between items-center w-full p-4 relative z-20 
            ${withBorder ? "border-b" : "border-b-0"}
                `}
    >
      <div className={`text-2xl ${textColor == "primary" ? "text-primary" : "text-secondary"}`}>
        Co<span className="font-bold">List</span>
      </div>
      {children}
    </nav>
  );
};
