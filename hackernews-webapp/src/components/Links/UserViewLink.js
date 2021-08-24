import { Link } from "react-router-dom";

const UserViewLink = ({ username, isText = false }) => {
  return !username ? null : ( 
    <Link
      to={"/u/" + username}
      title="Go to user page"
    >
      { (!isText ? "u/" : "") + username }
    </Link>
  );
}
 
export default UserViewLink;