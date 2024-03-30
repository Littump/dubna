import final from "@/assets/addUserFinal.png";

function AddClientFinal() {
  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <h2 className="text-2xl text-blue ">
        Вы успешно добавили нового пользователя
      </h2>
      <img src={final} alt="" className="w-64" />
    </div>
  );
}

export default AddClientFinal;
