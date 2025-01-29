$(document).ready(function(){
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    }); 
    const sections = $('section');
    const navitems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
        let activeSectionIndex = 0;
        
        console.log(scrollPosition);
        
        if (scrollPosition <= 0){
            header.css('box-shadow', '1px 1px 10px rgba(94, 255, 0, 0)');
        }else{
            header.css('box-shadow', '1px 1px 10px rgba(94, 255, 0, 0)');
        }

        sections.each(function(i){ 
            const section = $(this);
            const sectionTop = section.offset().top - 69;
            const sectionBottom = sectionTop + section.outerHeight();

            if(scrollPosition >= sectionTop && scrollPosition <= sectionBottom){
                activeSectionIndex = i;
                return false; 
            }
        });

        $(navitems).removeClass('active');
        $(navitems[activeSectionIndex]).addClass('active');
    });
});

document.getElementById('form-comentario').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const comentario = document.getElementById('comentario').value;

    // Cria um novo elemento de comentário
    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comentario');

    novoComentario.innerHTML = `
        <h4>${nome} - ${tipo === 'encomendou' ? 'Já encomendou uma arte' : 'Sou admirador'}</h4>
        <p>${comentario}</p>
    `;

    // Adiciona o comentário à lista
    document.getElementById('lista-comentarios').appendChild(novoComentario);

    // Limpa o formulário
    document.getElementById('form-comentario').reset();
});
// Função para carregar comentários existentes
function carregarComentarios() {
    // Aqui você faria uma requisição ao backend para buscar os comentários
    // Exemplo fictício:
    const comentarios = [
        //{ nome: "João", tipo: "encomendou", comentario: "Adorei o trabalho!" },
        //{ nome: "Maria", tipo: "admirador", comentario: "Muito criativo!" }
    ];

    comentarios.forEach(comentario => {
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comentario');

        novoComentario.innerHTML = `
            <h4>${comentario.nome} - ${comentario.tipo === 'encomendou' ? 'Já encomendou uma arte' : 'Sou admirador'}</h4>
            <p>${comentario.comentario}</p>
        `;

        document.getElementById('lista-comentarios').appendChild(novoComentario);
    });
}

// Carrega os comentários quando a página é carregada
window.onload = carregarComentarios;
 




const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Array para armazenar comentários (substitua por um banco de dados em produção)
let comentarios = [];

// Rota para enviar um comentário
app.post('/comentarios', (req, res) => {
    const { nome, tipo, comentario } = req.body;
    const novoComentario = { nome, tipo, comentario };
    comentarios.push(novoComentario);
    res.status(201).send('Comentário adicionado!');
});

// Rota para buscar todos os comentários
app.get('/comentarios', (req, res) => {
    res.json(comentarios);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

document.getElementById('form-comentario').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const comentario = document.getElementById('comentario').value;

    // Envia o comentário para o backend
    try {
        const response = await fetch('http://localhost:3000/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, tipo, comentario })
        });

        if (response.ok) {
            // Exibe o comentário na página
            exibirComentario({ nome, tipo, comentario });
            document.getElementById('form-comentario').reset();
        }
    } catch (error) {
        console.error('Erro ao enviar comentário:', error);
    }
});

// Função para carregar comentários existentes
async function carregarComentarios() {
    try {
        const response = await fetch('http://localhost:3000/comentarios');
        const comentarios = await response.json();

        comentarios.forEach(comentario => {
            exibirComentario(comentario);
        });
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}

// Função para exibir um comentário na página
function exibirComentario(comentario) {
    const novoComentario = document.createElement('div');
    novoComentario.classList.add('comentario');

    novoComentario.innerHTML = `
        <h4>${comentario.nome} - ${comentario.tipo === 'encomendou' ? 'Já encomendou uma arte' : 'Só admirador'}</h4>
        <p>${comentario.comentario}</p>
    `;

    document.getElementById('lista-comentarios').appendChild(novoComentario);
}

// Carrega os comentários quando a página é carregada
window.onload = carregarComentarios;