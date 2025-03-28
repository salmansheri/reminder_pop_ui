'use client';
import { useReminderModal } from "@/hooks/use-remainder-modal";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToast from "./custom-toast";
import { useReminderMutation } from "@/hooks/use-reminder-mutation";
import { BiLoaderCircle } from "react-icons/bi";
 

const suggestions = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Morning", "Afternoon", "Evening", "Night", "AM", "PM", "Hour", "Minute",
    "Remind", "Meeting", "Event", "Appointment", "Call", "Task", "Due", "Schedule",
    "Date", "Time", "Tomorrow", "Next Week", "Deadline", "Reminder", "Alert"
];

const ReminderPopupUI = () => {
    const { isOpen, onClose } = useReminderModal();
    const [input, setInput] = useState(""); 
    const [filteredSuggestion, setFilteredSuggestion] = useState<string[]>([]); 
    const { mutate: createReminder, isPending: IsReminderMutationPending } = useReminderMutation(); 

    const handleClose = () => onClose(); 

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:5253/api/notification`); 
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data); 
            toast.custom(() => <CustomToast message={`Reminder: ${data.message}`} />)
        }

        eventSource.onerror = () => {
            console.error("SSE connection error"); 
            eventSource.close();
        }

        return () => {
            eventSource.close(); 
        }

    }, [])

    const handleInputChage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setInput(value); 
        if (value.length > 0){
            const words = value.split(/\s+/); 
            const lastWord = words[words.length  - 1].toLowerCase(); 
            setFilteredSuggestion(
                suggestions.filter((s) => s.toLowerCase().startsWith(lastWord))
                
            ); 
        } else {
            setFilteredSuggestion([]); 
        }
         
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInput((prev) => {
            const words = prev.split(/\s+/) 
            words[words.length - 1] = suggestion; 
            return words.join(" "); 
        }); 
    }

    const handleSetReminder = () => {
        if (!input.trim()){
            toast.custom(() => <CustomToast message="Reminder cannot be Set" />, { duration: 6000 }); 
            return; 
        }

    
        createReminder(input, {
            onSuccess: () =>{
                onClose(); 
            }
        })

    }


    return (
        <AnimatePresence>

            {isOpen && (
                <motion.div
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 50}}
                    transition={{duration: 0.3}}
                    className="fixed top-20 left-1/2 tranform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-80"
                >
                    <h2 className="text-lg font-bold text-black">Set Reminder</h2>

                    <textarea  placeholder="Enter Reminder Message" value={input} onChange={handleInputChage} rows={4} cols={50} className="w-full p-2 border rounded mt-2 text-black border-indigo-500" />

                    {filteredSuggestion.length > 0 && (
                        <ul className="bg-gray-100 p-2 rounded mt-2 text-black">
                            {filteredSuggestion.map((s, index) => (
                                <li onClick={() => handleSuggestionClick(s)} key={index} className="cursor-pointer hover:bg-gray-200 p-1 ">
                                    {s}

                                </li>
                            ))}

                        </ul>
                    )}
                    <div className="mt-4  flex jusify-end gap-2">
                        <button className="bg-indigo-500 hover:bg-indigo-500/90 cursor-pointer px-4 py-2 rounded flex items-center justify-center" onClick={handleSetReminder}>
                            {IsReminderMutationPending ? (
                                <>
                                    <BiLoaderCircle className="mr-2 animate-spin size-4" />
                                    Loading...
                                </>
                            ): (
                                <>
                                    Remind
                                </>
                            )}
                        </button>

                        <button onClick={handleClose} className="border border-indigo-500 text-indigo-500 cursor-pointer px-4 py-2 rounded">Cancel</button>

                    </div>

                </motion.div>
            )}

        </AnimatePresence>
    )
}

export default ReminderPopupUI; 