import classNames from "../../utils/classNames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  horizontal?: boolean;
};

type PropsHeader = {
  className?: string;
  children?: React.ReactNode;
  padding?: string;
  semLinha?: boolean;
};

type PropsBox = {
  className?: string;
  children?: React.ReactNode;
  horizontal?: boolean;
  style?: React.CSSProperties;
  loading?: boolean;
};

type PropsContent = {
  children: React.ReactNode | string | string;
  flexDirection?: "flex-row" | "flex-col";
  className?: string;
};

export const BoxContainer = ({ children, className, horizontal }: Props) => {
  return (
    <div className={classNames("flex gap-4", !horizontal && "flex-col", className)}>
      {children}
    </div>
  );
};

export default function Box(props: PropsBox): JSX.Element {
  const { className, children, horizontal, style } = props;

  return (
    <div
      className={classNames(
        "bg-white p-4 shadow flex rounded-lg gap-y-2",
        !horizontal && "flex-col",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

const Header = (props: PropsHeader): JSX.Element => {
  const { children, className, padding = "pb-3", semLinha } = props;

  return (
    <div
      className={classNames(
        "flex w-full justify-between items-center col-span-full",
        className,
        padding,
        !semLinha && "border-b"
      )}
    >
      {children}
    </div>
  );
};

const Content = ({ children, flexDirection = "flex-row", className }: PropsContent) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 items-start",
        flexDirection,
        className
      )}
    >
      {children}
    </div>
  );
};

Content.Titulo = ({ children, className }: { children: React.ReactNode; className?: string;}) => {
  return (
    <h2
      id="applicant-information-title"
      className={classNames(
        "text-lg leading-6 font-medium text-gray-900",
        className
      )}
    >
      {children}
    </h2>
  );
};

Header.Content = Content;
Box.Header = Header;