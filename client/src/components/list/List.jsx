import { useState } from "react";
import "./list.scss";
import Card from "../card/Card";

function List({ posts }) {
  const [postList, setPostList] = useState(posts);

  const handleDelete = (postId) => {
    const updatedList = postList.filter((post) => post.id !== postId);
    setPostList(updatedList);
  };

  return (
    <div className="list">
      {postList.map((item) => (
        <Card key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default List;