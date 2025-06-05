import "./Home.css";
const Home = () => {
  return (
    <div className="container">
      <figure className="fontPageFigure">
        <img
          src="../../assets/Estadio_Municipal_La_Albuera.jpg"
          alt="Estadio de la sego"
          className="fontPageImg"
        />
        <figcaption className="imgOrigin">
          Imagen de
          <a
            href="https://upload.wikimedia.org/wikipedia/commons/3/3f/Estadio_Municipal_La_Albuera.jpg"
            target="_blank"
          >
            {" "}
            wikipedia
          </a>
          , con licencia:{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
          >
            CC BY-SA 4.0
          </a>
        </figcaption>
      </figure>
      <h1 className="fontPageTitle">Coliseum Deportivo</h1>
      <p className="fontPageDescription">
        Disfruta de entrevistas, tertulias y programas deportivos 🎙🎥 en
        Coliseum Deportivo, el deporte más cercano, contigo
      </p>

      <hr />

      <div className="crew">
        <div className="crewMember">
          <h3>Dirigido por: <br /> Victor Martín Calera</h3>
          <img
            src={`https://coliseumdeportivo-back.onrender.com/files/download/Victor_Martin_Calera.jpg`}
            alt="Victor Martin Calera"
            crossOrigin="use-credentials"
          />
        </div>
        <div className="crewMember">
          <h3>Colaborador: <br /> Jésus Pascual Aragoneses</h3>
          <img
            src={`https://coliseumdeportivo-back.onrender.com/files/download/Jesus_Pascual_Aragonesesjpg.jpg`}
            alt="Victor Martin Calera"
            crossOrigin="use-credentials"
          />
        </div>
        <div className="crewMember">
            <h3>Colaborador: <br /> Carlos Calera Fuente</h3>
          <img
            src={`https://coliseumdeportivo-back.onrender.com/files/download/Carlos_Calera_Fuente.jpg`}
            alt="Victor Martin Calera"
            crossOrigin="use-credentials"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
