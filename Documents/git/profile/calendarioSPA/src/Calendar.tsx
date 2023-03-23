import  './Calendar.css'


import React, { useState } from 'react';

function Calendar() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [diasDisponiveis, setDiasDisponiveis] = useState([
    {
      data: new Date(),
      horarios: [
        { hora: '08:00', disponivel: true },
        { hora: '09:00', disponivel: false },
        { hora: '10:00', disponivel: true },
        { hora: '11:00', disponivel: true },
        { hora: '12:00', disponivel: true },
      ]
    },
    // aqui você pode adicionar mais dias/horários disponíveis
  ]);
  const [diaSelecionado, setDiaSelecionado] = useState();

  function handleDiaClick(data) {
    console.log("Clique detectado! Dia selecionado: ", data);
    exibirJanelaDeHorarios();



    const diaSelecionado = diasDisponiveis.find(dia => dia.data === data);
    if (diaSelecionado) {
      console.log('clicou');
      setDiaSelecionado(diaSelecionado);
    }
  }
  function exibirJanelaDeHorarios() {
    // Cria o conteúdo HTML do modal com as opções de horário
    const modalContent = `
      <div class="modal">
        <div class="modal-content">
          <!-- Aqui você pode adicionar o HTML e CSS necessários para exibir as opções de horário -->
        </div>
      </div>
    `;
    
    // Adiciona o modal ao corpo da página
    document.body.insertAdjacentHTML("beforeend", modalContent);
    
    // Configura o evento de clique nos horários disponíveis
    const horariosDisponiveis = document.querySelectorAll(".horario-disponivel");
    horariosDisponiveis.forEach((horario, index) => {
      horario.addEventListener("click", () => {
        handleHorarioClick(index);
        
        // Remove o modal da página após o usuário selecionar um horário
        document.querySelector(".modal").remove();
      });
    });
  }

  function handleHorarioClick(index) {
    const novoDiaSelecionado = { ...diaSelecionado };
    novoDiaSelecionado.horarios[index].disponivel = !novoDiaSelecionado.horarios[index].disponivel;

    const novosDiasDisponiveis = [...diasDisponiveis];
    const indexDiaSelecionado = novosDiasDisponiveis.findIndex(dia => dia.data === novoDiaSelecionado.data);
    novosDiasDisponiveis.splice(indexDiaSelecionado, 1, novoDiaSelecionado);

    setDiaSelecionado(novoDiaSelecionado);
    setDiasDisponiveis(novosDiasDisponiveis);
  }

  function getWeeks(mes) {
    const weeks = [];
    const firstDay = new Date(mes.getFullYear(), mes.getMonth(), 1);
    const lastDay = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
    let currentWeek = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(mes.getFullYear(), mes.getMonth(), i);
      currentWeek.push(currentDate);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      for (let i = currentWeek.length; i < 7; i++) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }

  return (
    <div>
      <h2>Calendário</h2>

      <p>{mesAtual.toLocaleString('default', { month: 'long' })} {mesAtual.getFullYear()}</p>

      <table>
        <thead>
          <tr>
            <th>Domingo</th>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
            <th>Sábado</th>
          </tr>
        </thead>
        <tbody>
          {getWeeks(mesAtual).map((week, index) => (
            <tr key={index}>
              {week.map(day => (
                <td 
                  key={day ? day.toLocaleDateString() : Math.random()}
                  onClick={() => handleDiaClick(day)}
                  className={diaSelecionado && diaSelecionado.data.toLocaleDateString() === (day && day.toLocaleDateString()) ? 'selected' : ''}
                >
                  {day && day.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {diaSelecionado &&
        <div className="dialog">
          <h3>{diaSelecionado.data.toLocaleDateString()}</h3>
          <ul>
            {diaSelecionado.horarios.map((horario, index) => (
              <li 
                key={horario.hora}
                className={horario.disponivel ? 'disponivel' : 'indisponivel'}
                onClick={() => handleHorarioClick(index)}
              >
                {horario.hora}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default Calendar;