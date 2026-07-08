'use client'
import './BackButton.scss'
import {ChevronLeft} from "lucide-react";
import {Button} from "@/ui/Button";
import React from "react";
import {useRouter} from "next/navigation";

interface Props {
  className: string;
}

export const BackButton = ({className}: Props) => {
  const router = useRouter()
  const handleBack = () => {
    router.push('/')
  }
  return (
    <Button className={className} label={<ChevronLeft />} onClick={handleBack} />
  )
}