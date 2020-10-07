loadColaboradores();

var colaboradores;
var inputColaborador = $("#colaborador");
var buttonAddColaborador = $("#addColaborador");

function loadColaboradores() {
    colaboradores = JSON.parse(localStorage.getItem("colaboradores"));
    if (!colaboradores) {
        localStorage.setItem("colaboradores", JSON.stringify(['João Victor Gonçalves dos Santos', 'Alan Fernandes Pardinho']));
        colaboradores = JSON.parse(localStorage.getItem("colaboradores"));
    }

    $("#colaborador").autocomplete({ 
        source: colaboradores,
        delay: "0",
        classes: { "ui-autocomplete": "colaboradores"}
    });
}

function addColaborador(colaborador) {
    colaboradores.push(colaborador);
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
}

inputColaborador.on("input focus", function() {
    inputColaborador.removeClass("validColaborador notValidColaborador");
    if (colaboradores.some(e => new RegExp(inputColaborador.val(), "gi").test(e))) inputColaborador.addClass("validColaborador");
    else inputColaborador.addClass("readingColaborador");
});

inputColaborador.focusout(function() {
    inputColaborador.removeClass("readingColaborador");
    if (colaboradores.includes(inputColaborador.val())) {
        inputColaborador.addClass("validColaborador");
        buttonAddColaborador.prop('disabled', true);
    } else {
        inputColaborador.addClass("notValidColaborador");;
        buttonAddColaborador.prop('disabled', false);
    }
    updateStampFoot();
});

buttonAddColaborador.click(function() {
    buttonAddColaborador.prop('disabled', true);
    inputColaborador.removeClass("readingColaborador notValidColaborador").addClass("validColaborador");
    if (!colaboradores.includes(inputColaborador.val())) addColaborador(inputColaborador.val());
});