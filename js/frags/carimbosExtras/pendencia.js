$("#pendenciaStampHead").hide();

$("#btnPendencia").click(function () {
    $("#popPendStamp").hide()
    $("#pendenciaStampHead").dialog({
        title: "Carimbo de Pendência !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto',
        buttons: {
            "genPendStamp": { 
                text: "Gerar e Copiar Carimbo de Pendência", 
                id: "genPendStamp", 
                click: function () {
                    $("#popPendStamp").show();
                    let finalPendStamp = mountPendStamp();
                    $("#pendenciaStamp").text(finalPendStamp);
                    navigator.clipboard.writeText(finalPendStamp);
                }
            }
        }
    });
});

function mountPendStamp() {
    return "*P1 " + data() + " @!@PENDÊNCIA/ASTRO\n" +
    "OBS: " + $("#obsPendencia").text().trim() + "\n" +
    $("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###";
}   