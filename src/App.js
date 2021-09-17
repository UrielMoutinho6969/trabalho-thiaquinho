import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [period, setPeriod] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [professores, setProfessores] = useState("");
  const [hora, setHoras] = useState("");
  const [cadastros, setCadastros] = useState([]);
  function handleSubmit(e) {
    console.log(period);
    e.preventDefault();
    setCadastros([
      ...cadastros,
      {
        id: new Date().getTime(),
        period,
        disciplina,
        professores,
        hora,
      },
    ]);
    setPeriod("");
    setDisciplina("");
    setHoras("");
    setProfessores("");
  }

  useEffect(() => {
    const NewCadastros = localStorage.getItem("@disciplinas:cadastros");
    setCadastros(JSON.parse(NewCadastros));
  }, []);

  useEffect(() => {
    localStorage.setItem("@disciplinas:cadastros", JSON.stringify(cadastros));
  }, [cadastros]);
  function handleDelete(id) {
    setCadastros(cadastros.filter((item) => item.id !== id));
  }
  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleSubmit}>
        <div>
          <h2>Cadastro de Horas</h2>
          <label htmlFor="period">Períodos</label>
          <select
            name="period"
            id="period"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
          >
            <option value="">selecione</option>
            <option value="1º periodo">1º periodo</option>
            <option value="2º periodo">2º periodo</option>
            <option value="3º periodo">3º periodo</option>
            <option value="4º periodo">4º periodo</option>
            <option value="5º periodo">5º periodo</option>
            <option value="6º periodo">6º periodo</option>
          </select>
        </div>
        <div>
          <label htmlFor="disciplina">Disciplina</label>
          <input
            type="text"
            name="disciplina"
            value={disciplina}
            onChange={(e) => {
              setDisciplina(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="professor">Professores</label>
          <select
            name="professor"
            id="professor"
            value={professores}
            onChange={(e) => {
              setProfessores(e.target.value);
            }}
          >
            <option value="">selecione</option>
            <option value="Cadu">Cadu</option>
            <option value="Samantha">Samantha</option>
            <option value="Debora">Debora</option>
          </select>
        </div>
        <div>
          <label htmlFor="hora">Carga horária</label>
          <input
            type="text"
            name="hora"
            value={hora}
            onChange={(e) => {
              setHoras(e.target.value);
            }}
          />
        </div>
        <button>Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Disciplinas</th>
            <th>Professor</th>
            <th>Carga Hora</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cadastros.map((item, ind) => (
            <tr key={ind}>
              <td>{item.period}</td>
              <td>{item.disciplina}</td>
              <td>{item.professores}</td>
              <td>{item.hora}</td>
              <td colSpan={1}>
                <button
                  className="Excluir"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
