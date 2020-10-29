import { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLElement>["className"];
}

const Lines: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20%"
      height="50%"
      viewBox="0 0 102 566"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M70.2891 565.373C60.2664 553.702 49.5522 542.312 42.8916 528.242C35.0753 511.73 34.4982 493.164 34.0956 475.249C33.5195 449.614 35.3659 424.441 44.622 400.267C53.7539 376.417 70.9579 357.352 81.2481 334.152C90.22 313.925 97.653 293.839 99.5612 271.643C102.098 242.139 100.92 212.094 93.0723 183.538C88.9117 168.398 84.6123 153.785 75.4802 141"
        stroke="#8F8686"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.2891 425.373C27.2664 413.702 16.5522 402.312 9.89165 388.242C2.07533 371.73 1.49819 353.164 1.09561 335.249C0.519529 309.614 2.36589 284.441 11.622 260.267C20.7539 236.417 37.9579 217.352 48.2481 194.152C57.22 173.925 64.653 153.839 66.5612 131.643C69.0977 102.139 67.9196 72.0936 60.0723 43.5382C55.9117 28.3983 51.6123 13.7848 42.4802 1"
        stroke="#8F8686"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Lines;
