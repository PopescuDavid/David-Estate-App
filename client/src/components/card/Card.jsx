import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card({ item, onDelete }) {
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(item.isSaved);

  const handleSubmit = async (postId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.delete(`/posts/${postId}`);
      onDelete(postId);
      toast.success("Post deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete post!");
      console.log(err);
      setError(error);
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: item.id });

      if(!saved){
        setSaved(true);
        toast.success("Saved place successfully!");
      }
      else{
        setSaved(false);
        toast.success("Unsaved place!");
      }
    } catch (err) {
      toast.error("Failed to save place!");
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: saved ? "#fece51" : "none",
                  cursor: "pointer"
                }}
              >
                <img src="/save.png" alt="" />
              </button>
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
          {currentUser && (
            currentUser.id === item.userId && (
              <button className="deleteButton" onClick={() => handleSubmit(item.id)}>
                Remove
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
