import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ReactNode } from 'react'

interface IProps {
    isOpen: boolean;
    close: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
}

const Modal = ({ isOpen, close, title, children }: IProps) => {

    return (
        <>
            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 bg-white/05 backdrop-blur-sm">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-md rounded-xl bg-indigo-100 p-6 backdrop-blur-2xl border-indigo-700 border-2">
                                    {title && <DialogTitle as="h3" className="text-base/7 font-medium">
                                        {title}
                                    </DialogTitle>}
                                    <div className="mt-4">
                                        {children}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

export default Modal