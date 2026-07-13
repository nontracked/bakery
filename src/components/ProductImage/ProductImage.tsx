import './ProductImage.scss'
import {Oval} from "react-loader-spinner";
import Image from "next/image";
import React, {useState} from "react";

interface Props {
  imgSrc: string;
  name: string;
  width: number;
  height: number;
  className?: string;
  onImageLoad?: () => void;
}

export const ProductImage = ({className, imgSrc, name, width, height, onImageLoad}: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const handleLoad = () => {
    setIsLoading(false)
    if (onImageLoad) {
      onImageLoad()
    }
  }
  return (
    <>
      {isLoading && <Oval
        wrapperClass="oval"
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />}
      <Image
        onLoad={handleLoad} loading="eager" className={className} src={imgSrc} alt={name}
        width={width}
        height={height}
      />
    </>
  )
}