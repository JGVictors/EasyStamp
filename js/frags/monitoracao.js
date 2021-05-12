//VALIDAR SE TEM MOTIVO DE MONITORAÇÃO E VALIDAR SE TEM TEMPO!

var tempoMotInput = $("#tempoMonitoracao");
var limiteMotInput = $("#limiteMonitoracao");
var motivoMotInput = $("#motivoMonitoracao");
var obsMotInput = $("#obsMonitoracao");

loadMot();

function loadMot() { 
    $("#monitoracaoStampHead").hide();
    $("#monitoracaoTp").hide();
    motEvents();
}

function dataLimiteMot() { return data(Date.now() + ($("#tempoMonitoracao").val() * 60 * 60000)); }

function motEvents() {

    $("#motivoMonitoracao").autocomplete({ 
        source: ["Tíquete Programado"," Área de Risco", "Com Impedimento", "Acesso Dificultado"],
        delay: "0",
        classes: { "ui-autocomplete" : "motivosMonitoracao" },
        open: function () { $(".motivosMonitoracao").css("z-index", Number($(this).parents().find(".ui-dialog").css("z-index")) + 1); },
        change: function () { isMotDeTP() ? monitoracaoDeTP(true) : monitoracaoDeTP (false); }
    });

    $("#btnMonitoracao").click(function () {
        $("#popMotStamp").hide()
        $("#monitoracaoStampHead").dialog({
            title: "Carimbo de Monitoração !",
            modal: true,
            draggable: false,
            resizable: false,
            heigth: 'auto',
            width: 'auto',
            zindex: 101,
            buttons: {
                "genMotStamp": { 
                    text: "Gerar e Copiar Carimbo de Monitoração", 
                    id: "genMotStamp", 
                    click: function () {
                        if (!validaCampos()) return;
                        $("#popMotStamp").show();
                        let finalMotStamp = mountMotStamp();
                        $("#monitoracaoStamp").text(finalMotStamp);
                        navigator.clipboard.writeText(finalMotStamp);
                    }
                }
            }
        });
    });

    tempoMotInput.on("change keyup", function () { updateDataLimite() });

    motivoMotInput.on("change", function() { isMotDeTP() ? monitoracaoDeTP(true) : monitoracaoDeTP (false); });

    limiteMotInput.parent().on("click", function (e) {
        if (limiteMotInput.val() == "") return;
        let dataLimite = new Date(limiteMotInput.val());
        if (e.ctrlKey) {
            if (dataLimite.getMinutes() >= 55) {
                dataLimite.setMinutes(00);
            } else {
                xTempo = 50;
                while (xTempo >= 0) {
                    if (dataLimite.getMinutes() >= xTempo) {
                        dataLimite.setMinutes(xTempo + 5);
                        break;
                    }
                    xTempo = xTempo - 5;
                }
            }
        } else {
            if (dataLimite.getMinutes() >= 45) dataLimite.setMinutes(00);
            else if (dataLimite.getMinutes() >= 30) dataLimite.setMinutes(45);
            else if (dataLimite.getMinutes() >= 15) dataLimite.setMinutes(30);
            else dataLimite.setMinutes(15);
        }
        limiteMotInput.val(data(dataLimite));
    })

}

function updateDataLimite() { limiteMotInput.val(data(Date.now() + ($("#tempoMonitoracao").val() * 60 * 60000))); }

function isMotDeTP() { return motivoMotInput.val() == "Tíquete Programado" }

function monitoracaoDeTP(isMotDeTP) {
    if (isMotDeTP) {
        $("#monitoracaoTp").show();
        $("#motPrecisaAnalise").prop("checked", false);
    } else {
        $("#monitoracaoTp").hide();
        $("#motPrecisaAnalise").prop("checked", true);
    }
}

function validaCampos() {
    valido = true;
    
    if (tempoMotInput.val().length == 0) {
        tempoMotInput.effect("shake", { distance: 5 });
        tempoMotInput.addClass("inputInvalido");
        setTimeout(function () { tempoMotInput.removeClass("inputInvalido"); }, 800);
        valido = false;
    }
    
    if (motivoMotInput.val().length == 0) {
        motivoMotInput.effect("shake", { distance: 5 });
        motivoMotInput.addClass("inputInvalido");
        setTimeout(function () { motivoMotInput.removeClass("inputInvalido"); }, 800);
        valido = false;
    }

    if (isMotDeTP()) {
        if (obsMotInput.text().trim().length == 0) {
            obsMotInput.effect("shake", { distance: 5 });
            obsMotInput.addClass("inputInvalido");
            setTimeout(function () { obsMotInput.removeClass("inputInvalido"); }, 800);
            valido = false;
        }
    }

    if(!valido) {
        $("#popMotStamp").hide();
        $("#genMotStamp").prop("disabled", true);
        setTimeout( function () { $("#genMotStamp").prop("disabled", false); }, 1000 )
    }

    return valido;
}

function mountMotStamp() {
    let finalRetencaoStamp = "*P1 " + limiteMotInput.val() + " @!@MONITORAÇÃO P1\n" +
    "Tempo de Monitoração: " + tempoMotInput.val() + " horas" + "\n" +
    (isMotDeTP() ? ("TP Raiz: " + $("#numTpRaiz").val() + "\n") : ("Motivo: " + motivoMotInput.val() + "\n")) +
    (obsMotInput.text().trim().length > 0 ? "OBS: " + obsMotInput.text().trim() + "\n" : "") +
    ($("#motPrecisaAnalise").is(":checked") ? mountAnalisys() + "\n" : "") +
    $("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###";

    return finalRetencaoStamp;
}