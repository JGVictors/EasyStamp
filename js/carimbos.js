// CRIAR VISUAL PARA INFOS CONCESSIONÁRIA
const infoConcessionaria =
`Concessionária: CELESC
Protocolo: 99999999
Atendente: URA
Previsão: Sem previsão
OBS: Concessionária não confirma a falta de energia na região.`;

const infoRota =
`Rota: ITT-CTR / CTR-BJP / BJP-PMA / PMA-PMO 
Site Passagem: Operacional
GW: REMOTO - x-xx-xx-xxx-xxx-xxx-xx`;

const infoRotaMetro =
`Rota: x-xx-xx-xxx-xxx-xxx-xx
Site Passagem: Operacional, Porta GE0/7/3 direcionada para JPJ se encontra DOWN.`;

const carimboMetroIsolado =
`GW: LOCAL - X-XX-XX-XXX-XXX-XXX-XX - ISOLADO`;

const carimboMetroP2P =
`Queda de link entre MACAPÁ - SHOPPING e MARCO ZERO

x-xx-xx-xxx-xxx-xxx-xx Posição. ge2/5/0 - CORIANT
Tx Power (dBm): -5.3
Rx Power(dBm): -35

x-xx-xx-xxx-xxx-xxx-xx Posição. ge2/5/0 - CORIANT
Tx Power (dBm): -5.0
Rx Power(dBm):  -40

OBS: Link down em ambos os lados.
OBS: Elemento X-XX-XX-XXX-XXX-XXX-XX é redirecionado ao X-XX-XX-XXX-XXX-XXX-XX (IP: XXX.XX.XXX.XXX)
OBS NOC: Conforme verificado com equipe de TX ( Camila ) HUAWEI SEM FALHA equipe de TX ( Camila ) DENIS VERIFICANDO ALCATEL SEM FALHA.`;

const carimboMetroInfo1S =
`Queda de interface em PREFEITURA direção a GUILHON que está com caixa ainda planejada.

x-xx-xx-xxx-xxx-xxx-xx Posição. Gi0/0/5 - CISCO
Tx Power (dBm): -5.7
Rx Power(dBm): -40.0

OBS: Não foi possivel se conectar ao elemento X-XX-XX-XXX-XXX-XXX-XX, o link consta como up, pingando pelo /30 porem adjacência não está estabelecida.

Elemento X-XX-XX-XXX-XXX-XXX-XX consta como Planejado conforme SMTX, segue print em Anexo;

OBS: Link DOWN em direção a MSAN-DFBSA_O1B31.`;

const carimboMetroTemperatura =
`GWD: LOCAL - X-XX-XX-XXX-XXX-XXX-XX
GWD está apresentando Temperatura Alta no Slot 9

OBS: Acesso a caixa pelo /30 da caixa x-xx-xx-xxx-xxx-xxx-xx ( telnet XXX.XX.XXX.X ).`;

const carimboTX =
`Verificado PA- Radio SIAE - XXXXXS20/02 -   ALARME GMG OPERANDO
Radio SIAE XXXXXS20/02 [IP XX.XXX.XX.XXX] sem gerência (fica em login infinito) possível causa alarme de GMG Operando

OBS: Sua direção: Radio SIAE XXXXXS20/02 [IP XX.XXX.XX.XXX] também se encontra sem gerência mas este nem pagina de login aparece.`;

const carimboSolicitacao =
`Pedido:
Alarme : ACESSO SOLICITAÇÃO - PR - KTG -  FALHA DE INFRA - 
Alteração da antena ou correção de Tilt Elétrico .
Site sem cadeado.
Antena do primeiro setor da tecnologia WCDMA com vareta de tilt elétrico quebrada.
OBS: TA anterior encerrado

Solicitante: 
Arthur Predvisk
Telecom Engineer | Network Service ¿ TLF RS
Porto ¿ AC ¿ Brazil
011 9 9142 8926
arthur,predvisk@laginxlox.com
laginxlox.com

Análise:`;

const carimboClear = `@!@ FALHA SISTEMA GI-SDH SIGITM - ALARME NORMALIZADO - Verificado na aba de alarmes ainda não consta CLEAR de normalização impedindo o fechamento da TA. ###Informe e-escalation###`