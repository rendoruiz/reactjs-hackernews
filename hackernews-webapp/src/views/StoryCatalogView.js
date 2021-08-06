import { useState, useEffect } from "react";

// import UserContentPanel from "../components/UserContentPanel";

const StoryCatalogView = () => {
  const [contentItemCount, setContentItemCount] = useState(20);
  const [itemOrder, setItemOrder] = useState('top');

  useEffect(() => {
    document.title = "Catalog";
  }, [])

  const handleOrderTypeClick = ({ e, order }) => {
    e.preventDefault();
    setItemOrder(order);
    console.log(this.type);
  }

  return ( 
    <div className="page catalog">
      <section className="stories">
        <div className="stories-actions">
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'top'})}>Top</button>
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'best'})}>Best</button>
          <button className="btn" onClick={(e) => handleOrderTypeClick({e, order: 'new'})}>New</button>
        </div>
        
        {/* <UserContentPanel orderBy={itemOrder} itemCount={contentItemCount} setItemCount={setContentItemCount} contentType="story" /> */}
      </section>
      <aside className="sidebar">

      </aside>
    </div>
  );
}
 
export default StoryCatalogView;