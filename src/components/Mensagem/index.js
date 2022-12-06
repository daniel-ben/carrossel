import './style.css'

export default function Mensagem({ setRes, setShowMessage, mensagem, ...props }) {
  return (
    <div className="mensagem" style={{ ...props.style }}>
      <p className="mensagem__text">{mensagem}</p>

      <div className="mensagem__botoes-container">
        <button
          className="mensagem__botao mensagem__botao-sim"
          onClick={(e) => {
            e.preventDefault();
            setShowMessage(false);
            setRes(true);
          }}
        >
          Sim
        </button>
        <button
          className="mensagem__botao mensagem__botao-cancelar"
          onClick={(e) => {
            e.preventDefault();
            setShowMessage(false);
            setRes(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
