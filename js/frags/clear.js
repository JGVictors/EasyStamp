$("#btnClear").click(function () {
    $("#clearStamp").text(carimboClear);
    $("#clearStampHead").dialog({
        title: "Carimbo de CLEAR copiado para Área de Transferência !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: '90%'
    });
    navigator.clipboard.writeText(carimboClear);
});