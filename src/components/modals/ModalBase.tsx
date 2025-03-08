import { Loader } from '@components/loader'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment } from 'react'

export const ModalBase = ({
  isOpen,
  closeModal,
  title,
  children,
  isLoader,
}: {
  isOpen: boolean
  closeModal: () => void
  title: string
  children: React.ReactNode
  isLoader?: boolean
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0  backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform
               rounded-2xl bg-gray-700 p-6 text-left align-middle shadow-xl transition-all min-h-[calc(10rem)] overflow-auto max-h-[calc(100vh-5rem)]">
                <div className="flex justify-between">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-100"
                  >
                    {title}
                  </DialogTitle>
                  <X
                    onClick={() => closeModal()}
                    className="w-6 h-6 text-gray-100 cursor-pointer"
                  />
                </div>
                {isLoader ? (
                  <div className="flex justify-center items-center h-full mt-5">
                    <Loader className="text-gray-100" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 py-2">
                    {children}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
