import { Link } from "react-router-dom";

const UserLink = ({ username }) => {
  return !username ? null : ( 
    <Link
      to={"/u/" + username}
      title="Go to user page"
    >
      {"u/" + username}
    </Link>
  );
}
 
export default UserLink;