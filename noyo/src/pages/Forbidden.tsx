import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

const Forbidden = () => {
    const navigate = useNavigate()
    return (
        <div className="h-[60vh] flex flex-col justify-center items-center gap-4">
            <div className="text-center text-4xl font-bold">
                403 Forbidden
            </div>
            <Button onClick={() => navigate('/')} className="flex justify-center">Go to Home</Button>
        </div>
    )
}

export default Forbidden