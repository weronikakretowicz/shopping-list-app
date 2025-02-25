import { PencilSquareIcon, ShareIcon } from "@heroicons/react/24/outline";

type ActionType = "added" | "modified";

type Post = {
  userImg: string;
  fullName: string;
  actionType: ActionType;
};

type CardProps = {
  post: Post;
};

const Card = ({ post }: CardProps) => {
  const isAdded = post.actionType === "added";

  return (
    <div className="h-72">
      <div className="flex items-center p-1 font-medium text-xs">
        <img src={post.userImg} alt="" className="w-3 rounded-full object-cover mr-2" />
        <span>{post.fullName}</span>
        {/*{isAdded ? <p>Has added you to the list</p> : <p>Has modified the list</p>}*/}
      </div>

      <div className="flex items-center p-1">
        {isAdded ? <ShareIcon className="w-6 h-6" /> : <PencilSquareIcon className="w-6 h-6" />}
        {isAdded ? <p>Has added you to the list</p> : <p>Has modified the list</p>}
      </div>
    </div>
  );
};

export default Card;
