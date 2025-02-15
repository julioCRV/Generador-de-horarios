import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import data from "../data/data.json";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const horarios = [
  "06:45 - 08:15", "08:15 - 09:45", "09:45 - 11:15", "11:15 - 12:45", "12:45 - 14:15",
  "14:15 - 15:45", "15:45 - 17:15", "17:15 - 18:45", "18:45 - 20:15", "20:15 - 21:45"
];

const HorarioOrganizador = () => {
  const [nivel, setNivel] = useState("");
  const [materia, setMateria] = useState("");
  const [docente, setDocente] = useState("");
  const [horariosFiltrados, setHorariosFiltrados] = useState([]);

  // Reiniciar materia y docente cuando cambia el nivel, pero no borrar `horariosFiltrados`
  useEffect(() => {
    setMateria("");
    setDocente("");
  }, [nivel]);

  // Reiniciar docente cuando cambia la materia
  useEffect(() => {
    setDocente("");
  }, [materia]);

  // Agregar horarios de la materia seleccionada sin borrar los previos
  useEffect(() => {
    if (nivel && materia && docente && data[nivel] && data[nivel][materia]) {
      const [docenteNombre, grupo] = docente.split(" - Grupo ");
      const materiaData = data[nivel][materia];

      // Filtrar horarios del docente y grupo seleccionados
      const nuevoHorario = materiaData.filter(d => d.docente === docenteNombre && d.grupo === grupo);

      // Evitar duplicados en la tabla
      if (!horariosFiltrados.some(h => h.docente === docenteNombre && h.grupo === grupo && h.materia === materia)) {
        setHorariosFiltrados([...horariosFiltrados, ...nuevoHorario.map(h => ({ ...h, materia }))]);
      }
    }
  }, [docente]);

  const quitarDocente = (docenteGrupo) => {
    setHorariosFiltrados(horariosFiltrados.filter(h => `${h.docente} - Grupo ${h.grupo}` !== docenteGrupo));
  };

  const handlePrint = () => {
    const table = document.getElementById("scheduleTable");
    html2canvas(table).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "schedule.png";
      link.click();
    });
  };

  return (
    <div>
      <div>
        <select onChange={(e) => setNivel(e.target.value)} value={nivel}>
          <option value="">Seleccione Nivel</option>
          {Object.keys(data).map((nivel) => (
            <option key={nivel} value={nivel}>{nivel}</option>
          ))}
        </select>

        <select onChange={(e) => setMateria(e.target.value)} value={materia} disabled={!nivel || !data[nivel]}>
          <option value="">Seleccione Materia</option>
          {nivel && data[nivel] && Object.keys(data[nivel]).map((materia) => (
            <option key={materia} value={materia}>{materia}</option>
          ))}
        </select>

        <select onChange={(e) => setDocente(e.target.value)} value={docente} disabled={!materia || !data[nivel] || !data[nivel][materia]}>
          <option value="">Seleccione Docente</option>
          {materia && data[nivel] && data[nivel][materia] && data[nivel][materia].map((d, index) => (
            <option key={index} value={`${d.docente} - Grupo ${d.grupo}`}>
              {d.docente} - Grupo {d.grupo}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={handlePrint}>Imprimir</button>
      
      <table id="scheduleTable" border="1">
        <thead>
          <tr>
            <th>Horario</th>
            {diasSemana.map(dia => <th key={dia}>{dia}</th>)}
          </tr>
        </thead>
        <tbody>
          {horarios.map((hora, idx) => (
            <tr key={idx}>
              <td>{hora}</td>
              {diasSemana.map(dia => (
                <td key={dia}>
                  {horariosFiltrados.map((h, index) => (
                    h.dias.includes(dia) && h.horarios[h.dias.indexOf(dia)] === hora ? (
                      <div key={index}>
                        {h.materia} - {h.docente} ({h.grupo})
                        <button onClick={() => quitarDocente(`${h.docente} - Grupo ${h.grupo}`)}>X</button>
                      </div>
                    ) : null
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorarioOrganizador;
