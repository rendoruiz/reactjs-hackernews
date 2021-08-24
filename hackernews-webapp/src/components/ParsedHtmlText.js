import ReactHtmlParser from 'react-html-parser';

const ParsedHtmlText = ({ htmlText }) => {
  return !htmlText ? null : ( 
    <div>
      { ReactHtmlParser(htmlText.replaceAll(/href/g, `target="_blank" rel="noreferrer" href`)) }
    </div>
  );
}
 
export default ParsedHtmlText;