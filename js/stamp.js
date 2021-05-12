var infoConcTextDiv = $("#infoConcTextDiv");

var stampHead = $("#stampHead");
var stampMainContent = $("#stampMainContent");
var stampInfoRota = $("#stampInfoRota");
var stampInfoConc = $("#stampInfoConc");
var stampInfoTP = $("#stampInfoTP");
var stampTipoSite = $("#stampTipoSite");
var stampFoot = $("#stampFoot");
var lastAnalise;

function data() {
    let now = new Date(Date.now());
    let ano = now.getFullYear();
    let mes = ((now.getMonth() + 1) + "").length == 1 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
    let dia = (now.getDate() + "").length == 1 ? "0" + now.getDate() : now.getDate();
    let hora = now.getHours() == "0" ? "00" : (now.getHours() + "").length == 1 ? "0" + now.getHours() : now.getHours();
    let minuto = now.getMinutes() == "0" ? "00" : (now.getMinutes() + "").length == 1 ? "0" + now.getMinutes() : now.getMinutes();
    return ano + "/" + mes + "/" + dia + " " + hora + ":" +  minuto;
}

function updateStampHead() {
    stampHead.text("*P1 " + data() + " @!@ACIONADO CAMPO P1");
}

function updateInfoRota(isIsolado) {
    if ($("input[name=infoRota]:checked").val() == "nPrecisa") {
        stampInfoRota.hide()
    } else {
        stampInfoRota.text(isIsolado ? infoRotaMetro : infoRota)
        stampInfoRota.show(); 
    }
}

function updateInfoConc() {
    if ($("input[name=infoConc]:checked").val() == "nPrecisa") {
        infoConcTextDiv.hide();
        stampInfoConc.hide();
    } else {
        infoConcTextDiv.show();
        stampInfoConc.show();
    }
}

function updateInfoConcText(tipo) {
    switch(tipo) {
        case "padrao":
            stampInfoConc.text(infoConcessionaria)
            break;
        case "altaDemanda":
            stampInfoConc.text("OBS: Não foi possível abrir chamado com a concessionária devido a alta demanda de chamados.")
            break;
        case "semUcMedidor": 
            stampInfoConc.text("OBS: Não foi possível abrir chamado com a concessionária devido a falta de dados da UC/Medidor.")
            break;
        case "outro":
            stampInfoConc.text("OBS: Não foi possível abrir chamado com a concessionária com os dados disponíveis.")
            break;
    }
}

function updateInfoTP() {
    stampInfoTP.text($("input[name=temTp]:checked").val() == "naoTemTP" ? "Não consta TP" : "OBS: Se consta TP favor trocar este texto por informação complementar!");
}

function updateTipoSite() {
    stampTipoSite.text("Site " + $("input[name=tipoSite]:checked").val());
}

function updateStampFoot() {
    stampFoot.text($("#colaborador").val() + " CO-RAM Icomon\n" +
    "###Informe e-escalation###\n" +
    "#prisma-wfm");
}

function loop() {
    updateStampHead();
    setTimeout(function() {(loop())}, 1000);
}

function attCarimbo() {
    updateStampHead();
    updateInfoRota();
    updateInfoConc();
    updateInfoConcText("padrao");
    updateInfoTP();
    updateTipoSite();
    updateStampFoot();
}

attCarimbo();
setTimeout(function() { loop() }, 1000);

function ericssonAnalysis() {
    removeAllRows();
    createRow("GSM Ericsson").find("select[name=erbStatus]").val("Fora de serviço");
    createRow("WCDMA Ericsson").find("select[name=erbStatus]").val("HeartBeat");
    createRow("WCDMA Ericsson").find("select[name=erbStatus]").val("HeartBeat");
    createRow("LTE Huawei").find("input[name=erbAlarmes]").val("TRM FCC Supervisão com Defeito");
    forceUpdateRows();
}

function huaweiAnalysis() {
    removeAllRows();
    createRow("WCDMA Huawei").find("select[name=erbStatus]").val("Fora sem gerência");;
    createRow("LTE Huawei").find("input[name=erbAlarmes]").val("Falha na Bateria (Battery Not In Position)");
    forceUpdateRows();
}

$(".btnAnalise").click( function() {
    let btn = $(this);

    if(lastAnalise == "p1MetroIsolado" || btn.attr("id") != "p1MetroIsolado") updateInfoRota(false);
    if(btn.attr("id") == "p1MetroIsolado") updateInfoRota(true);
    
    lastAnalise = btn.attr("id");

    notErbAnalysis = ["p1MetroQuedaP2P", "p1MetroQuedaInfo1S", "p1MetroTemperatura", "p1TX"]

    if (notErbAnalysis.includes(lastAnalise)) { 
        $('input[name="infoRota"]')[0].checked = true;
        $('input[name="infoRota"]').change()
        $('input[name="infoConc"]')[0].checked = true;
        $('input[name="infoConc"]').change();
        disableFastAnalysis();
    } else {
        disableFastAnalysis(false);
    }

    if (lastAnalise == "p1Ericsson" || lastAnalise == "p1Huawei") stampMainContent.hide()
    else stampMainContent.show();

    switch (lastAnalise) {
        case "p1Ericsson": 
            ericssonAnalysis();
            break;
        case "p1Huawei": 
            huaweiAnalysis();
            break;
        case "p1MetroIsolado": 
            stampMainContent.text(carimboMetroIsolado);
            break;
        case "p1MetroQuedaP2P": 
            stampMainContent.text(carimboMetroP2P);
            break;
        case "p1MetroQuedaInfo1S": 
            stampMainContent.text(carimboMetroInfo1S);
            break;
        case "p1MetroTemperatura": 
            stampMainContent.text(carimboMetroTemperatura);
            break;
        case "p1TX": 
            stampMainContent.text(carimboTX);
            break;
        case "p1Solicitacao": 
            stampMainContent.text(carimboSolicitacao);
            break;
    }
});

$('#p1Ericsson').click();

$('input[name="infoRota"]').change( function () {
    if(lastAnalise == "p1MetroIsolado") updateInfoRota(true);
    else updateInfoRota();
});

$('input[name="infoConc"]').change( function () { updateInfoConc(); });

$('#infoConcText').change( function () { updateInfoConcText($(this).val()); });

$('input[name="temTp"]').change( function () { updateInfoTP(); });

$('input[name="tipoSite"]').change( function () { updateTipoSite(); });

$(".textarea").on("paste", function (e) {
    e.preventDefault();
    document.execCommand("insertHTML", false, (e.originalEvent || e).clipboardData.getData('text/plain'));
});

function mountAnalisys(onlyAnalysis = true) {
    let analisys = "";
    let visibleParts = $("#trueStamp").find(".textarea:visible");
    visibleParts = visibleParts.not("#stampHead");
    visibleParts = visibleParts.not("#stampFoot");
    
    visibleParts.each(function () {
        if (this.id == "stampFast") $(this).find(".innerTextarea:visible").each( function() { analisys += this.outerText.replace("\n\n", "\n") + "\n" }) 
        else analisys += this.outerText + "\n"; 
    });
    analisys = analisys.replace(new RegExp("\n$"), "");

    let allowLBreaks = (lastAnalise == "p1Solicitacao");
    if (!onlyAnalysis) analisys = $("#stampHead").text() + (allowLBreaks ? "\n\n" : "\n") + analisys + (allowLBreaks ? "\n\n" : "\n") + $("#stampFoot").text();
    if (!allowLBreaks) while (new RegExp("\n\n", "gi").test(analisys)) { analisys = analisys.replace("\n\n", "\n"); }

    return analisys;
}

$("#btnStampGen").click( function () {
    let theFinalStamp = mountAnalisys(false);

    $("#theFinalStamp").text(theFinalStamp);
    $("#theFinalStampHead").dialog({
        title: "Carimbo copiado para Área de Transferência !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto'
    });
    
    navigator.clipboard.writeText(theFinalStamp); 
});

$(window).resize(function () {
    $(".ui-dialog").position({
        my: "center", at: "center", of: window
    });
})