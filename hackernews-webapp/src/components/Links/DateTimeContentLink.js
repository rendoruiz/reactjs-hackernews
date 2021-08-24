import { Link } from "react-router-dom";
import moment from 'moment';

const DateTimeContentLink = ({ contentId, contentTime }) => {
  return !contentId || !contentTime ? null : ( 
    <Link
      to={"/s/" + contentId}
      title={moment.unix(contentTime).format('LLLL')}
    >
      { moment.unix(contentTime).fromNow() }
    </Link>
  );
}
 
export default DateTimeContentLink;