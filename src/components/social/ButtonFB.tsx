import { Facebook } from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

export default function ButtonFB() {
    return (
        <Button className="bg-white border hover:bg-sky-400 border-slate-400 px-[5%] py-[2%] w-full" asChild>
            <Link to="/">
                <Facebook color="#3b5998" strokeWidth={1.75} />
                <span className="text-black">Facebook</span>
            </Link>
        </Button>
    )
}