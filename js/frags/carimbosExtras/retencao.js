$("#retencaoStampHead").hide();

$("#btnRetencao").click(function () {
    $("#popRetStamp").hide()
    $("#retencaoStampHead").dialog({
        title: "Carimbo de Retenção !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto',
        buttons: {
            "genRetStamp": { 
                text: "Gerar e Copiar Carimbo de Retenção", 
                id: "genRetStamp", 
                click: function () {
                    $("#popRetStamp").show();
                    let finalRetStamp = mountRetStamp();
                    $("#retencaoStamp").text(finalRetStamp);
                    navigator.clipboard.writeText(finalRetStamp);
                }
            }
        }
    });
});

function mountRetStamp() {
    return "*P1 " + data() + " @!@RETENÇÃO\n" +
    "TA Raiz: " + $("#numRetencao").val() + "\n" +
    "OBS: " + $("#obsRetencao").text().trim() + "\n" +
    ($("#retPrecisaAnalise").is(":checked") ? mountAnalisys() + "\n" : "") +
    $("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###";
}   