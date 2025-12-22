import { PropsWithChildren } from "react";

interface SuccessModalProps extends PropsWithChildren {
  isOpen: boolean;
}

export default function Modal(props: SuccessModalProps) {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 shadow-xl animate-fade-in">
        {props.children}
      </div>
    </div>
  );
}
