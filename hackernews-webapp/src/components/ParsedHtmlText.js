import ReactHtmlParser from 'react-html-parser';

import styles from '../styles/components/ParsedHtmlText.module.css'

const ParsedHtmlText = ({ htmlText, className }) => {
  // const parseHtml = (rawHtmlText) => {
  //   return ReactHtmlParser(rawHtmlText.replaceAll(/href/g, `target="_blank" rel="noreferrer" href`))
  // }

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.nodeName === 'A') {
      window.open(e.target.href, '_blank');
    }
  }

  return !htmlText ? null : ( 
    <div className={className ?? styles.htmlText} onClick={(e) => handleClick(e)}>
      {/* { parseHtml(htmlText) } */}
      { ReactHtmlParser(htmlText) }
    </div>
  );
}
 
export default ParsedHtmlText;