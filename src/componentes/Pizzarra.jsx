
import useShortPollingWithWrite from "../hooks/useShortPoll";

const Pizarra = () => {
  const url = 'http://localhost:3000/pizarra';
  const { contenidoActual, handleChangeContenido } = useShortPollingWithWrite(url);

  return (
    <div className="w-full">
      <h2 className="text-center w-[27rem] text-2xl font-semibold">Pizarra virtual</h2>
      <textarea
        className="textarea textarea-primary w-[28rem] h-72"
        placeholder="Escribe algo..."
        value={contenidoActual}
        onChange={(e) => handleChangeContenido(e.target.value)}
      />
    </div>
  );
};

export default Pizarra;
