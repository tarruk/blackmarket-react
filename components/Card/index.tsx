import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative z-10 flex flex-col items-center bg-white rounded-lg px-10 py-6 w-full max-w-[360px] min-w-[340px]">
      {children}
    </div>
  );
};

export default Card;
