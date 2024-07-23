import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import banner from "/public/banner.png"
import Categories from "./flyout-menu"

const Hero = () => {
  return (
    <div className="w-full relative">
      <Categories />
      {/* <div className=" flex justify-center items-center w-full">
        <Image src={banner} alt="Trendi banner"
        className="w-5/6 mx-auto"/>
      </div> */}
    </div>
  )
}

export default Hero
