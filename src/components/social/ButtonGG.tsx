import { Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/configs/axios"

export default function ButtonGG() {
    const handleLoginGG = async () => {
        const response = await apiClient.get("/v1/login/google");
        window.location.href = response.data.url;
    }
    
    return (
        <Button onClick={handleLoginGG} className="bg-white border hover:bg-sky-400 border-slate-400 px-[5%] py-[2%] w-full" asChild>
            <div className="flex items-center space-x-1">
                <Chrome color="#ec324e" strokeWidth={1.75} />
                <span className="text-black">Google</span>
            </div>
        </Button>
    )
}