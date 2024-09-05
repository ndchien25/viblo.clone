import { Link } from "react-router-dom";
import banner from "@/assets/b26b4c5a-f466-4938-a537-6518e76c3fdc.jpg"
export default function Banner() {
  return (
    <>
      <Link className="bg-inherit" to="/">
        <div className="bg-rose-900">
          <div className="w-full max-w-7xl px-7 flex m-auto justify-center items-center overflow-hidden">
            <img src={banner} height={168} />
          </div>
        </div>
      </Link>
    </>   
  )
}