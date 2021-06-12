$("#trueStamp").find(".textarea").each( function () { doTextareaControls($(this)) } );
$("#stampInfoConc").find(".textareaControls").prepend("<button class=\"carimboConc\">Carimbo Concessionária</button>");

controlsEvents();

function doTextareaControls(textarea) {
    textarea.prepend("<div class=\"textareaOverlay\"><div class=\"textareaControls\"><button class=\"ocultaTextarea\">Ocultar</button><button class=\"ocultaControls\">⋮</button></div></div>");
}

function controlsEvents() {

    $(".ocultaControls").on("click", function (e) {
        let controls = $(this).parent();
        if (e.ctrlKey && e.shiftKey) {
            $(".textareaControls").addClass("controlsOcultos");
            $(".textareaControls").children().not(".ocultaControls").hide();
        } else if (controls.hasClass("controlsOcultos")) {
            controls.removeClass("controlsOcultos");
            controls.children().not(".ocultaControls").show();
        } else {
            controls.addClass("controlsOcultos");
            controls.children().not(".ocultaControls").hide();
        }
    });

    $(".ocultaTextarea").on("click", function () {
        let textareaAlvo = $(this).parent().parent().parent();
        if (textareaAlvo.hasClass("textareaOculta")) {
            textareaAlvo.removeClass("textareaOculta")
            $(this).text("Ocultar");
        } else {
            textareaAlvo.addClass("textareaOculta");
            $(this).text("Desocultar");
        }
    });

    $(".carimboConc").on("click", function () { navigator.clipboard.writeText("@!@CONCESSIONÁRIA\n" + $("#stampInfoConc").find(".innerTextarea")[0].outerText); } ); 

}
