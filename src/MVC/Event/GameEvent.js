export class GameCommandEvent
{
    static enable = "GameCommand_enable";

    static ready = "Gamecommand_ready";

    static play = "GameCommand_play";

    static click = "GameCommand_click";

    static addscore = "GameCommand_addscore";

    static die = "GameCommand_die";

    static gameover = "GameCommand_gameover";

    static gomenu = "GameCommand_gomenu";
}

export class GameProxyEvent
{
    static initUI = "GameProxy_initUI";

    static initGame = "GameProxy_initGame";

    static updata = "GameProxy_updata";

    static statechagne = "GameProxy_statechange";

    static jump = "GameProxy_jump";

    static upscore = "GameProxy_upscore";

    static die = "GameProxy_die";
}