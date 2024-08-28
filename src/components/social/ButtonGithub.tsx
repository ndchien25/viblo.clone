import { Github } from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

export default function ButtonGithub() {
    return (
        <Button className="bg-white border hover:bg-sky-400 border-slate-400 px-[5%] py-[2%] w-full" asChild>
            <Link to="/" className="flex items-center space-x-1">
                <Github color="#ec324e" strokeWidth={1.75} />
                <span className="text-black">Google</span>
            </Link>
        </Button>
    )
}