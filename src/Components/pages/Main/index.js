import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from "../../../services/api/api"
import './styles.css'

class Main extends Component {
    //chamando a api
    state= {
        // aqui colocar o valor do que quero popular
        biographies:[]
    }
    // ele era populado depois que component for criado
    componentDidMount(){
        // monta/carrega as bio
        this.loadBiographies();
    }
// fazendo promessa 
loadBiographies = async () => {
    //resposta da api
    // veja a api, verifica meu metodo e retorna 
    const response = await api.get(`/biographies`)
    //console.log("resposta da api", response)
    const { docs } = response.data
    //console.log("Docs que foi retornada da api", docs )

    this.setState({ biographies: docs })

}


// criando a estrutura da pagina
    render() {
    // DEPOIS DE CRIAR O STATE
    // posso colocar, e chamar mais coisas
    const { biographies } = this.state;
        console.log("o que vem do state", biographies)

        return (
            <div className="list-biography">
                {biographies.map(biography => (
                <article key={biography._id}>
                    <strong> {biography.nome}</strong>
                    <p className="biography-description">{biography.description}</p>
                    <Link className="read-more" to={`/biographies/${biography._id}`}>Acessar</Link>
                </article>

                ))}
                
            </div>
        )
    }

}

                    

export default Main
/*
<p className="decription-biography">Descrição</p>
                    <a href="" className="read-more>">Leia mais</a>
                    */