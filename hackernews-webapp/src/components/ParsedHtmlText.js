import ReactHtmlParser from 'react-html-parser';

import styles from '../styles/components/ParsedHtmlText.module.css'

const ParsedHtmlText = ({ htmlText, className }) => {
  const parseHtml = (rawHtmlText) => {
    return ReactHtmlParser(rawHtmlText.replaceAll(/href/g, `target="_blank" rel="noreferrer" href`))
  }

  return !htmlText ? null : ( 
    <div className={className ?? styles.htmlText}>
      { parseHtml(htmlText) }
    </div>
  );
}
 
export default ParsedHtmlText;