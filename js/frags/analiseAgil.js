loadAnaliseAgil();

function loadAnaliseAgil() { tableEvents(); }

function createRow(tecnologia) {    

    let row = "<tr>";
    row += "<td>";
    row += "<button class=\"btnRemoveERB\">-</button> ";
    row += "<input type=\"text\" name=\"nomeERB\" value=\"" + tecnologia + "\" disabled></input> ";

    if (tecnologia == "GSM Ericsson") {
        row += "<select name=\"gsmFrequencia\">";
        row += "<option value=\"850 MHz\">850 MHz</option>";
        row += "<option value=\"1800 MHz\">1800 MHz</option>";
        row += "<option value=\"900 MHz\">900 MHz</option>";
        row += "</select>";
    } else if (tecnologia.includes("Ericsson")) {
        row += "<input type=\"number\" name=\"erbNum\" min=\"1\" max=\"99\" value=\"1\">";
    } else if (tecnologia == "GSM Huawei") {
        row += "<input type=\"number\" name=\"erbNum\" min=\"1\" max=\"2\" value=\"1\">";
    }

    row += "</td>";

    row += "<td>";

    row += "<select name=\"erbStatus\">";
    row += "<option value=\"Operacional\">Operacional</option>";

    if (tecnologia.includes("GSM")) row += "<option value=\"Fora de serviço\">Fora de serviço</option>";
    else if (tecnologia.includes("Ericsson")) row += "<option value=\"HeartBeat\">HeartBeat</option>";
    else row += "<option value=\"Fora sem gerência\">Fora sem gerência</option>";

    if (!tecnologia.includes("GSM")) row += "<option value=\"Fora com gerência\">Fora com gerência</option>";

    row += "<option value=\"Intermitente\">Intermitente</option>";
    row += "</select>";

    if (tecnologia == "GSM Ericsson") {
        row += " <select name=\"gsmMeio\">";
        row += "<option value=\"WO\">WO</option>";
        row += "<option value=\"SIA\">SIA</option>";
        row += "<option value=\"LOF\">LOF</option>";
        row += "<option value=\"RDI\">RDI</option>";
        row += "<option value=\"SIA&LOF\">SIA&LOF</option>";
        row += "<option value=\"ERATE\">ERATE</option>";
        row += "<option value=\"NONE\">NONE</option>";
        row += "</select>";
    }

    row += "</td>";

    row += "<td>";
    row += "<input type=\"text\" name=\"erbAlarmes\" placeholder=\"Sem alarmes\">";
    row += "</td>";

    row += "</tr>";

    let newRow = $(row);
    postRowCreation(tecnologia, newRow);
    newRow.attr('data-createTime', (Math.floor(Math.random() * 9600) + "" + Date.now()));
    newRow.appendTo('tbody');
    createAnalysisDiv(newRow);

    if (tecnologia == "GSM Ericsson") newRow.find('select[name=gsmMeio]').prop("disabled", true); 

    return newRow;
}

function postRowCreation(tecnologia, row) {
    let allErbs = getAllERBs();
    let currentRows = new Array();

    allErbs.forEach(function(erb) { if (erb.includes(tecnologia)) currentRows.push(erb) })
    if (currentRows.length == 0) return;

    let newVal;
    if (tecnologia == "GSM Ericsson") {
        let has850 = false, has900 = false, has1800 = false;
        currentRows.forEach(function(erb) {
            if (erb.includes("850")) has850 = true;
            else if (erb.includes("900")) has900 = true;
            else if (erb.includes("1800")) has1800 = true;
        })

        if (has850 && has900 && has1800) return;
        if (has850) {
            if (has1800) newVal = "900 MHz";
            else newVal = "1800 MHz";
        } else if (has900) {
            if (has850) newVal = "1800 MHz";
            else newVal = "850 MHz";
        } else if (has1800) {
            if (has850) newVal = "900 MHz";
            else newVal = "850 MHz";
        }

        row.find("select[name=gsmFrequencia]").val(newVal);
    } else if (tecnologia.includes("Ericsson") || tecnologia == "GSM Huawei") {
        let nums = new Array();
        currentRows.forEach(function(erb) {
            let splited = erb.split(" ");
            if (splited.length == 3) nums.push(splited[2]);
        })
        nums.sort(function(a,b) { return a - b; })
        newVal = nums.pop();
        if ((tecnologia == "GSM Huawei" && newVal >= 2) || newVal >= 99) return;
        row.find("input[name=erbNum]").val(Number(newVal) + 1);
    }

}

function removeRow(row) {
    $('div[data-createTime=' + row.closest('tr').attr("data-createTime") + ']').remove();
    row.closest('tr').remove();
    reviewAnalysisDivs();
    sortTable();
}

function removeAllRows() { $('tbody').find('tr').each(function () { removeRow($(this)) }); }

function tableEvents() {

    $('#btnAdicionaERB').click(function () { isOkayToCreateARow($("select[name=tecnologias]").val()); });

    $('tbody').on('click', '.btnRemoveERB', function () { removeRow($(this)); });

    $('tbody').on('change keyup', function(event) { updateAnalysis($(event.target).closest('tr')) })

    $('tbody').on('change', 'select[name=gsmFrequencia], input[name=erbNum]', function(event) {
        updateAnalysis($(event.target).closest('tr'))
        sortTable();
        reviewAnalysisDivs();
    });

    $('tbody').on('change', 'select[name=erbStatus]', function(event) { 
        let erbStatus = $(event.target);
        let row = erbStatus.closest('tr');
        let esteMeioGSM = row.find('select[name=gsmMeio]');
        if (esteMeioGSM.length == 0) return;
        
        if (erbStatus.val() == "Operacional") {
            esteMeioGSM.prop("disabled", true);
            esteMeioGSM.val("WO");
        } else {
            esteMeioGSM.prop("disabled", false);
        }
                
        updateAnalysis(row);
    })

}

function forceUpdateRows() { $('tbody').find('select, input').change(); }

function isOkayToCreateARow(tecnologia) {

    let allStatus = getAllERBs();
    let isOkay = true;
    let returnMsgs = new Set;

    let isGSM = tecnologia.includes("GSM");
    let gsmCount = 0;

    if (tecnologia.includes("Ericsson")) {

        allStatus.forEach(function (tec) {
            let tecX =  tecnologia.split(" ");
            if (tec.includes(tecX[0] + " Huawei")) {
                isOkay = false;
                returnMsgs.add("Já tem " + tecX[0] + " da Huawei dentro da análise, quer mesmo um da Ericsson?");
            }
            if (isGSM && tec.includes(tecnologia)) {
                gsmCount++;
                if (gsmCount >= 3) {
                    isOkay = false;
                    returnMsgs.add("Já tem 3 GSMs da Ericsson dentro da análise, precisa mesmo de outro?");
                }
            }
        });

    } else if (tecnologia.includes("Huawei")) {

        allStatus.forEach(function (tec) {
            let tecX =  tecnologia.split(" ");
            if (tec.includes(tecX[0] + " Ericsson")) {
                isOkay = false;
                returnMsgs.add("Já tem " + tecX[0] + " da Ericsson dentro da análise, quer mesmo um da Huawei?");
            }
            if (isGSM && tec.includes(tecnologia)) {
                gsmCount++;
                if (gsmCount >= 2) {
                    isOkay = false;
                    returnMsgs.add("Já tem 2 GSMs da Huawei dentro da análise, precisa mesmo de outro?");
                    return;
                }
            } else if (tec.includes(tecnologia)) {
                isOkay = false;
                returnMsgs.add("Já tem " + tecX[0] + " da Huawei dentro da análise, quer mesmo outro?");
            } 
        });

    }

    let finalReturnMsg = "";

    returnMsgs.forEach(function (item) {
        finalReturnMsg += item + "\n";
    })

    if (isOkay) {
        createRow(tecnologia);
        sortTable();
    } else {
        $('#fastAnalysisAddAlert').text(finalReturnMsg);
        $('#fastAnalysisAddAlertHead').dialog({
            title: "Algo estranho ai...",
            modal: true,
            draggable: false,
            resizable: false,
            heigth: 'auto',
            width: 'auto',
            buttons: {
                "Não preciso": function () { $(this).dialog('close') },
                "Sim preciso" : function () { 
                    $(this).dialog("close");
                    createRow(tecnologia); 
                    sortTable();
                }
            }
        });
    }

}

function getERBStatusText(row) {

    let statusTecnologia = "";

    let nomeTecnologia = row.find('input[name=nomeERB]').val();
    let erbStatus = row.find('select[name=erbStatus]').val();
    let alarmes = row.find('input[name=erbAlarmes]').val();

    if (nomeTecnologia == "GSM Ericsson") {
        statusTecnologia = "GSM ";
        statusTecnologia += row.find('select[name=gsmFrequencia]').val();
        statusTecnologia += erbStatus == "Operacional" ? " " + erbStatus : " " + erbStatus + " com meio TX " + row.find('select[name=gsmMeio]').val();
    } else if (nomeTecnologia.includes("Ericsson") || nomeTecnologia.includes("GSM Huawei")) {
       statusTecnologia += nomeTecnologia.split(" ")[0] + row.find('input[name=erbNum]').val();
       statusTecnologia += erbStatus == "HeartBeat" ? " Fora de serviço " + erbStatus : " " + erbStatus;
    } else {
        statusTecnologia += nomeTecnologia.split(" ")[0]
        statusTecnologia += " " + erbStatus;
    }

    if (alarmes) statusTecnologia += " alarmando " + alarmes;

    return statusTecnologia;
}

function getAllERBs() {

    let allStatus = new Array();

    $('tbody').find('tr').each(function () { 
        row = $(this);
        nomeErb = row.find('input[name=nomeERB]').val(); 
        if (nomeErb == "GSM Ericsson") nomeErb += " " + row.find('select[name=gsmFrequencia]').val();
        else if (nomeErb.includes("Ericsson") || nomeErb == "GSM Huawei") nomeErb += " " + row.find('input[name=erbNum]').val();
        allStatus.push(nomeErb);
    });

    return allStatus;

}

function sortTable() {
    let sortedTable = $('tbody').find('tr').sort(function (a,b) { return sortValue(b)-sortValue(a); });
    $('tbody').find('tr').slice('1').remove();
    sortedTable.appendTo('tbody');

    let sortedDivs = $('#stampFast').children().sort(function (a,b) {
        return (isANoneDiv(b) ? noneDivValue(b) : sortValue($('tr[data-createTime=' + $(b).attr('data-createTime') + ']')))
             - (isANoneDiv(a) ? noneDivValue(a) : sortValue($('tr[data-createTime=' + $(a).attr('data-createTime') + ']'))) 
    })
    $('#stampFast').children().remove();
    sortedDivs.appendTo('#stampFast');
}

function sortValue(row) {
    row = $(row);
    nomeErb = row.find('input[name=nomeERB]').val();
    erbNum = Number(row.find('input[name=erbNum]').val());


    if (nomeErb == "GSM Ericsson") {
        switch (row.find('select[name=gsmFrequencia]').val()) {
            case "1800 MHz": return 302;
            case "900 MHz": return 303;
            case "850 MHz":  return 304;
        }
    } else if (nomeErb == "GSM Huawei") {
        return 302 - erbNum; // min 300 max 301
    } else if (nomeErb == "MBTS Ericsson") {
        return 300 - erbNum; // min 201 max 299
    } else if (nomeErb == "MBTS Huawei") {
        return 200;
    } else if (nomeErb == "WCDMA Ericsson") {
        return 200 - erbNum; // min 101 max 199
    } else if (nomeErb == "WCDMA Huawei") {
        return 100;
    } else if (nomeErb == "LTE Ericsson") {
        return 100 - erbNum; // min 1 max 99
    }

    return 0;
}

function isANoneDiv(div) { return (div.id == "noneGSMRow" || div.id == "noneWCDMARow" || div.id == "noneLTERow"); }

function noneDivValue(div) { return (div.id == "noneGSMRow") ? 300 : (div.id == "noneWCDMARow") ? 100 : (div.id == "noneLTERow") ? 1 : 0 ; }

function createAnalysisDiv(row) {
    reviewAnalysisDivs()
    $("<div class=\"innerTextarea\" contenteditable=\"true\" data-createTime="+ row.attr('data-createTime') +"></div>").text(getERBStatusText(row)).appendTo('#stampFast');
}

function updateAnalysis(row) { $('div[data-createTime=' + row.attr('data-createTime') + ']').text(getERBStatusText(row)) }

function reviewAnalysisDivs() {
    let erbs = getAllERBs();
    let gsmErbs = new Array(), mbtsErbs = new Array(), wcdmaErbs = new Array(), lteErbs = new Array();

    erbs.forEach(function (erb) {
        if (erb.includes("GSM")) gsmErbs.push(erb);
        else if (erb.includes("MBTS")) mbtsErbs.push(erb);
        else if (erb.includes("WCDMA")) wcdmaErbs.push(erb);
        else if (erb.includes("LTE")) lteErbs.push(erb);
    });

    if (gsmErbs.length > 0) $('#noneGSMRow').hide();
    else $('#noneGSMRow').show();

    if (mbtsErbs.length > 0) {
        $('#noneWCDMARow').hide();
        $('#noneLTERow').hide();
        return;
    }

    if (wcdmaErbs.length > 0) $('#noneWCDMARow').hide();
    else $('#noneWCDMARow').show();

    if (lteErbs.length > 0) $('#noneLTERow').hide();
    else $('#noneLTERow').show();
}

function disableFastAnalysis(bol = true) {
    if (bol) {
        $('#fastAnalysisDiv').hide();
        $('#stampFast').hide();
    } else {
        $('#fastAnalysisDiv').show();
        $('#stampFast').show();
    }
}