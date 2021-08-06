import { useState } from "react";

const UserContentItem = ({ contentId = null }) => {
  const [contentItem, setContentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  

  return ( 
    !contentId 
      ? null
      : <div>user item</div>
  );
}
 
export default UserContentItem;