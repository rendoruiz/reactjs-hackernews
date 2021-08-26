import { Link } from "react-router-dom";
import moment from 'moment';

const DateTimeContentLink = ({ contentTime, contentId, minified = false }) => {
  const title = !minified 
    ? moment.unix(contentTime).format('LLLL') 
    : `${moment.unix(contentTime).fromNow()} | ${moment.unix(contentTime).format('LLLL')}`;

  const minifyDateTime = (momentString) => {
    const minified = momentString
      .replace('a few seconds ago', '0m')
      .replace('a ', '1')
      .replace('an ', '1')
      .replace('s ', '')
      .replace('ago', '')
      .replace('year', 'y')
      .replace('month', 'm')
      .replace('week', 'w')
      .replace('day', 'd')
      .replace('hour', 'h')
      .replace('minute', 'm')
      .replace('second', 's')
      .replaceAll(' ', '');
    return minified;
  }

  return !contentTime ? null : ( 
    <Link
      to={"/s/" + contentId}
      title={title}
    >
      { !minified 
        ? moment.unix(contentTime).fromNow() 
        : minifyDateTime(moment.unix(contentTime).fromNow())  
      }
    </Link>
  );
}
 
export default DateTimeContentLink;