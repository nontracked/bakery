'use client'
import {JSX} from 'react/jsx-runtime';
import './TabsLoader.scss'
import ContentLoader, {IContentLoaderProps} from "react-content-loader";

export const TabsLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  return (
    <ContentLoader
      className="tab-loader"
      speed={1}
      width={180}
      height={53}
      viewBox="0 0 180 53"
      backgroundColor="#cfcfcf"
      foregroundColor="#b8b8b8"
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="180" height="53" />
    </ContentLoader>
  )
}