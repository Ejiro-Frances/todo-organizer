import { Button } from "./ui/button";
import { format } from "date-fns";

type Props = {
  setIsOpen: (open: boolean) => void;
};

const Introduction = ({ setIsOpen }: Props) => {
  return (
    <section className=" max-w-[95%] mx-auto px-5 py-5 flex justify-between items-center">
      <div>
        <h1 className="font-semibold text-2xl">Hi, Frances</h1>
        <p className="text-[#999999] font-family-DM">Let's get to work today</p>
      </div>
      <div className="flex flex-col justify-between">
        <Button
          onClick={() => setIsOpen(true)}
          className=" text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out"
        >
          + Add Task
        </Button>
        <p className="text-xs md:text-sm text-[#999999] font-family-DM mt-2">
          {format(new Date(), "EEEE d, MMMM yyyy")}
        </p>
      </div>
    </section>
  );
};

export default Introduction;
