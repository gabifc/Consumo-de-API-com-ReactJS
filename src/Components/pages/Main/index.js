import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from "../../../services/api/api"
import './styles.css'

class Main extends Component {
    //chamando a api
    state = {
        // aqui colocar o valor do que quero popular
        biographies: [],
        biographyInfo: {},
        page: 1
    }
    // ele era populado depois que component for criado
    componentDidMount() {
        // monta/carrega as bio
        this.loadBiographies();
    }
    // fazendo promessa 
    loadBiographies = async (page = 1) => {
        //resposta da api
        // veja a api, verifica meu metodo e retorna 
        const response = await api.get(`/biographies?page=${page}`)
        //console.log("resposta da api", response)
        const { docs, ...biographyInfo } = response.data;
        //console.log("Docs que foi retornada da api", docs )
        this.setState({ biographies: docs, biographyInfo, page })
    }

    prevPage = () => {
        const { page, biographyInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadBiographies(pageNumber);
    }

    // função da página 2 acionada pelos botões
    // mudo o estado da pagina 2. Populo para pagi 1 e dpeois para a pagina 2
    // add pag 1 na class man e repasso como segunda chamada na chave
    nextPage = () => {
        const { page, biographyInfo } = this.state;
        console.log("PAGE DO THIS STATE: ", page)
        if (page === biographyInfo.pages) return;

        const pageNumber = page + 1;
        console.log("PAGE NUMBER: ", pageNumber)
        this.loadBiographies(pageNumber);
    }

    // criando a estrutura da pagina
    render() {
        // DEPOIS DE CRIAR O STATE
        // posso colocar, e chamar mais coisas
        const { biographies, page, biographyInfo } = this.state;
        //console.log("o que vem do state", biographies)
        console.log("Page do Render: ", page)
        return (
            <div className="list-biography">
                {biographies.map(biography => (
                    <article key={biography._id}>
                        <strong>{biography.nome}</strong>
                        <p className="biography-description">{biography.description}</p>
                        <Link className="read-more" to={`/biographies/${biography._id}`} >Acessar</Link>
                    </article>
                ))}


                <div className="actions">
                    <button className="btnPag" disabled={page === 1} onClick={this.prevPage}>
                        Anterior
          </button>
                    <button className="btnPag" disabled={page === biographyInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}

export default Main


