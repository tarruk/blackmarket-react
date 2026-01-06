import { RiInstagramFill } from "react-icons/ri";
import Logo from "../Logo";
import PageSection from "../PageSection";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import TextField from "../TextField";
import Button from "../Button";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

interface FooterOptionProps {
  title: string;
  action: () => void;
}

interface FooterColumnProps {
  options: FooterOptionProps[];
  title: string;
}

const FooterColumn = ({ title, options }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-2 items-start ">
      <h3 className="text-white font-semibold">{title}</h3>
      {options.map((option) => (
        <button
          key={option.title}
          className="text-white"
          onClick={option.action}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

interface FooterMarketingBar {
  className?: string;
}

const FooterMarketingBar = ({ className }: FooterMarketingBar) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <Logo className="text-white" />
      <div className="flex gap-2">
        <RiInstagramFill
          color="white"
          size={30}
        />
        <FaFacebookSquare
          color="white"
          size={30}
        />
        <FaTwitter
          color="white"
          size={30}
        />
        <FaLinkedin
          color="white"
          size={30}
        />
      </div>
    </div>
  );
};

const FooterOptions = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:w-2/3 w-full container gap-10">
      <FooterMarketingBar className="sm:hidden" />
      <div className="grid grid-rows-2 grid-cols-2 gap-10 sm:flex justify-between">
        <FooterColumn
          title="Restored furniture"
          options={[
            {
              title: "Entries",
              action: () => {
                router.push("/entries");
              },
            },
            { title: "Rates", action: () => {} },
            { title: "Categories", action: () => {} },
            { title: "Sale", action: () => {} },
          ]}
        />
        <FooterColumn
          title="Stay connected"
          options={[
            { title: "Instagram", action: () => {} },
            { title: "Tik Tok", action: () => {} },
            { title: "Facebook", action: () => {} },
          ]}
        />
        <FooterColumn
          title="Black Market"
          options={[
            { title: "Our history", action: () => {} },
            { title: "Staff", action: () => {} },
            { title: "Work with us", action: () => {} },
          ]}
        />
        <FooterColumn
          title="Support"
          options={[
            { title: "Chat", action: () => {} },
            { title: "Address", action: () => {} },
          ]}
        />
      </div>
      <FooterMarketingBar className="hidden sm:flex" />
    </div>
  );
};

const FooterForm = () => {
  return (
    <div className="flex flex-col text-white gap-5 sm:w-1/3 w-full">
      <h2 className="font-bold"> Subscribe to our weekly newsteller!</h2>
      <form>
        <TextField
          label={"Email"}
          placeholder="Type your email"
        />
        <Button
          variant="outlineInverse"
          className="w-full"
        >
          Suscribe
        </Button>
      </form>
      <p>
        By subscribing you agree to receive weekly email's with our latest news
        and updates.
      </p>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-black flex flex-col sm:flex-row p-10 sm:gap-20">
      <FooterOptions />
      <FooterForm />
    </footer>
  );
}
