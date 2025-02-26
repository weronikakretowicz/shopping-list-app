// import {useEffect, useState} from "react";
//
// type NavbarProps = {
//     socket: string;
// }
//
// const Navbar = ({socket}: NavbarProps) => {
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//
//     useEffect(() => {
//         socket.on("getNotifications", (data: Notification) => {
//             setNotifications((prev) => [...prev, data]);
//         });
//     }, [socket]);
//
//     const displayNotification = ({senderName, actionType}) => {
//         const action = actionType === "added" ? "has added you to the list" : "has modified the list";
//
//         return (
//             <span className="noti">{`${senderName} ${action}`}</span>
//         );
//     }
//
//     return (
//
//     );
// }
//
// export default Navbar;
