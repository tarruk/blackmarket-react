import { cn } from "@/utils";
import PaymentButton from "../PaymentButton";

interface PaymentSectionInterface {
  className?: String;
}

export default function PaymentSection({ className }: PaymentSectionInterface) {
  function Separator() {
    return <div className="w-px h-20 bg-gray-400"></div>;
  }

  return (
    <section
      className={cn(
        className,
        "mx-auto w-full flex items-center justify-center flex-col gap-10 bg-white z-50",
      )}
    >
      <h2 className="sm:text-4xl text-2xl"> Payment Methods </h2>
      <div className="flex gap-8 sm:gap-20">
        <PaymentButton
          type="card"
          onClick={(e) => console.log("card")}
        />
        <Separator />
        <PaymentButton
          type="paypal"
          onClick={(e) => console.log("paypal")}
        />
        <Separator />
        <PaymentButton
          type="crypto"
          onClick={(e) => console.log("crypto")}
        />
      </div>
    </section>
  );
}
