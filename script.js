/* =========================================================
   PLANETA EM DADOS
   JavaScript completo
   Ranking mundial + modal de país
========================================================= */


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function abrirCategoria(categoria) {

    window.location.href =
        categoria + ".html";
}


function voltar() {

    window.location.href =
        "index.html";
}


/* =========================================================
   CATEGORIAS
========================================================= */

var categorias =
    document.querySelectorAll(
        ".categoria"
    );


categorias.forEach(
    function(categoria) {

        var x =
            Math.random() * 100;

        var y =
            Math.random() * 100;


        categoria.style.setProperty(
            "--bola-x",
            x + "%"
        );


        categoria.style.setProperty(
            "--bola-y",
            y + "%"
        );


        categoria.addEventListener(
            "mouseenter",
            function() {

                var rotacao =
                    Math.random() * 30 - 15;


                categoria.style.setProperty(
                    "--rotacao",
                    rotacao + "deg"
                );

            }
        );

    }
);


/* =========================================================
   CONFIGURAÇÃO DOS MAPAS
========================================================= */

const CONFIG_MAPAS = {

    "tema-verde": {

        titulo:
            "Desmatamento no mundo",

        descricao:
            "Variação anual da área florestal em relação à área de floresta.",

        url:
            "https://ourworldindata.org/grapher/change-forest-area-share-total.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            "%",

        casas:
            2,

        ano:
            "2025",

        fonte:
            "FAO — Global Forest Resources Assessment 2025 / Our World in Data",

        tipo:
            "divergente"
    },


    "tema-azul": {

        titulo:
            "Plástico chegando aos oceanos",

        descricao:
            "Estimativa anual de plástico que chega ao oceano através dos rios.",

        url:
            "https://ourworldindata.org/grapher/plastic-entering-ocean.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            " toneladas/ano",

        casas:
            2,

        ano:
            "2019",

        fonte:
            "Meijer et al. (2021) / Our World in Data",

        tipo:
            "normal",

        corFraca:
            "#fff3e0",

        corForte:
            "#2196f3"
    },


    "tema-ciano": {

        titulo:
            "Estresse hídrico no mundo",

        descricao:
            "Retirada de água doce em relação aos recursos internos disponíveis.",

        url:
            "https://ourworldindata.org/grapher/freshwater-withdrawals-as-a-share-of-internal-resources.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            "%",

        casas:
            1,

        ano:
            "2022",

        fonte:
            "FAO / Our World in Data",

        tipo:
            "normal",

        corFraca:
            "#e0f7fa",

        corForte:
            "#00bcd4"
    },


    "tema-vermelho": {

        titulo:
            "Área afetada por queimadas",

        descricao:
            "Área anual registrada como queimada por incêndios florestais.",

        url:
            "https://ourworldindata.org/grapher/annual-area-burnt-by-wildfires-gwis.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            " ha",

        casas:
            0,

        ano:
            "2024",

        fonte:
            "Global Wildfire Information System / Our World in Data",

        tipo:
            "normal",

        corFraca:
            "#fff3b0",

        corForte:
            "#d73027"
    },


    "tema-lima": {

        titulo:
            "Resíduos plásticos mal gerenciados",

        descricao:
            "Quantidade estimada de resíduos plásticos que não recebem gerenciamento adequado.",

        url:
            "https://ourworldindata.org/grapher/mismanaged-plastic-waste.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            " toneladas",

        casas:
            0,

        ano:
            "2019",

        fonte:
            "Meijer et al. (2021) / Our World in Data",

        tipo:
            "normal",

        corFraca:
            "#f1f8e9",

        corForte:
            "#8bc34a"
    },


    "tema-amarelo": {

        titulo:
            "Emissões de gases de efeito estufa",

        descricao:
            "Emissões anuais de gases de efeito estufa, incluindo mudanças no uso da terra.",

        url:
            "https://ourworldindata.org/grapher/total-ghg-emissions.csv?v=1&csvType=full&useColumnShortNames=false",

        unidade:
            " tCO₂e",

        casas:
            0,

        ano:
            "2024",

        fonte:
            "Jones et al. (2025) / Our World in Data",

        tipo:
            "normal",

        corFraca:
            "#fffde7",

        corForte:
            "#ffc107"
    }
};


/* =========================================================
   CRIAR MAPA
========================================================= */

function criarMapa() {

    const pagina =
        document.querySelector(
            ".pagina"
        );


    if (!pagina) {
        return;
    }


    const classeTema =
        Array.from(
            pagina.classList
        ).find(
            function(classe) {

                return CONFIG_MAPAS[
                    classe
                ];

            }
        );


    if (!classeTema) {
        return;
    }


    const config =
        CONFIG_MAPAS[
            classeTema
        ];


    const conteudo =
        document.querySelector(
            ".conteudo"
        );


    if (!conteudo) {
        return;
    }


    const botao =
        document.createElement(
            "button"
        );


    botao.className =
        "mapa-botao";


    botao.textContent =
        "🌍 Ver mapa mundial";


    const mapa =
        document.createElement(
            "section"
        );


    mapa.className =
        "mapa-container";


    mapa.innerHTML = `

        <h2 class="mapa-titulo">
            ${config.titulo}
        </h2>

        <p class="mapa-subtitulo">
            ${config.descricao}
        </p>

        <div class="mapa-carregando">
            Carregando dados do mundo...
        </div>

    `;


    const cabecalho =
        conteudo.querySelector(
            ".cabecalho"
        );


    if (cabecalho) {

        cabecalho.insertAdjacentElement(
            "afterend",
            botao
        );


        botao.insertAdjacentElement(
            "afterend",
            mapa
        );

    } else {

        conteudo.prepend(
            mapa
        );

        conteudo.prepend(
            botao
        );
    }


    botao.addEventListener(
        "click",
        function() {

            const aberto =
                mapa.classList.toggle(
                    "aberto"
                );


            botao.textContent =
                aberto
                    ? "🌍 Ocultar mapa mundial"
                    : "🌍 Ver mapa mundial";


            if (
                aberto &&
                !mapa.dataset.carregado
            ) {

                carregarMapa(
                    mapa,
                    config
                );

            }

        }
    );
;
}


/* =========================================================
   CARREGAR DADOS
========================================================= */

async function carregarMapa(
    container,
    config
) {

    container.dataset.carregado =
        "true";


    try {

        const d3 =
            await import(
                "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm"
            );


        const topojson =
            await import(
                "https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm"
            );


        const resultados =
            await Promise.all([

                fetch(
                    "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"
                ).then(
                    function(resposta) {

                        return resposta.json();

                    }
                ),

                d3.csv(
                    config.url
                )

            ]);


        const mundo =
            resultados[0];


        const dados =
            resultados[1];


        const paises =
            topojson.feature(
                mundo,
                mundo.objects.countries
            );


        const colunaValor =
            dados.columns.find(
                function(coluna) {

                    return (
                        coluna !== "Entity" &&
                        coluna !== "Code" &&
                        coluna !== "Year"
                    );

                }
            );


        if (!colunaValor) {

            throw new Error(
                "Coluna de valores não encontrada."
            );

        }


        const dadosPorNome = {};


        dados.forEach(
            function(linha) {

                const valor =
                    Number(
                        linha[
                            colunaValor
                        ]
                    );


                if (
                    !Number.isFinite(
                        valor
                    )
                ) {
                    return;
                }


                if (
                    String(
                        linha.Year
                    ) !==
                    String(
                        config.ano
                    )
                ) {
                    return;
                }


                dadosPorNome[
                    normalizar(
                        linha.Entity
                    )
                ] = {

                    valor:
                        valor,

                    ano:
                        linha.Year,

                    nome:
                        linha.Entity

                };

            }
        );


        const dadosPorCodigo = {};


        dados.forEach(
            function(linha) {

                const valor =
                    Number(
                        linha[
                            colunaValor
                        ]
                    );


                if (
                    !linha.Code ||
                    !Number.isFinite(
                        valor
                    )
                ) {
                    return;
                }


                if (
                    String(
                        linha.Year
                    ) !==
                    String(
                        config.ano
                    )
                ) {
                    return;
                }


                dadosPorCodigo[
                    linha.Code
                ] = {

                    valor:
                        valor,

                    ano:
                        linha.Year,

                    nome:
                        linha.Entity

                };

            }
        );


        const mapaDados =
            paises.features.map(
                function(pais) {

                    const nome =
                        pais.properties.name;


                    const nomeNormalizado =
                        normalizar(
                            nome
                        );


                    const aliases =
                        ALIASES[
                            nomeNormalizado
                        ] || [];


                    let dado =
                        dadosPorNome[
                            nomeNormalizado
                        ];


                    if (!dado) {

                        for (
                            const alias
                            of aliases
                        ) {

                            dado =
                                dadosPorNome[
                                    normalizar(
                                        alias
                                    )
                                ];


                            if (dado) {
                                break;
                            }

                        }

                    }


                    if (!dado) {

                        const codigo =
                            pais.id;


                        if (
                            codigo &&
                            dadosPorCodigo[
                                codigo
                            ]
                        ) {

                            dado =
                                dadosPorCodigo[
                                    codigo
                                ];

                        }

                    }


                    return {

                        pais:
                            pais,

                        dado:
                            dado || null

                    };

                }
            );


        desenharMapa(
            d3,
            container,
            mapaDados,
            config
        );


    } catch (erro) {

        console.error(
            erro
        );


        container.innerHTML = `

            <div class="mapa-carregando">

                Não foi possível carregar
                os dados do mapa.

            </div>

        `;

    }
}


/* =========================================================
   ALIASES
========================================================= */

const ALIASES = {

    "united states of america": [
        "United States"
    ],

    "dem rep congo": [
        "Democratic Republic of Congo"
    ],

    "dominican rep": [
        "Dominican Republic"
    ],

    "central african rep": [
        "Central African Republic"
    ],

    "eq guinea": [
        "Equatorial Guinea"
    ],

    "bosnia and herz": [
        "Bosnia and Herzegovina"
    ],

    "cote divoire": [
        "Cote d'Ivoire",
        "Côte d'Ivoire"
    ],

    "fr s": [
        "France"
    ],

    "s": [
        "South Sudan"
    ],

    "timor leste": [
        "Timor-Leste",
        "East Timor"
    ],

    "cape verde": [
        "Cabo Verde"
    ],

    "turkiye": [
        "Turkey"
    ],

    "iran": [
        "Iran"
    ],

    "south korea": [
        "South Korea"
    ],

    "north korea": [
        "North Korea"
    ],

    "russian federation": [
        "Russia"
    ],

    "venezuela": [
        "Venezuela"
    ],

    "bolivia": [
        "Bolivia"
    ],

    "tanzania": [
        "Tanzania"
    ],

    "lao pdr": [
        "Laos"
    ],

    "viet nam": [
        "Vietnam"
    ],

    "czechia": [
        "Czech Republic"
    ],

    "slovakia": [
        "Slovak Republic"
    ],

    "eswatini": [
        "Swaziland"
    ]
};


/* =========================================================
   NORMALIZAR NOMES
========================================================= */

function normalizar(texto) {

    return String(
        texto || ""
    )

        .normalize(
            "NFD"
        )

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .toLowerCase()

        .replace(
            /[^a-z0-9]/g,
            ""
        );
}


/* =========================================================
   DESENHAR MAPA
========================================================= */

function desenharMapa(
    d3,
    container,
    mapaDados,
    config
) {

    container.innerHTML = `

        <h2 class="mapa-titulo">
            ${config.titulo}
        </h2>

        <p class="mapa-subtitulo">
            ${config.descricao}
        </p>

        <svg
            class="mapa-svg"
            viewBox="0 0 1000 560"
            role="img"
            aria-label="${config.titulo}"
        ></svg>

        <div class="mapa-legenda">

            <div class="legenda-titulo">
                Legenda
            </div>

            <div class="legenda-escala">

                <span
                    class="legenda-esquerda"
                >
                    Menor valor
                </span>

                <div
                    class="legenda-gradiente"
                ></div>

                <span
                    class="legenda-direita"
                >
                    Maior valor
                </span>

            </div>

            <div class="legenda-valores">

                <span
                    class="legenda-min"
                >
                    —
                </span>

                <span
                    class="legenda-zero"
                >
                    —
                </span>

                <span
                    class="legenda-max"
                >
                    —
                </span>

            </div>

        </div>

        <div class="mapa-fonte">

            Dados:
            ${config.fonte}.

            Ano de referência:
            ${config.ano}.

        </div>

        <div class="mapa-overlay">

            <div class="mapa-modal">

                <button
                    class="mapa-fechar"
                    type="button"
                    aria-label="Fechar"
                >
                    ×
                </button>

                <h2 id="modalPais">
                    País
                </h2>

                <p
                    class="mapa-modal-descricao"
                    id="modalDescricao"
                >
                    Informações do país.
                </p>

                <div
                    class="mapa-modal-valor"
                >

                    <div
                        class="mapa-modal-numero"
                        id="modalValor"
                    >
                        —
                    </div>

                    <div
                        class="mapa-modal-label"
                    >
                        ${config.descricao}
                    </div>

                </div>

                <div
                    class="mapa-modal-ranking"
                >

                    Posição no ranking:
                    <strong
                        id="modalPosicao"
                    >
                        —
                    </strong>

                </div>

                <div
                    class="mapa-modal-dados"
                >

                    <div
                        class="mapa-modal-item"
                    >

                        <strong>
                            ANO
                        </strong>

                        <span id="modalAno">
                            —
                        </span>

                    </div>

                    <div
                        class="mapa-modal-item"
                    >

                        <strong>
                            INDICADOR
                        </strong>

                        <span>
                            ${config.titulo}
                        </span>

                    </div>

                </div>

                <div
                    class="mapa-modal-fonte"
                    id="modalFonte"
                >
                    Fonte:
                    ${config.fonte}.
                </div>

            </div>

        </div>

    `;


    const rankingBotao =
        document.createElement(
            "button"
        );


    rankingBotao.className =
        "ranking-botao ranking-dentro-mapa";


    rankingBotao.textContent =
        "🏆 Ver ranking mundial";


    container.appendChild(
        rankingBotao
    );


    rankingBotao.addEventListener(
        "click",
        function() {

            abrirRanking(
                container
            );

        }
    );


    const svg =
        d3.select(
            container.querySelector(
                ".mapa-svg"
            )
        );


    const largura =
        1000;


    const altura =
        560;


    const projecao =
        d3.geoNaturalEarth1();


    projecao.fitSize(
        [largura, altura],
        {
            type:
                "FeatureCollection",

            features:
                mapaDados.map(
                    function(item) {

                        return item.pais;

                    }
                )
        }
    );


    const caminho =
        d3.geoPath(
            projecao
        );


    const valores =
        mapaDados

            .filter(
                function(item) {

                    return (
                        item.dado !== null
                    );

                }
            )

            .map(
                function(item) {

                    return item.dado.valor;

                }
            );


    if (
        valores.length === 0
    ) {

        container.innerHTML = `

            <div class="mapa-carregando">
                Nenhum dado disponível.
            </div>

        `;

        return;
    }


    const minimo =
        Math.min.apply(
            null,
            valores
        );


    const maximo =
        Math.max.apply(
            null,
            valores
        );


    /* =====================================================
       RANKING
    ===================================================== */

    const ranking =
        mapaDados

            .filter(
                function(item) {

                    return (
                        item.dado !== null
                    );

                }
            )

            .sort(
                function(a, b) {

                    return (
                        b.dado.valor -
                        a.dado.valor
                    );

                }
            );


    container.__rankingDados =
        ranking;


    container.__configMapa =
        config;


    /* =====================================================
       ESCALA
    ===================================================== */

    let escala;


    if (
        config.tipo ===
        "divergente"
    ) {

        const limite =
            Math.max(
                Math.abs(minimo),
                Math.abs(maximo)
            );


        escala =
            d3.scaleDiverging(
                d3.interpolateRdYlGn
            )
            .domain([
                -limite,
                0,
                limite
            ]);

    } else {

        escala =
            d3.scaleSequential(
                d3.interpolateRgb(
                    config.corFraca,
                    config.corForte
                )
            )
            .domain([
                minimo,
                maximo
            ]);

    }


    /* =====================================================
       LEGENDA
    ===================================================== */

    const legendaEsquerda =
        container.querySelector(
            ".legenda-esquerda"
        );


    const legendaDireita =
        container.querySelector(
            ".legenda-direita"
        );


    const legendaGradiente =
        container.querySelector(
            ".legenda-gradiente"
        );


    const legendaMin =
        container.querySelector(
            ".legenda-min"
        );


    const legendaZero =
        container.querySelector(
            ".legenda-zero"
        );


    const legendaMax =
        container.querySelector(
            ".legenda-max"
        );


    legendaMin.textContent =
        formatarValor(
            minimo,
            config
        );


    legendaMax.textContent =
        formatarValor(
            maximo,
            config
        );


    if (
        config.tipo ===
        "divergente"
    ) {

        legendaEsquerda.textContent =
            "Redução";


        legendaDireita.textContent =
            "Aumento";


        legendaZero.textContent =
            formatarValor(
                0,
                config
            );


        legendaGradiente.style.background =
            "linear-gradient(" +
            "90deg, " +
            "#d73027 0%, " +
            "#f6c65b 50%, " +
            "#1a9850 100%" +
            ")";

    } else {

        legendaEsquerda.textContent =
            "Menor valor";


        legendaDireita.textContent =
            "Maior valor";


        legendaZero.textContent =
            "";


        if (
            config.titulo ===
            "Área afetada por queimadas"
        ) {

            legendaGradiente.style.background =
                "linear-gradient(" +
                "90deg, " +
                "#fff3b0 0%, " +
                "#f6c65b 50%, " +
                "#d73027 100%" +
                ")";

        } else {

            legendaGradiente.style.background =
                "linear-gradient(" +
                "90deg, " +
                config.corFraca +
                " 0%, " +
                config.corForte +
                " 100%" +
                ")";

        }
    }


    /* =====================================================
       MODAL DO PAÍS
    ===================================================== */

    const overlay =
        container.querySelector(
            ".mapa-overlay"
        );


    const modalPais =
        container.querySelector(
            "#modalPais"
        );


    const modalDescricao =
        container.querySelector(
            "#modalDescricao"
        );


    const modalValor =
        container.querySelector(
            "#modalValor"
        );


    const modalPosicao =
        container.querySelector(
            "#modalPosicao"
        );


    const modalAno =
        container.querySelector(
            "#modalAno"
        );


    const modalFonte =
        container.querySelector(
            "#modalFonte"
        );


    const botaoFechar =
        container.querySelector(
            ".mapa-fechar"
        );


    function abrirModal(item) {

        modalPais.textContent =
            item.dado.nome ||
            item.pais.properties.name;


        modalDescricao.textContent =
            obterDescricaoValor(
                item.dado.valor,
                config
            );


        modalValor.textContent =
            formatarValor(
                item.dado.valor,
                config
            );


        const posicao =
            ranking.findIndex(
                function(rankingItem) {

                    return (
                        rankingItem.pais ===
                        item.pais
                    );

                }
            ) + 1;


        if (posicao > 0) {

            modalPosicao.textContent =
                posicao + "º";

        } else {

            modalPosicao.textContent =
                "Sem posição";

        }


        modalAno.textContent =
            item.dado.ano ||
            config.ano;


        modalFonte.textContent =
            "Fonte: " +
            config.fonte +
            ".";


        overlay.classList.add(
            "aberto"
        );
    }


    function fecharModal() {

        overlay.classList.remove(
            "aberto"
        );
    }


    /* =====================================================
       PAÍSES
    ===================================================== */

    svg.selectAll(".pais")

        .data(
            mapaDados
        )

        .join("path")

        .attr(
            "class",
            "pais"
        )

        .attr(
            "d",
            function(item) {

                return caminho(
                    item.pais
                );

            }
        )

        .attr(
            "fill",
            function(item) {

                if (!item.dado) {

                    return "rgba(255,255,255,0.035)";

                }


                return escala(
                    item.dado.valor
                );

            }
        )

        .on(
            "click",
            function(evento, item) {

                if (!item.dado) {
                    return;
                }


                abrirModal(
                    item
                );

            }
        );


    /* =====================================================
       FECHAR MODAL
    ===================================================== */

    botaoFechar.addEventListener(
        "click",
        fecharModal
    );


    overlay.addEventListener(
        "click",
        function(evento) {

            if (
                evento.target ===
                overlay
            ) {

                fecharModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function(evento) {

            if (
                evento.key ===
                "Escape" &&
                overlay.classList.contains(
                    "aberto"
                )
            ) {

                fecharModal();

            }

        }
    );
}


/* =========================================================
   RANKING MUNDIAL
========================================================= */

function abrirRanking(
    container
) {

    const ranking =
        container.__rankingDados;


    const config =
        container.__configMapa;


    if (
        !ranking ||
        !ranking.length ||
        !config
    ) {

        return;

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "ranking-overlay";


    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "ranking-modal";


    modal.innerHTML = `

        <button
            class="ranking-fechar"
            type="button"
            aria-label="Fechar"
        >
            ×
        </button>

        <h2>
            🏆 Ranking mundial
        </h2>

        <p
            class="ranking-subtitulo"
        >
            Os 3 países com os maiores
            valores registrados para
            <strong>
                ${config.titulo}
            </strong>.
        </p>

        <div
            class="ranking-lista"
        ></div>

    `;


    const lista =
        modal.querySelector(
            ".ranking-lista"
        );


    const top3 =
        ranking.slice(
            0,
            3
        );


    top3.forEach(
        function(item, indice) {

            const nome =
                item.dado.nome ||
                item.pais.properties.name;


            const itemRanking =
                document.createElement(
                    "div"
                );


            itemRanking.className =
                "ranking-item";


            itemRanking.innerHTML = `

                <div
                    class="ranking-posicao"
                >
                    ${indice + 1}º
                </div>

                <div>

                    <div
                        class="ranking-pais"
                    >
                        ${nome}
                    </div>

                    <div
                        class="ranking-ano"
                    >
                        Ano:
                        ${item.dado.ano}
                    </div>

                </div>

                <div
                    class="ranking-valor"
                >
                    ${
                        formatarValor(
                            item.dado.valor,
                            config
                        )
                    }
                </div>

            `;


            lista.appendChild(
                itemRanking
            );

        }
    );


    overlay.appendChild(
        modal
    );


    document.body.appendChild(
        overlay
    );


    const botaoFechar =
        modal.querySelector(
            ".ranking-fechar"
        );


    function fecharRanking() {

        overlay.classList.remove(
            "aberto"
        );


        setTimeout(
            function() {

                overlay.remove();

            },
            300
        );


        document.removeEventListener(
            "keydown",
            teclaEscape
        );
    }


    function teclaEscape(evento) {

        if (
            evento.key ===
            "Escape"
        ) {

            fecharRanking();

        }

    }


    botaoFechar.addEventListener(
        "click",
        fecharRanking
    );


    overlay.addEventListener(
        "click",
        function(evento) {

            if (
                evento.target ===
                overlay
            ) {

                fecharRanking();

            }

        }
    );


    document.addEventListener(
        "keydown",
        teclaEscape
    );


    requestAnimationFrame(
        function() {

            overlay.classList.add(
                "aberto"
            );

        }
    );
}


/* =========================================================
   FORMATAR VALOR
========================================================= */

function formatarValor(
    valor,
    config
) {

    return valor.toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits:
                config.casas,

            maximumFractionDigits:
                config.casas
        }
    ) + config.unidade;
}


/* =========================================================
   DESCRIÇÃO DO VALOR
========================================================= */

function obterDescricaoValor(
    valor,
    config
) {

    if (
        config.tipo ===
        "divergente" &&
        valor < 0
    ) {

        return (
            "A área florestal diminuiu " +

            Math.abs(
                valor
            ).toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits:
                        config.casas,

                    maximumFractionDigits:
                        config.casas
                }
            ) +

            "% no período analisado."
        );
    }


    if (
        config.tipo ===
        "divergente" &&
        valor > 0
    ) {

        return (
            "A área florestal aumentou " +

            valor.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits:
                        config.casas,

                    maximumFractionDigits:
                        config.casas
                }
            ) +

            "% no período analisado."
        );
    }


    return config.descricao;
}


/* =========================================================
   INICIAR
========================================================= */

criarMapa();