// Icon.tsx
import * as bsIcons from "react-icons/bs";
import * as faIcons from "react-icons/fa";
import * as giIcons from "react-icons/gi";

type PropsIcon = {
    id?: string;
    icon: string;
    className?: string;
    outline: boolean;
}

export const Icon = (props: PropsIcon): JSX.Element => {
    const { id, icon, className } = props;
    const { ...icons } = { ...faIcons, ...giIcons, ...bsIcons };
    const Icon = icons[icon as keyof typeof icons];
    return (
        <span id={id}>{Icon ? <Icon className={className} /> : ""}</span>
    );
};