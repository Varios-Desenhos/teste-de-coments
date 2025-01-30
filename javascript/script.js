$(document).ready(function() {
    // Função para alternar o menu móvel
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Função para destacar a seção ativa durante a rolagem
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();
        let activeSectionIndex = 0;

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 69;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    // Função para adicionar um novo comentário
    document.getElementById('form-comentario').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const tipo = document.getElementById('tipo').value;
        const comentario = document.getElementById('comentario').value;

        const novoComentario = {
            nome: nome,
            tipo: tipo,
            comentario: comentario
        };

        adicionarComentario(novoComentario);
        document.getElementById('form-comentario').reset();
    });

    // Função para adicionar um comentário ao DOM e ao localStorage
    function adicionarComentario(comentario) {
        const listaComentarios = document.getElementById('lista-comentarios');
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comentario');

        novoComentario.innerHTML = `
            <h4>${comentario.nome} - ${comentario.tipo === 'encomendou' ? 'Já encomendou uma arte' : 'Sou admirador'}</h4>
            <p>${comentario.comentario}</p>
        `;

        listaComentarios.appendChild(novoComentario);

        // Salvar no localStorage
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push(comentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }

    // Função para carregar comentários do localStorage
    function carregarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        const listaComentarios = document.getElementById('lista-comentarios');

        comentarios.forEach(comentario => {
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario');

            novoComentario.innerHTML = `
                <h4>${comentario.nome} - ${comentario.tipo === 'encomendou' ? 'Já encomendou uma arte' : 'Sou admirador'}</h4>
                <p>${comentario.comentario}</p>
            `;

            listaComentarios.appendChild(novoComentario);
        });
    }

    // Carregar comentários quando a página é carregada
    carregarComentarios();
});
