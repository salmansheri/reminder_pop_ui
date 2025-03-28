'use client'; 

import { createPortal } from "react-dom"; 
import { motion } from 'motion/react'; 

const CustomToast = ({message}: { message: string}) => {
    return createPortal(
        <motion.div
            initial={{ opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            className="fixed top-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
>
    {message}

        </motion.div>,
        document.body
    )
}

export default CustomToast; 