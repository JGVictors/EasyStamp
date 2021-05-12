$("#btnClear").click(function () {
    $("#clearStamp").text(carimboClear);
    $("#clearStampHead").dialog({
        title: "Carimbo de CLEAR copiado para Área de Transferência !",
        modal: true,
        draggable: false,
        resizable: false,
        heigth: 'auto',
        width: 'auto'
    });
    navigator.clipboard.writeText(carimboClear);
});