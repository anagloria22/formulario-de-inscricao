let participantes = [
    {
      nome: "Ana Glória",
      email: "anagloria@gmail.com",
      dataInscricao: new Date(2024, 2, 25, 20, 19),
      dataCheckIn: new Date(2024, 3, 1, 9, 53)
    },
    {
      nome: "Robson Wendel",
      email: "robson@gmail.com",
      dataInscricao: new Date(2024, 1, 15, 15, 52),
      dataCheckIn: new Date(2024, 2, 30, 9, 26)
    },
    {
      nome: "Carla Silva",
      email: "carla@gmail.com",
      dataInscricao: new Date(2024, 0, 10, 10, 30),
      dataCheckIn: new Date(2024, 1, 28, 12, 15)
    },
    {
      nome: "João da Silva",
      email: "joao@gmail.com",
      dataInscricao: new Date(2023, 11, 5, 8, 45),
      dataCheckIn: new Date(2024, 2, 5, 14, 20)
    },
    {
      nome: "Maria Santos",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 3, 1, 11, 10),
      dataCheckIn: new Date(2024, 3, 1, 16, 40)
    },
    {
      nome: "Lucas Oliveira",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2024, 0, 20, 18, 55),
      dataCheckIn: new Date(2024, 1, 29, 8, 30)
    },
    {
      nome: "Amanda Pereira",
      email: "amanda@gmail.com",
      dataInscricao: new Date(2024, 2, 12, 14, 25),
      dataCheckIn: new Date(2024, 3, 2, 10, 10)
    },
    {
      nome: "Pedro Henrique",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 0, 5, 9, 20),
      dataCheckIn: new Date(2024, 2, 25, 17, 5)
    },
    {
      nome: "Juliana Oliveira",
      email: "juliana@gmail.com",
      dataInscricao: new Date(2024, 1, 8, 12, 40),
      dataCheckIn: new Date(2024, 2, 20, 9, 45)
    },
    {
      nome: "Ricardo Pereira",
      email: "ricardo@gmail.com",
      dataInscricao: new Date(2024, 1, 25, 19, 15),
      dataCheckIn: new Date(2024, 2, 29, 15, 30)
    }
  ];
  
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
      dataCheckIn =  `
        <button data-email = "${participante.email}" onclick = "fazerCheckIn(event)">
          Confirmar check-in
        </button>
      `
    }
    
    return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }
  
  
  const atualizarLista = (participantes) => {
    let output = ""
  
    for (let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    document.querySelector('tbody').innerHTML = output
  }
  
  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }

    const participanteExiste = participantes.find((p) => p.email == participante.email)

    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)


    event.target.querySelector('[name = "nome"]').value = ""
    event.target.querySelector('[name = "email"]').value = ""
  }

  const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o Check-in?'

    if(confirm(mensagemConfirmacao) == false) {
      return
    }
   
    const participante = participantes.find((p) => p.email == event.target.dataset.email)

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
  }