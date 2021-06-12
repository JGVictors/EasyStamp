$("#suporteTXStampHead").hide();

$("#btnSuporteTX").click(function () {
    let finalSupTxStamp = mountSupTXStamp();
    $("#suporteTXStamp").text(finalSupTxStamp);
    $("#suporteTXStampHead").dialog({
        title: "Carimbo para Suporte TX !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto',
    });
    navigator.clipboard.writeText(finalSupTxStamp);
});

function mountSupTXStamp() {
    return  "*P1 " + data() + " @!@Suporte TX\n" +
    mountAnalisys() + "\n" +
    $("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###"
}   