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