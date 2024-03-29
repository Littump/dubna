import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

type Props = {
    children: string | JSX.Element;
    items: string[];
    className?: string | null;
    placeholder: string;
    onClick: (text: string) => void;
};

function DropdownInput({
    children,
    items,
    className,
    onClick,
    placeholder,
    ...props
}: Props) {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useDetectClickOutside({
        onTriggered: () => setOpenMenu(false),
    });
    if (!items || !items.length) return null;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <summary
                tabIndex={0}
                role="button"
                className={`flex justify-start bg-white btn `}
                {...props}
                onClick={() => setOpenMenu((prev) => !prev)}
            >
                {children}
                <ChevronDownIcon
                    className={`w-5 h-5 transition absolute right-2 top-4 ${
                        openMenu ? "rotate-0" : "rotate-180"
                    }`}
                />
            </summary>
            <ul
                tabIndex={0}
                className={`${
                    openMenu ? "" : "hidden"
                } absolute top-14 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}
            >
                <li className="text-gray-500 pb-2">{placeholder}</li>
                {items.map((item: string) => (
                    <li
                        onClick={() => {
                            onClick(item);
                            setOpenMenu(false);
                        }}
                        key={item}
                        className="py-2 border-t border-base-300 hover:bg-base-300 transition cursor-pointer rounded-md"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownInput;
