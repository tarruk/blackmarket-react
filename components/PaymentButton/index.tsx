import { MouseEventHandler, PropsWithChildren, PropsWithoutRef } from "react";
import { BsCreditCard, BsCurrencyBitcoin, BsPaypal } from "react-icons/bs";

type PaymentButtonType = "card" | "paypal" | "crypto";

interface PaymentButtonProps {
  type: PaymentButtonType;
  className?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function PaymentButton({ type, onClick }: PaymentButtonProps) {
  const ButtonImage = () => {
    switch (type) {
      case "card":
        return <BsCreditCard size={60} />;
      case "crypto":
        return <BsCurrencyBitcoin size={60} />;
      case "paypal":
        return <BsPaypal size={60} />;
    }
  };

  const text = (() => {
    switch (type) {
      case "card":
        return "Credit";
      case "crypto":
        return "Crypto";
      case "paypal":
        return "Paypal";
    }
  })();

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-5 hover:scale-110 transition-transform"
    >
      <ButtonImage />
      <p className="text-xl">{text}</p>
    </div>
  );
}
