import { ApiUrl } from "@/lib/util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useReminderMutation = ()=> {
    return useMutation({
        mutationFn: async (message: string) => {
            const parseMessageResponse = await fetch(`${ApiUrl}/reminder/send`, { 
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ message })
            }); 

            if (!parseMessageResponse.ok) {
                toast.error("Cannot Set Reminder Try Again Later"); 
                throw new Error("Cannot Set Reminder Try again Later!")
            }

            

            const parseMessageData = await parseMessageResponse.json(); 

            const createReminderResponse = await fetch(`${ApiUrl}/sendDelay`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(parseMessageData) 
            }); 

            const createReminderData = await createReminderResponse.json(); 

            

            console.log({ parseMessageData});
            console.log({ createReminderData }) 

           
        }, 
        onSuccess: () => {
            toast.success("Reminder Set Successfully"); 
            

        }, 
        onError:(error) => {
            console.log(error.message); 
            toast.error(error.message); 

        }
    })
        
}