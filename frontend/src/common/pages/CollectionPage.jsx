import React from "react";
import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const { collectionId } = useParams();
  return <div>collection {collectionId}</div>;
};

export default CollectionPage;
