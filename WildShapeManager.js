const AllPlayerCharacters = {};

function AddPlayerCharacters(Player){
    var PlayerCharacters = findObjs({ type: 'character', controlledby: Player.id})
    PlayerCharacters.forEach(character => AddPlayerCharacter(character, Player.id));
}
function AddPlayerCharacter(character, PlayerID) {
    var IsWildShape = getAttrByName(character.id, 'WildShape');
    var IsDefaultCharacter = getAttrByName(character.id, 'WildShapeBase');
    //log(character);
    if(IsWildShape != undefined){
        character["WildShape"] = IsWildShape; // IsWildShape will be 0 or 1
    }
    else{
        createObj('attribute', {name:'WildShape', current: 0, characterid: character.id});
        IsWildShape = 0;
    }
    if(IsDefaultCharacter != undefined){
        character["WildShapeBase"] = IsDefaultCharacter;
    }
    else{
        createObj('attribute', {name:'WildShapeBase', current: 0, characterid: character.id});
        IsDefaultCharacter = 0;
    }

    if(!(PlayerID in AllPlayerCharacters))
    {
        AllPlayerCharacters[PlayerID] = new Object();
    }

    var NewCharacterObject = {
        name: character.get('name'),
        id: character.id,
        WildShape: IsWildShape,
        IsDefaultCharacter: IsDefaultCharacter
    }

    AllPlayerCharacters[PlayerID][character.id] = NewCharacterObject;
}
function SetCharacterAsWildShape (Character, PlayerID){
    if(PlayerID in AllPlayerCharacters){
        if(Character.id in AllPlayerCharacters[PlayerID]){
            var IsWildShape = getAttrByName(Character.id, 'WildShape');
            if(IsWildShape == undefined){
                createObj('attribute', {name:'WildShape', current: 1, characterid: Character.id});
                AllPlayerCharacters[PlayerID][Character.id]['WildShape'] = 1;
            }
            else{
                setAttrs(Character.id, {WildShape: 1})
                AllPlayerCharacters[PlayerID][Character.id]['WildShape'] = 1;
            }
        }
        else{
            createObj('attribute', {name:'WildShape', current: 1, characterid: Character.id});
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
                WildShape: 1,
                IsDefaultCharacter: 0
            }
            AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
        }
    }
    else{
        createObj('attribute', {name:'WildShape', current: 1, characterid: Character.id});
        var NewCharacterObject = {
            name: Character.get('name'),
            id: Character.id,
            WildShape: 1,
            IsDefaultCharacter: 0
        }
        AllPlayerCharacters[PlayerID] = new Object();
        AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
    }
}
function UnsetCharacterAsWildShape (Character, PlayerID){
    if(PlayerID in AllPlayerCharacters){
        if(Character.id in AllPlayerCharacters[PlayerID]){
            var IsWildShape = getAttrByName(Character.id, 'WildShape');
            if(IsWildShape == undefined){
                createObj('attribute', {name:'WildShape', current: 0, characterid: Character.id});
                AllPlayerCharacters[PlayerID][Character.id]['WildShape'] = 0;
            }
            else{
                setAttrs(Character.id, {WildShape: 0})
                AllPlayerCharacters[PlayerID][Character.id]['WildShape'] = 0;
            }
        }
        else{
            createObj('attribute', {name:'WildShape', current: 0, characterid: Character.id});
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
                WildShape: 0,
                IsDefaultCharacter: 0
            }
            AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
        }
    }
    else{
        createObj('attribute', {name:'WildShape', current: 0, characterid: Character.id});
        var NewCharacterObject = {
            name: Character.get('name'),
            id: Character.id,
            WildShape: 0,
            IsDefaultCharacter: 0
        }
        AllPlayerCharacters[PlayerID] = new Object();
        AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
    }
}
function SetCharacterAsDefaultWildShape (Character, PlayerID){
    if(PlayerID in AllPlayerCharacters){
        if(Character.id in AllPlayerCharacters[PlayerID]){
            var IsWildShapeBase = getAttrByName(Character.id, 'WildShapeBase');
            if(IsWildShapeBase == undefined){
                createObj('attribute', {name:'WildShapeBase', current: 1, characterid: Character.id});
                AllPlayerCharacters[PlayerID][Character.id]['WildShapeBase'] = 1;
            }
            else{
                setAttrs(Character.id, {WildShape: 1})
                AllPlayerCharacters[PlayerID][Character.id]['WildShapeBase'] = 1;
            }
        }
        else{
            createObj('attribute', {name:'WildShapeBase', current: 1, characterid: Character.id});
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
                WildShape: 0,
                IsDefaultCharacter: 1
            }
            AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
        }
    }
    else{
        createObj('attribute', {name:'WildShapeBase', current: 1, characterid: Character.id});
        var NewCharacterObject = {
            name: Character.get('name'),
            id: Character.id,
            WildShape: 0,
            IsDefaultCharacter: 1
        }
        AllPlayerCharacters[PlayerID] = new Object();
        AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
    }
}
function UnsetCharacterAsDefaultWildShape (Character, PlayerID){
    if(PlayerID in AllPlayerCharacters){
        if(Character.id in AllPlayerCharacters[PlayerID]){
            var IsWildShapeBase = getAttrByName(Character.id, 'WildShapeBase');
            if(IsWildShapeBase == undefined){
                createObj('attribute', {name:'WildShapeBase', current: 0, characterid: Character.id});
                AllPlayerCharacters[PlayerID][Character.id]['WildShapeBase'] = 0;
            }
            else{
                setAttrs(Character.id, {WildShape: 0})
                AllPlayerCharacters[PlayerID][Character.id]['WildShapeBase'] = 0;
            }
        }
        else{
            createObj('attribute', {name:'WildShapeBase', current: 0, characterid: Character.id});
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
                WildShape: 0,
                IsDefaultCharacter: 0
            }
            AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
        }
    }
    else{
        createObj('attribute', {name:'WildShapeBase', current: 0, characterid: Character.id});
        var NewCharacterObject = {
            name: Character.get('name'),
            id: Character.id,
            WildShape: 0,
            IsDefaultCharacter: 0
        }
        AllPlayerCharacters[PlayerID] = new Object();
        AllPlayerCharacters[PlayerID][Character.id] = NewCharacterObject;
    }
}
async function WildShape(PlayerID, SelectedCharacter){
    //let CurrentToken = findObjs({type:'graphic', represents: SelectedCharacter.id})[0];
    if(AllPlayerCharacters[PlayerID][SelectedCharacter.id].WildShape == 1)
    {
        var PlayerCharacter = findObjs({_type:'player', id: PlayerID})[0];
        var PlayerName = PlayerCharacter.get('displayname').split(" ")[0];
        var ChatMsg = "/w " + PlayerName + " &{template:default} {{name=Click }} : "
        var WaitToSend = new Promise((resolve, reject) => {Object.keys(AllPlayerCharacters[PlayerID]).forEach(CharacterID =>{
                if(AllPlayerCharacters[PlayerID][CharacterID].IsDefaultCharacter == 1)
                {
                    var Character = findObjs({_type:'character', id: CharacterID})[0];
                    var TokenSize = getAttrByName(CharacterID, 'token_size');
                    ChatMsg += "{{[" + Character.get('name') + "](!Spawn --name|" + Character.get('name') + " --deleteSource|1 --qty|1 --force|1 --fx|nova-magic --offset|0,0 --size|" + TokenSize + "," + TokenSize +")}}";
                    //ChatMsg += "{{[" + Character.get('name') + "](!Spawn --name|" + Character.get('name') + " --deleteSource|1 --qty|1 --offset|0,0 --size|" + TokenSize + "," + TokenSize +")}}";
                }
                resolve();
            });
        });
        WaitToSend.then(() => {
            //var PlayerCharacter = findObjs({_type:'player', id: PlayerID})[0];
            //var PlayerName = PlayerCharacter.get('displayname').split(" ")[0];
            //log("PlayerName: " + PlayerName + " Command = {{" + ChatMsg + "}}")
            sendChat("Wild Shape Manager", ChatMsg);
        });
    }
    else{
        var PlayerCharacter = findObjs({_type:'player', id: PlayerID})[0];
        var PlayerName = PlayerCharacter.get('displayname').split(" ")[0];
        var ChatMsg = "/w " + PlayerName + " &{template:default} {{name=Choose a wild shape }} : "
        var WaitToSend = new Promise((resolve, reject) => {Object.keys(AllPlayerCharacters[PlayerID]).forEach(CharacterID =>{
                if(AllPlayerCharacters[PlayerID][CharacterID].WildShape == 1)
                {
                    var TokenSize = getAttrByName(CharacterID, 'token_size');
                    var Character = findObjs({_type:'character', id: CharacterID})[0];
                    //ChatMsg += "{{[" + Character.get('name') + "](!Wild-Shape-Token " + PlayerID + " " + CurrentToken.id + " " + CharacterID + ")}}";
                    //ChatMsg += "{{[" + Character.get('name') + "](!Spawn --name|" + Character.get('name') + " --deleteSource|1 --qty|1 --offset|.5,.5 --fx|nova-magic --size|" + TokenSize + "," + TokenSize +")}}";
                    ChatMsg += "{{[" + Character.get('name') + "](!Spawn --name|" + Character.get('name') + " --deleteSource|1 --qty|1 --offset|-.5,-.5 --fx|nova-magic --size|" + TokenSize + "," + TokenSize +")}}";
                }
                resolve();
            });
        });
        WaitToSend.then(() => {
            log(ChatMsg);
            sendChat("Wild Shape Manager", ChatMsg);
        });
    }
}


const TestArea = (function() {
    var version = '1.0.0';

    const commands = [
        "!Set-As-Wild-Shape",
        "!Unset-As-Wild-Shape",
        "!Set-As-Default-Character",
        "!Unset-As-Default-Character",
        "!Wild-Shape"
    ];
    
    handleInput = function(msg) {
        if (msg.type !== "api") {
            return;
        }
        //log(msg);
        
        var SplitContents = msg.content.split(" ");

        if (!commands.includes(SplitContents[0])) {
            return;
        }

        var PlayerID = msg.playerid;
        var SelectedTokenID = undefined;
        if(msg.selected != undefined)
        {
            SelectedTokenID = SplitContents[1];
        }

        var PlayerCharacter = findObjs({_type:'player', id: PlayerID})[0];
        var PlayerName = PlayerCharacter.get('displayname').split(" ")[0];

        if(SelectedTokenID == undefined){
            sendChat("Wild Shape Manager", "/w " + PlayerName + " Token Must be selected");
            return;
        }

        var TargetCharacter = findObjs({_type:'character', id: SelectedTokenID})[0];
        
        if(SplitContents[0] == "!Set-As-Wild-Shape"){
            SetCharacterAsWildShape(TargetCharacter, PlayerID)
        }
        else if(SplitContents[0] == "!Unset-As-Wild-Shape"){
            UnsetCharacterAsWildShape(TargetCharacter, PlayerID)
        }
        else if(SplitContents[0] == "!Set-As-Default-Character"){
            SetCharacterAsDefaultWildShape(TargetCharacter, PlayerID)
        }
        else if(SplitContents[0] == "!Unset-As-Default-Character"){
            UnsetCharacterAsDefaultWildShape(TargetCharacter, PlayerID)
        }
        else if(SplitContents[0] == "!Wild-Shape"){
            WildShape(PlayerID, TargetCharacter)
        }
        else if(SplitContents[0] == "!Wild-Shape-Token"){






            //var WildShapesRemaining = getAttrByName(character.id, 'WildShape', 'current');
        }




    }
    
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        RegisterEventHandlers: registerEventHandlers
    };

}());
    
    
on("ready", function() {
    'use strict';
    
    var players=findObjs({_type:'player'});
    players.forEach(player => AddPlayerCharacters(player));
    log(AllPlayerCharacters)
    TestArea.RegisterEventHandlers();
});
