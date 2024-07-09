import { toast, Zoom } from "react-toastify";

export const alertaErro = (obj) => {
  toast.error(
    <div className="text-center">
      <h3>Erro!</h3>
      <h5>{obj.message !== undefined ? obj.message : obj }</h5>
    </div>
  );
};
export const alertaSucesso = (obj) => {
  toast.success(
    <div className="text-center">
      <h3>Concluído!</h3>
      <h5>{obj.message !== undefined ? obj.message : obj }</h5>
    </div>
  );
};
export const alertaAtencao = (obj) => {
  toast.warn(
    <div className="text-center">
      <h3>Atenção!</h3>
      <h5>{obj.message !== undefined ? obj.message : obj }</h5>
    </div>
  );
};

export const alertaDefault = (action, message, flagFunction) => {
  toast(
    <div className="text-center">
      <h3>Atenção!</h3>
      <h4>Você tem certeza que deseja {message}?</h4>
      <br />
      <button
        className="btn btn-success btn-toaster me-3"
        onClick={() => {
          action();
          toast.dismiss();
        }}
      >
        Sim
      </button>
      <button
        className="btn btn-danger btn-toaster"
        onClick={() => {
          toast.dismiss();
          flagFunction(false);
        }}
      >
        Cancelar
      </button>
    </div>,

    {
      theme: "light",
      position: "top-center",
      transition: Zoom,
      progress: undefined,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      style: { width: "500px" },
    }
  );
};
