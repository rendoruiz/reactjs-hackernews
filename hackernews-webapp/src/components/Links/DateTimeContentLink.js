import { Link } from "react-router-dom";
import moment from 'moment';

const DateTimeContentLink = ({ contentTime, contentId, minified = false, readonly = false }) => {
  const momentTime = moment.unix(contentTime).format('LLLL');
  const momentRelativeTime = moment.unix(contentTime).fromNow();
  // const title = !minified ? momentTime : `${momentRelativeTime} | ${momentTime}`;

  // const minifyDateTime = (momentString) => {
  //   const minified = momentString
  //     .replace('a few seconds ago', '0m')
  //     .replace('a ', '1')
  //     .replace('an ', '1')
  //     .replace('s ', '')
  //     .replace('ago', '')
  //     .replace('year', 'y')
  //     .replace('month', 'm')
  //     .replace('week', 'w')
  //     .replace('day', 'd')
  //     .replace('hour', 'h')
  //     .replace('minute', 'm')
  //     .replace('second', 's')
  //     .replaceAll(' ', '');
  //   return minified;
  // }

  return !contentTime ? null : !readonly ? ( 
    <Link
      to={"/s/" + contentId}
      title={momentTime}
    >
      {/* { !minified ? momentRelativeTime : minifyDateTime(momentRelativeTime) } */}
      { momentRelativeTime }
    </Link>)
  : (<span title={momentTime}>{ momentRelativeTime }</span>);
}
 
export default DateTimeContentLink;