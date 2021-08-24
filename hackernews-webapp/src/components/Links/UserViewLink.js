import { Link } from "react-router-dom";

const UserViewLink = ({ userId, isText = false, className }) => {
  return !userId ? null : ( 
    <Link
      to={"/u/" + userId}
      title="Go to user page"
      className={className}
    >
      { (!isText ? "u/" : "") + userId }
    </Link>
  );
}
 
export default UserViewLink;