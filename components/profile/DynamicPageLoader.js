// components/DynamicPageLoader.js

import dynamic from 'next/dynamic';

const DynamicPageLoader = ({ page }) => {
  const DynamicPage = dynamic(() => import(`./${page}`));

  return <DynamicPage />;
};

export default DynamicPageLoader;
