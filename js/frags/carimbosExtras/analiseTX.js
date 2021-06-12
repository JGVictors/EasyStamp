$("#analiseTXStampHead").hide();

$("#btnAnaliseTX").click(function () {
    $("#popAnlsTXStamp").hide()
    $("#analiseTXStampHead").css({ "min-width": "580px" });
    $("#analiseTXStampHead").dialog({
        title: "Carimbo para Análise TX !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto',
        buttons: {
            "genAnlsTXStamp": { 
                text: "Gerar e Copiar Carimbo para Análise TX", 
                id: "genAnlsTXStamp", 
                click: function () {
                    $("#popAnlsTXStamp").show();
                    let finalAnlsTXStamp = mountAnlsTXStamp();
                    $("#analiseTXStamp").text(finalAnlsTXStamp);
                    navigator.clipboard.writeText(finalAnlsTXStamp);
                }
            }
        }
    });
});

function mountAnlsTXStamp() {
    return "*P1 " + data() + "  @!@Análise de TX\n" +
    "TA para Análise: " + $("#numAnaliseTX").val() + "\n" +
    mountAnalisys() + "\n" +
    $("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###";
}   