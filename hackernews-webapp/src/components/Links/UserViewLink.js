import { Link } from "react-router-dom";

const UserViewLink = ({ userId, isText = false }) => {
  return !userId ? null : ( 
    <Link
      to={"/u/" + userId}
      title="Go to user page"
    >
      { (!isText ? "u/" : "") + userId }
    </Link>
  );
}
 
export default UserViewLink;