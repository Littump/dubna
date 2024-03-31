import { Field } from "formik";

type Props = {
    children: string | JSX.Element;
    className?: string;
    name: string;
    onClick?: () => void;
};

function CheckboxComponent({ children, className, name, onClick }: Props) {
    return (
        <div className={` ${className}`}>
            <Field
                onClick={onClick}
                name={name}
                id={name}
                type="checkbox"
                className="hidden peer"
            />
            <label
                htmlFor={name}
                className={`label cursor-pointer flex justify-center peer-checked:text-white px-4 transition hover:bg-blue-300 hover:text-white peer-checked:bg-blue-500 bg-blue-50 border-blue-500 rounded-lg border`}
            >
                {children}
            </label>
        </div>
    );
}

export default CheckboxComponent;
