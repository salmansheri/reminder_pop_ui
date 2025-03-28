'use client';
import { useReminderModal } from "@/hooks/use-remainder-modal";

 


const Header = () => {
    const { onOpen } = useReminderModal();
    return (
        <header className="h-16 border-b dark:border-white/20 border-black/20 ">
            <nav className="px-5 md:px-0 md:max-w-5xl mx-auto flex w-full items-center h-full">
                <button onClick={onOpen} className="justify-end bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-500/90 cursor-pointer">
                    Set Reminder
                </button>
            </nav>
        </header>
    )
}

export default Header; 