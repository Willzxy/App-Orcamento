class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

class Banco_dados {
    constructor(){
        let id = localStorage.getItem('id')

        if (id === null){
            localStorage.setItem('id', 0)
        }
    }

    GetNewId(){
        let id = localStorage.getItem('id')

        return parseInt(id) + 1
    }

    gravar(x){
        let id = this.GetNewId()

        localStorage.setItem(id, JSON.stringify(x))
        localStorage.setItem('id', id)
    }

    deletar(id){
        localStorage.removeItem(id)

        window.location.reload()
    }

    recuperarDados(){
        let size = localStorage.getItem('id')
        let registros = Array()

        for(let i = 0; i <= size; i++){
            let item = localStorage.getItem(i)
            item = JSON.parse(item)

            if(item === null){
                continue
            }

            registros.push(item)
        }
        return registros
    }

    Dados_fitrados(){
        let dados = this.recuperarDados()
        
        let ano = document.getElementById("anoDate")
        let mes = document.getElementById("mesDate")
        let dia = document.getElementById("dia")
        let tipo = document.getElementById("tipo")
        let descricao = document.getElementById("descricao")
        let valor  = document.getElementById("preco")

        if (ano.value != ''){
            dados = dados.filter(filter => filter.ano == ano.value )
        }
        if (mes.value != ''){
            dados = dados.filter(filter => filter.mes == mes.value )
        }
        if (dia.value != '' ){
            dados = dados.filter(filter => filter.dia == dia.value )
        }
        if (tipo.value != ''){
            dados = dados.filter(filter => filter.tipo == tipo.value )
        }
        if (descricao.value != ''){
            dados = dados.filter(filter => filter.descricao == descricao.value )
        }
        if (valor.value != ''){
            dados = dados.filter(filter => filter.valor == valor.value )
        }

        return dados
    }
}

var bd = new Banco_dados()

function deletar_item(id) {
    bd.deletar(id)
}

function verifyInfo(array){
    let verify = true

    for(let i in array){
        if (array[i] === 'null' || array[i] === '' || array[i] === undefined){
            verify = false
        }
    }

    return verify
}

function carregar_filtrado(){
    let filtro = bd.Dados_fitrados()
    carregar_lista(filtro)
}

function carregar_lista(filtrado){
    let output = document.getElementById("output-dados")
    let registros = undefined

    if (filtrado === undefined){
        registros = bd.recuperarDados()
    }else{
        registros = filtrado
    }

    output.innerHTML = ''

    for(let i=0; i <= registros.length; i++){
        let produto = registros[i]
        let identificador = `table-${i}`

        if(produto === null || produto === undefined){
            continue
        }

        output.innerHTML += 

        `
        <table>
                <thead>
                    <tr>
                        <th class="small">${produto.dia}/${produto.mes}/${produto.ano}</th>
                        <th class="small">${produto.tipo}</th>
                        <th class="medium">${produto.descricao}</th>
                        <th class="small">${produto.valor}</th>
                        <th class="delet" onclick="deletar_item(${i})">+</th>
                    </tr>
                </thead>
        </table>
        `
    }

}

function cadastrar(){
    let ano = document.getElementById("anoDate")
    let mes = document.getElementById("mesDate")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor  = document.getElementById("preco")

    let despesas = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
        )

    let verify = verifyInfo(despesas)

    if (verify == false){
        window.alert("Dados Insuficientes")
        return
    }
    window.alert("Despesa Cadastrada")

    ano.value = 'Ano' 
    mes.value = '' 
    dia.value = '' 
    tipo.value = '-------- Tipo --------' 
    descricao.value = '' 
    valor.value = ''

    bd.gravar(despesas)
    console.log(despesas)
}