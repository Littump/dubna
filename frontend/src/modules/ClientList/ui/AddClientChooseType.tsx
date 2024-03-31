import SetFieldValueType from "@/modules/ClientList/types/setFieldValueType.ts";
import { addClientValuesInterface } from "@/modules/ClientList/ui/AddClient.tsx";

interface Props {
  setFieldValue: SetFieldValueType;
  values: addClientValuesInterface;
}
function AddClientChooseType({ values, setFieldValue }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Кого добавляем?</h2>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => setFieldValue("type", "Физ. лицо")}
          className={`border-2 py-5 px-4 text-lg cursor-pointer w-full hover:scale-105 transition border-blue rounded-xl ${
            values.type === "Физ. лицо" &&
            "bg-light-blue border-light-blue text-white hover:text-white"
          }`}
        >
          Физическое лицо
        </button>{" "}
        <button
          type="button"
          onClick={() => setFieldValue("type", "Юр. лицо")}
          className={`border-2 py-5 px-4 text-lg cursor-pointer w-full hover:scale-105 transition border-blue rounded-xl ${
            values.type === "Юр. лицо" &&
            "bg-light-blue border-light-blue text-white hover:text-white"
          }`}
        >
          Юридическое лицо
        </button>
      </div>
      <button
        type="button"
        className="btn border-0 mt-4 text-xl bg-blue text-white btn-neutral"
        onClick={() => {
          if (values.type !== "") setFieldValue("step", "form");
        }}
      >
        Далee
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}

export default AddClientChooseType;
