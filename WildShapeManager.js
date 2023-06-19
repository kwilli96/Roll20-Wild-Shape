
const WildShapeManager = (function() {
    const scriptName = "WildShapeManager";
    const version = '0.1.0';
    const DEBUG = false;
    let AllPlayerWildShapes = {};

    const commands = [
        "!Set-As-Wild-Shape",
        "!Unset-As-Wild-Shape",
        "!Set-Base-Character",
        "!Wild-Shape"
    ];



    function AddPlayers(SpecialPlayerID)
    {
        AllPlayerWildShapes = {};
        let players;
        if(SpecialPlayerID == undefined){
            players=findObjs({_type:'player'});
        }
        else{
            players=findObjs({_type:'player', id: SpecialPlayerID});
        }
        for(let PlayerIndex = 0; PlayerIndex < players.length; PlayerIndex++)
        {
            let player = players[PlayerIndex];
            AddPlayerCharacters(player)
        }
    }
    function AddPlayerCharacters(Player){
        try{
            if(!(Player.id in AllPlayerWildShapes))
            {
                AllPlayerWildShapes[Player.id] = {
                    Transformations: {},
                    Default: undefined
                };
            }
            var PlayerCharacters = findObjs({ type: 'character', controlledby: Player.id})
            for(let PlayerCharacterIndex = 0; PlayerCharacterIndex < PlayerCharacters.length; PlayerCharacterIndex++)
            {
                let Character = PlayerCharacters[PlayerCharacterIndex];
                AddPlayerCharacter(Character, Player.id);
            }
        }
        catch(error){
            log(`It can't be this far up: `);
            log(`Error: "${error}"`);
            log("Player: ");
            log(Player);
        }
    }
    function AddPlayerCharacter(character, PlayerID) {
        try{
            if(DEBUG)
            {
                log(`Current Character data:`);
                log(character);
            }
            if(character.defaulttoken != "")
            {
                character.get("defaulttoken", (CharacterDefaultToken) => {
                    try{
                        if(DEBUG)
                        {
                            log("Default Token:");
                            log(CharacterDefaultToken);
                        }
                        if(CharacterDefaultToken == undefined)
                        {
                            log(`This Character has no default token: "${character}" `);
                            return;
                        }
                        const TokenObj = JSON.parse(CharacterDefaultToken);
                        if(TokenObj == null)
                        {
                            if(DEBUG)
                            {
                                log(`This Token where represents is null: "${CharacterDefaultToken}" `);
                            }
                            return;
                        }
                        const TokensCharacter = getObj("character", character.id);
            
                        //let character = findObjs({type: "character", id: CharacterID})[0];
                        let IsWildShape;
                        let IsDefaultCharacter;
                        try {
                            IsWildShape = getAttrByName(TokensCharacter.id, 'WildShape');
                        } catch (error) {
                        }
                        try {
                            IsDefaultCharacter = getAttrByName(TokensCharacter.id, 'WildShapeBase');
                        } catch (error) {
                        }
                        // Don't add character sheets that are neither a default character or Wild Shape
                        if(DEBUG)
                        {
                            log(`IsWildShape: "${IsWildShape}" IsDefaultCharacter: "${IsDefaultCharacter}"`)
                        }
                        if((IsWildShape == undefined || IsWildShape != 0) && (IsDefaultCharacter == undefined|| IsDefaultCharacter != 0)){
                            return;
                        }
                        let NewCharacterObject = {
                            name: TokensCharacter.get('name'),
                            id: TokensCharacter.id
                        }
            
                        
                        try{
                            let Bar_Link1_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar1_link});
                            if(DEBUG)
                            {
                                log(Bar_Link1_List);
                            }
                            if(Bar_Link1_List.length != 0){
                                let Bar_Link1 = Bar_Link1_List[0];
                                NewCharacterObject["Bar1LinkName"] = Bar_Link1.get('name');
                                NewCharacterObject["Bar1LinkID"] = Bar_Link1.get('id');
                                NewCharacterObject["Bar1HasMax"] = Bar_Link1.max !== ""; 
                            }
                            else{
                                NewCharacterObject["Bar1LinkName"] = "";
                                NewCharacterObject["Bar1LinkID"] = "";
                                NewCharacterObject["Bar1HasMax"] = false; 
                            }
                        }
                        catch{
                            NewCharacterObject["Bar1LinkName"] = "";
                            NewCharacterObject["Bar1LinkID"] = "";
                            NewCharacterObject["Bar1HasMax"] = false; 
                        }
                        try{
                            let Bar_Link2_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar2_link});
                            if(DEBUG)
                            {
                                log(Bar_Link2_List);
                            }
                            if(Bar_Link2_List.length != 0){
                                let Bar_Link2 = Bar_Link2_List[0];
                                NewCharacterObject["Bar2LinkName"] = Bar_Link2.get('name');
                                NewCharacterObject["Bar2LinkID"] = Bar_Link2.get('id');
                                NewCharacterObject["Bar2HasMax"] = Bar_Link2.max !== ""; 
                            }
                            else{
                                NewCharacterObject["Bar2LinkName"] = "";
                                NewCharacterObject["Bar2LinkID"] = "";
                                NewCharacterObject["Bar2HasMax"] = false; 
                            }
                        }
                        catch{
                            NewCharacterObject["Bar2LinkName"] = "";
                            NewCharacterObject["Bar2LinkID"] = "";
                            NewCharacterObject["Bar2HasMax"] = false; 
                        }
                        try{
                            let Bar_Link3_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar3_link});
                            if(DEBUG)
                            {
                                log(Bar_Link3_List);
                            }
                            if(Bar_Link3_List.length != 0){
                                let Bar_Link3 = Bar_Link3_List[0];
                                NewCharacterObject["Bar3LinkName"] = Bar_Link3.get('name');
                                NewCharacterObject["Bar3LinkID"] = Bar_Link3.get('id');
                                NewCharacterObject["Bar3HasMax"] = Bar_Link3.max !== "";
                            }
                            else{
                                NewCharacterObject["Bar3LinkName"] = "";
                                NewCharacterObject["Bar3LinkID"] = "";
                                NewCharacterObject["Bar3HasMax"] = false;
                            }
                        }
                        catch{
                            NewCharacterObject["Bar3LinkName"] = "";
                            NewCharacterObject["Bar3LinkID"] = "";
                            NewCharacterObject["Bar3HasMax"] = false;
                        }

                        if(IsWildShape != undefined && IsWildShape != 0){
                            NewCharacterObject.IsWildShape = 1;
                            NewCharacterObject.IsDefaultCharacter = 0;
                            AllPlayerWildShapes[PlayerID].Transformations[TokensCharacter.id] = NewCharacterObject;
                            if(DEBUG)
                            {
                                log(`Adding Character to Transformations("${PlayerID}"):`);
                                log(NewCharacterObject);
                            }
                        }
                        else if(IsDefaultCharacter != undefined && IsDefaultCharacter != 0)
                        {
                            NewCharacterObject.IsWildShape = 0;
                            NewCharacterObject.IsDefaultCharacter = 1;
                            AllPlayerWildShapes[PlayerID].Default = NewCharacterObject;
                            if(DEBUG)
                            {
                                log(`Adding Character to Default("${PlayerID}"):`);
                                log(NewCharacterObject);
                            }
                        }
                        else{
                            if(DEBUG)
                            {
                                log(`Skipping Character("${PlayerID}"):`);
                                log(NewCharacterObject);
                            }
                            if(TokensCharacter.id in AllPlayerWildShapes[PlayerID].Transformations){
                                //delete AllPlayerWildShapes[PlayerID].Transformations[TokensCharacter.id];
                                AllPlayerWildShapes[PlayerID].Transformations[TokensCharacter.id] = undefined;
                            }
                            else if(AllPlayerWildShapes[PlayerID].Default != undefined && AllPlayerWildShapes[PlayerID].Default.id == TokensCharacter.id){
                                //delete AllPlayerWildShapes[PlayerID].Default;
                                AllPlayerWildShapes[PlayerID].Default = undefined;
                            }
                        }
                    }
                    catch(error){
                        log(`I fucking hate javascript: `);
                        log(`Error: "${error}"`);
                        log("Character: ");
                        log(character);
                        log(`PlayerID: "${PlayerID}"`);
                        log("All Wild Shapes: ");
                        log(AllPlayerWildShapes);
                    }
                });
            }
        } 
        catch (error) {
            log(`Where the fuck is this error: `);
            log(`Error: "${error}"`);
            log("Character: ");
            log(character);
        }
    }

    function SetCharacterAsWildShape (data){
        let retVal = [];
        //let Character = findObjs({type: "character", id:data.target})[0];
        let Character = getObj("character", data.target);
        if(DEBUG)
        {
            log("Setting Wild Shape Character:");
            log(Character);
        }

        let TempIsWildShape;
        let IsDefaultCharacter;
        try {
            TempIsWildShape = getAttrByName(data.target, 'WildShape');
            setAttrs(data.target, {WildShape: 1})
        } catch (error) {
            createObj('attribute', {name:'WildShape', current: 1, characterid: data.target});     
        }
        try {
            TempIsDefaultCharacter = getAttrByName(data.target, 'WildShapeBase');
            setAttrs(data.target, {WildShapeBase: 0})
        } catch (error) {
            createObj('attribute', {name:'WildShapeBase', current: 0, characterid: data.target});
        }

        AddPlayerCharacter(Character, data.playerid);
        return retVal;
    }
    function UnsetCharacterAsWildShape (data){
        let retVal = [];
        //let Character = findObjs({type: "character", id:data.target})[0];
        let Character = getObj("character", data.target);
        if(DEBUG)
        {
            log("Unsetting Wild Shape Character:");
            log(Character);
        }
        try{
            var IsWildShape = getAttrByName(Character.id, 'WildShape');
            setAttrs(Character.id, {WildShape: 0});
            AddPlayerCharacter(Character, data.playerid);
            return retVal;
        }catch{
            retVal.push(`w/ "${data.who}" Character is not a wild shape`);
            return retVal;
        }
    }
    function SetCharacterAsDefaultWildShape (data){
        //let Character = findObjs({type: "character", id:data.target})[0];
        let Character = getObj("character", data.target);
        if(DEBUG)
        {
            log("Setting Wild Shape Base Character:");
            log(Character);
        }
        if(data.playerid in AllPlayerWildShapes){
            var IsWildShapeBase = getAttrByName(Character.id, 'WildShapeBase');
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
            }
            if(IsWildShapeBase == undefined){
                createObj('attribute', {name:'WildShapeBase', current: 1, characterid: Character.id});
                NewCharacterObject.IsDefaultCharacter = 1;
            }
            else{
                setAttrs(Character.id, {WildShapeBase: 1})
                NewCharacterObject.IsDefaultCharacter = 1;
            }

            AllPlayerWildShapes[data.playerid].Default = NewCharacterObject;
        }
        else{
            createObj('attribute', {name:'WildShapeBase', current: 1, characterid: Character.id});
            var NewCharacterObject = {
                name: Character.get('name'),
                id: Character.id,
                IsDefaultCharacter: 1
            }
            AllPlayerWildShapes[data.playerid] = {
                Transformations: {},
                Default: undefined
            };
            AllPlayerWildShapes[data.playerid].Default = NewCharacterObject;
        }
    }
    function WildShape(data){
        let retVal = [];
        //let CurrentToken = findObjs({type:'graphic', represents: SelectedCharacter.id})[0];
        if(!(data.playerid in AllPlayerWildShapes)){
            retVal.push(`w/ "${data.who}" You need to setup Wild Shapes and base characters using !Set-Wild-Shape and !Set-Base-Character`);
            return retVal;
        }
        else{
            if(AllPlayerWildShapes[data.playerid].Default == undefined ){
                retVal.push(`w/ "${data.who}" You need to setup the base character using !Set-Base-Character`);
                return retVal;
            }
            // Return to Base Character
            if(data.target in AllPlayerWildShapes[data.playerid].Transformations){
                let BaseChatMsg = `/w "${data.who}" &{template:default} {{name=Choose Your base Character }} : `
                
                let WildShapeCharacter = AllPlayerWildShapes[data.playerid].Default;
                let Character = getObj('character', WildShapeCharacter.id);
                PromiseList = [];
                PromiseList.push(new Promise((resolve, reject) => {
                    Character.get("defaulttoken", (CharacterDefaultToken) => {
                        try{         
                            let TokenSize = getAttrByName(WildShapeCharacter.id, 'token_size');
                            let CharacterName = Character.get('name').replace("\"", "");
                            let ChatMsg = ``;               
                            if(DEBUG)
                            {
                                log("Default Token:");
                                log(CharacterDefaultToken);
                            }
                            if(CharacterDefaultToken == undefined)
                            {
                                log(`This Character has no default token: "${character}" `);
                                return;
                            }
                            const TokenObj = JSON.parse(CharacterDefaultToken);
                            if(TokenObj == null)
                            {
                                if(DEBUG)
                                {
                                    log(`This Token where represents is null: "${CharacterDefaultToken}" `);
                                }
                                return;
                            }
                            const TokensCharacter = getObj("character", WildShapeCharacter.id);
                
                            try{
                                let Bar_Link1_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar1_link});
                                if(DEBUG)
                                {
                                    log(Bar_Link1_List);
                                }
                                if(Bar_Link1_List.length != 0){
                                    let Bar_Link1 = Bar_Link1_List[0];
                                    WildShapeCharacter["Bar1LinkName"] = Bar_Link1.get('name');
                                    WildShapeCharacter["Bar1LinkID"] = Bar_Link1.get('id');
                                    WildShapeCharacter["Bar1HasMax"] = Bar_Link1.max !== ""; 
                                }
                                else{
                                    WildShapeCharacter["Bar1LinkName"] = "";
                                    WildShapeCharacter["Bar1LinkID"] = "";
                                    WildShapeCharacter["Bar1HasMax"] = false; 
                                }
                            }
                            catch{
                                WildShapeCharacter["Bar1LinkName"] = "";
                                WildShapeCharacter["Bar1LinkID"] = "";
                                WildShapeCharacter["Bar1HasMax"] = false; 
                            }
                            try{
                                let Bar_Link2_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar2_link});
                                if(DEBUG)
                                {
                                    log(Bar_Link2_List);
                                }
                                if(Bar_Link2_List.length != 0){
                                    let Bar_Link2 = Bar_Link2_List[0];
                                    WildShapeCharacter["Bar2LinkName"] = Bar_Link2.get('name');
                                    WildShapeCharacter["Bar2LinkID"] = Bar_Link2.get('id');
                                    WildShapeCharacter["Bar2HasMax"] = Bar_Link2.max !== ""; 
                                }
                                else{
                                    WildShapeCharacter["Bar2LinkName"] = "";
                                    WildShapeCharacter["Bar2LinkID"] = "";
                                    WildShapeCharacter["Bar2HasMax"] = false; 
                                }
                            }
                            catch{
                                WildShapeCharacter["Bar2LinkName"] = "";
                                WildShapeCharacter["Bar2LinkID"] = "";
                                WildShapeCharacter["Bar2HasMax"] = false; 
                            }
                            try{
                                let Bar_Link3_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar3_link});
                                if(DEBUG)
                                {
                                    log(Bar_Link3_List);
                                }
                                if(Bar_Link3_List.length != 0){
                                    let Bar_Link3 = Bar_Link3_List[0];
                                    WildShapeCharacter["Bar3LinkName"] = Bar_Link3.get('name');
                                    WildShapeCharacter["Bar3LinkID"] = Bar_Link3.get('id');
                                    WildShapeCharacter["Bar3HasMax"] = Bar_Link3.max !== "";
                                }
                                else{
                                    WildShapeCharacter["Bar3LinkName"] = "";
                                    WildShapeCharacter["Bar3LinkID"] = "";
                                    WildShapeCharacter["Bar3HasMax"] = false;
                                }
                            }
                            catch{
                                WildShapeCharacter["Bar3LinkName"] = "";
                                WildShapeCharacter["Bar3LinkID"] = "";
                                WildShapeCharacter["Bar3HasMax"] = false;
                            }
                            
                            ChatMsg += `{{["${CharacterName}"](!Spawn --name|"${CharacterName}" --deleteSource|1 --qty|1 --force|1 --offset|-.5,-.5`;
                            if(data.fx != ""){
                                ChatMsg += ` --fx|"${data.fx}"`;
                            }
                            if(data.statusmarkers){
                                let CurrentToken = getObj("graphic", data.targettoken);
                                if(DEBUG){
                                    log("Token to be updated: ")
                                    log(CurrentToken);
                                    log(CurrentToken.get('statusmarkers'));
                                }
                                if(CurrentToken.get('statusmarkers') != undefined && CurrentToken.get('statusmarkers') != ""){
                                    ChatMsg += ` --tokenProps|statusmarkers&amp;#58;`
                                    let StatusMarkers = CurrentToken.get('statusmarkers').split(",");
                                    for (let i = 0; i < StatusMarkers.length; i++){
                                        let Status = StatusMarkers[i].split("::")[0];
                                        ChatMsg += Status;
                                        if(i < StatusMarkers.length - 1){
                                            ChatMsg += "%comma%";
                                        }
                                    }
                                    //ChatMsg += ` --tokenProps|statusmarkers:"${CurrentToken.get('statusmarkers').replace("::", "%comma%")}"`;
                                }
                            }
    
    
                            if(WildShapeCharacter["Bar1LinkID"] != undefined && WildShapeCharacter["Bar1LinkID"] != ""){
                                ChatMsg += ` --bar1|@{"${CharacterName}"|"${WildShapeCharacter["Bar1LinkName"]}"}`
                                if(WildShapeCharacter["Bar1HasMax"]){
                                    ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar1LinkName"]}"|max}`
                                }
                                ChatMsg += ' KeepLink'
                            }
                            if(WildShapeCharacter["Bar2LinkID"] != undefined && WildShapeCharacter["Bar2LinkID"] != ""){
                                ChatMsg += ` --bar2|@{"${CharacterName}"|"${WildShapeCharacter["Bar2LinkName"]}"}`
                                if(WildShapeCharacter["Bar2HasMax"]){
                                    ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar2LinkName"]}"|max}`
                                }
                                ChatMsg += ' KeepLink'
                            }
                            if(WildShapeCharacter["Bar3LinkID"] != undefined && WildShapeCharacter["Bar3LinkID"] != ""){
                                ChatMsg += ` --bar3|@{"${CharacterName}"|"${WildShapeCharacter["Bar3LinkName"]}"}`
                                if(WildShapeCharacter["Bar3HasMax"]){
                                    ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar3LinkName"]}"|max}`
                                }
                                ChatMsg += ' KeepLink'
                            }
                            
                            ChatMsg += " --size|" + TokenSize + "," + TokenSize + ")}}";
                            resolve(ChatMsg.replace(/['"]+/g, ''));
                        }
                        catch(error){
                            resolve("");
                        }
                    });
                }));
                Promise.all(PromiseList)
                .then((ChatMessages)=>
                {
                    let ChatMsg2Send = BaseChatMsg;
                    if(DEBUG)
                    {
                        log(ChatMessages);
                    }
                    for(let i = 0; i < ChatMessages.length; i++)
                    {
                        ChatMsg2Send += ChatMessages[i];
                    }
                    if(DEBUG)
                    {
                        log(ChatMsg2Send);
                    }
                    sendChat("Wild Shape Manager", ChatMsg2Send);
                });
            }
            // Transform into Wild Shape
            else if(AllPlayerWildShapes[data.playerid].Default.id == data.target){

                let BaseChatMsg = `/w "${data.who}" &{template:default} {{name=Choose a wild shape }} : `
                let PromiseList = [];
                for (const [key, value] of Object.entries(AllPlayerWildShapes[data.playerid].Transformations))
                //for(let i = 0; i < AllPlayerWildShapes[data.playerid].Transformations.keys.length; i++)
                {
                    let ChatMsg = ``;
                    let WildShapeCharacter = value;
                    var Character = getObj('character', WildShapeCharacter.id); 
                    PromiseList.push(new Promise((resolve, reject) => {
                        Character.get("defaulttoken", (CharacterDefaultToken) => {
                            try{                   
                                var TokenSize = getAttrByName(WildShapeCharacter.id, 'token_size');
                                let CharacterName = Character.get('name').replace("\"", "");
                                if(DEBUG)
                                {
                                    log("Default Token:");
                                    log(CharacterDefaultToken);
                                }
                                if(CharacterDefaultToken == undefined)
                                {
                                    log(`This Character has no default token: "${Character}" `);
                                    return;
                                }
                                const TokenObj = JSON.parse(CharacterDefaultToken);
                                if(TokenObj == null)
                                {
                                    if(DEBUG)
                                    {
                                        log(`This Token where represents is null: "${CharacterDefaultToken}" `);
                                    }
                                    return;
                                }
                                const TokensCharacter = getObj("character", WildShapeCharacter.id);
                    
                                try{
                                    let Bar_Link1_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar1_link});
                                    if(DEBUG)
                                    {
                                        log(Bar_Link1_List);
                                    }
                                    if(Bar_Link1_List.length != 0){
                                        let Bar_Link1 = Bar_Link1_List[0];
                                        WildShapeCharacter["Bar1LinkName"] = Bar_Link1.get('name');
                                        WildShapeCharacter["Bar1LinkID"] = Bar_Link1.get('id');
                                        WildShapeCharacter["Bar1HasMax"] = Bar_Link1.max !== ""; 
                                    }
                                    else{
                                        WildShapeCharacter["Bar1LinkName"] = "";
                                        WildShapeCharacter["Bar1LinkID"] = "";
                                        WildShapeCharacter["Bar1HasMax"] = false; 
                                    }
                                }
                                catch{
                                    WildShapeCharacter["Bar1LinkName"] = "";
                                    WildShapeCharacter["Bar1LinkID"] = "";
                                    WildShapeCharacter["Bar1HasMax"] = false; 
                                }
                                try{
                                    let Bar_Link2_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar2_link});
                                    if(DEBUG)
                                    {
                                        log(Bar_Link2_List);
                                    }
                                    if(Bar_Link2_List.length != 0){
                                        let Bar_Link2 = Bar_Link2_List[0];
                                        WildShapeCharacter["Bar2LinkName"] = Bar_Link2.get('name');
                                        WildShapeCharacter["Bar2LinkID"] = Bar_Link2.get('id');
                                        WildShapeCharacter["Bar2HasMax"] = Bar_Link2.max !== ""; 
                                    }
                                    else{
                                        WildShapeCharacter["Bar2LinkName"] = "";
                                        WildShapeCharacter["Bar2LinkID"] = "";
                                        WildShapeCharacter["Bar2HasMax"] = false; 
                                    }
                                }
                                catch{
                                    WildShapeCharacter["Bar2LinkName"] = "";
                                    WildShapeCharacter["Bar2LinkID"] = "";
                                    WildShapeCharacter["Bar2HasMax"] = false; 
                                }
                                try{
                                    let Bar_Link3_List = findObjs({type: "attribute", characterid: TokensCharacter.id, id:TokenObj.bar3_link});
                                    if(DEBUG)
                                    {
                                        log(Bar_Link3_List);
                                    }
                                    if(Bar_Link3_List.length != 0){
                                        let Bar_Link3 = Bar_Link3_List[0];
                                        WildShapeCharacter["Bar3LinkName"] = Bar_Link3.get('name');
                                        WildShapeCharacter["Bar3LinkID"] = Bar_Link3.get('id');
                                        WildShapeCharacter["Bar3HasMax"] = Bar_Link3.max !== "";
                                    }
                                    else{
                                        WildShapeCharacter["Bar3LinkName"] = "";
                                        WildShapeCharacter["Bar3LinkID"] = "";
                                        WildShapeCharacter["Bar3HasMax"] = false;
                                    }
                                }
                                catch{
                                    WildShapeCharacter["Bar3LinkName"] = "";
                                    WildShapeCharacter["Bar3LinkID"] = "";
                                    WildShapeCharacter["Bar3HasMax"] = false;
                                }
                                
                                ChatMsg += `{{["${CharacterName}"](!Spawn --name|"${CharacterName}" --deleteSource|1 --qty|1 --force|1 --offset|-.5,-.5`;
                                if(data.fx != ""){
                                    ChatMsg += ` --fx|"${data.fx}"`;
                                }
                                if(data.statusmarkers){
                                    let CurrentToken = getObj("graphic", data.targettoken);
                                    if(DEBUG){
                                        log("Token to be updated: ")
                                        log(CurrentToken);
                                        log(CurrentToken.get('statusmarkers'));
                                    }
                                    if(CurrentToken.get('statusmarkers') != undefined && CurrentToken.get('statusmarkers') != ""){
                                        ChatMsg += ` --tokenProps|statusmarkers&amp;#58;`
                                        let StatusMarkers = CurrentToken.get('statusmarkers').split(",");
                                        for (let i = 0; i < StatusMarkers.length; i++){
                                            let Status = StatusMarkers[i].split("::")[0];
                                            ChatMsg += Status;
                                            if(i < StatusMarkers.length - 1){
                                                ChatMsg += "%comma%";
                                            }
                                        }
                                        //ChatMsg += ` --tokenProps|statusmarkers:"${CurrentToken.get('statusmarkers').replace("::", "%comma%")}"`;
                                    }
                                }
        
        
                                if(WildShapeCharacter["Bar1LinkID"] != undefined && WildShapeCharacter["Bar1LinkID"] != ""){
                                    ChatMsg += ` --bar1|@{"${CharacterName}"|"${WildShapeCharacter["Bar1LinkName"]}"}`
                                    if(WildShapeCharacter["Bar1HasMax"]){
                                        ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar1LinkName"]}"|max}`
                                    }
                                    ChatMsg += ' KeepLink'
                                }
                                if(WildShapeCharacter["Bar2LinkID"] != undefined && WildShapeCharacter["Bar2LinkID"] != ""){
                                    ChatMsg += ` --bar2|@{"${CharacterName}"|"${WildShapeCharacter["Bar2LinkName"]}"}`
                                    if(WildShapeCharacter["Bar2HasMax"]){
                                        ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar2LinkName"]}"|max}`
                                    }
                                    ChatMsg += ' KeepLink'
                                }
                                if(WildShapeCharacter["Bar3LinkID"] != undefined && WildShapeCharacter["Bar3LinkID"] != ""){
                                    ChatMsg += ` --bar3|@{"${CharacterName}"|"${WildShapeCharacter["Bar3LinkName"]}"}`
                                    if(WildShapeCharacter["Bar3HasMax"]){
                                        ChatMsg += `/@{"${CharacterName}"|"${WildShapeCharacter["Bar3LinkName"]}"|max}`
                                    }
                                    ChatMsg += ' KeepLink'
                                }
                                
                                ChatMsg += " --size|" + TokenSize + "," + TokenSize + ")}}";
                                resolve(ChatMsg.replace(/['"]+/g, ''));
                            }
                            catch(error){
                                resolve("");
                            }
                        });
                    }));
                    
                }
        
                Promise.all(PromiseList)
                .then((ChatMessages)=>
                {
                    if(DEBUG)
                    {
                        log(ChatMessages);
                    }
                    let ChatMsg2Send = BaseChatMsg;
                    for(let i = 0; i < ChatMessages.length; i++)
                    {
                        ChatMsg2Send += ChatMessages[i];
                    }
                    if(DEBUG)
                    {
                        log(ChatMsg2Send);
                    }
                    sendChat("Wild Shape Manager", ChatMsg2Send);
                });
                
            }
            else{
                retVal.push(`w/ "${data.who}" selected/targetted character is not a valid Wild Shape or Base Character`);
                return retVal;
            }
        }

        return retVal;
    }


    function processInlinerolls(msg) {
    	if(_.has(msg,'inlinerolls')){
    		return _.chain(msg.inlinerolls)
    		.reduce(function(m,v,k){
    			var ti=_.reduce(v.results.rolls,function(m2,v2){
    				if(_.has(v2,'table')){
    					m2.push(_.reduce(v2.results,function(m3,v3){
    						m3.push(v3.tableItem.name);
    						return m3;
    					},[]).join(', '));
    				}
    				return m2;
    			},[]).join(', ');
    			m['$[['+k+']]']= (ti.length && ti) || v.results.total || 0;
    			return m;
    		},{})
    		.reduce(function(m,v,k){
    			return m.replace(k,v);
    		},msg.content)
    		.value();
    	} else {
    		return msg.content;
    	}
    }
    const parseArgs = function(msg) {
        msg.content = msg.content
            .replace(/<br\/>\n/g, ' ')
            .replace(/(\{\{(.*?)\}\})/g," $2 ")
        
        //Check for inline rolls for spawn qty e.g. [[1d4]] or [[ 1t[tableName] ]]
        inlineContent = processInlinerolls(msg);
        
        let args = inlineContent.split(/\s+--/).map(arg=>{
                let cmds = arg.split('|');
                return {
                    cmd: cmds.shift().toLowerCase().trim(),
                    params: cmds[0]
                };
            });
        return args;
    };

    const ProcessCommands = function (data, args){
        let retVal = [];        //array of potential error messages to pass back to main handleInput funtion
        
        try {
            let Command = args[0]["cmd"];
            args.shift();

            if(DEBUG)
            {
                log("API Command: " + Command);
            }
            
            if(Command == "!set-as-wild-shape") {
                if (args.length >= 1) {
                    args.forEach((arg) => {
                        let option = arg["cmd"].toLowerCase().trim();
                        let param = arg["params"].trim();

                        switch(option) {
                            case "target":
                                data.target = param;
                                break;
                            default:
                                retVal.push(`w/ "${data.who}" Invalid parameter: "${option}"`);
                                return retVal;
                        }
                    });
                }
                if(data.target == undefined || data.target == ""){
                    retVal.push(`w/ "${data.who}" No target was selected or in the params. Use: --target|<TokenID>`);
                    return retVal;
                }

                if(DEBUG)
                {
                    log("Setting as Wild Shape:")
                    log("Wild Shape data:")
                    log(data);
                }

                retVal=SetCharacterAsWildShape(data);
            }
            else if(Command == "!unset-as-wild-shape") {
                if (args.length >= 1) {
                    args.forEach((arg) => {
                        let option = arg["cmd"].toLowerCase().trim();
                        let param = arg["params"].trim();

                        switch(option) {
                            case "target":
                                data.target = param;
                                break;
                            default:
                                retVal.push(`w/ "${data.who}" Invalid parameter: "${option}"`);
                                return retVal;
                        }
                    });
                }
                if(data.target == undefined || data.target == ""){
                    retVal.push(`w/ "${data.who}" No target was selected or in the params. Use: --target|<TokenID>`);
                    return retVal;
                }

                if(DEBUG)
                {
                    log("Unsetting as Wild Shape:")
                    log("Wild Shape data:")
                    log(data);
                }

                retVal=UnsetCharacterAsWildShape(data);
            }
            else if(Command == "!set-base-character") {
                if (args.length >= 1) {
                    args.forEach((arg) => {
                        let option = arg["cmd"].toLowerCase().trim();
                        let param = arg["params"].trim();

                        switch(option) {
                            case "target":
                                data.target = param;
                                break;
                            default:
                                retVal.push(`w/ "${data.who}" Invalid parameter: "${option}"`);
                                return retVal;
                        }
                    });
                }
                if(data.target == undefined || data.target == ""){
                    retVal.push(`w/ "${data.who}" No target was selected or in the params. Use: --target|<TokenID>`);
                    return retVal;
                }

                if(DEBUG)
                {
                    log("Setting as Base Character:")
                    log("Wild Shape data:")
                    log(data);
                }

                retVal=SetCharacterAsDefaultWildShape(data);
            }
            else if(Command == "!wild-shape") {
                if (args.length >= 1) {
                    args.forEach((arg) => {
                        let option = arg["cmd"].toLowerCase().trim();
                        let param = arg["params"].trim();

                        switch(option) {
                            case "fx":
                                data.fx = param;
                                break;
                            case "statusmarkers":
                                if (_.contains(['true', 'yes', '1'], param.toLowerCase())) {
                                    data.statusmarkers = true;
                                } 
                                else if (_.contains(['false', 'no', '0'], param.toLowerCase())) {
                                    data.statusmarkers = false;
                                }
                                else {
                                    retVal.push('Invalid statusmarker (\"' + param + '\"). Choose from: (true/yes/1/false/no/0)');
                                    return retVal;
                                }
                                break;
                            case "target":
                                data.target = param;
                                break;
                            default:
                                retVal.push(`w/ "${data.who}" Invalid parameter: "${option}"`);
                                return retVal;
                        }
                    });
                }
                if(data.target == undefined || data.target == ""){
                    retVal.push(`w/ "${data.who}" No target was selected or in the params. Use: --target|<TokenID>`);
                    return retVal;
                }

                if(DEBUG)
                {
                    log("Wild Shaping:")
                    log("Wild Shape data:")
                    log(data);
                }

                retVal=WildShape(data);
            }
            else if(Command == "!print-wild-shapes"){
                log(AllPlayerWildShapes);
            }

        } catch (error) {
            sendChat('Wild Shape Manager',`/w "${data.who}" `+ 'Unhandled exception: ' + error.message);
        }

        return retVal;
    }
    handleInput = function(msg) {
        try{
            if (msg.type !== "api") {
                return;
            }
            WhoMessaged = getObj('player',msg.playerid).get('_displayname');
            var data = {
                who: WhoMessaged,        //Who called the script
                whoID: msg.playerid,
                playerid: msg.playerid,
                validArgs: ["fx", "statusmarkers", "target"],    //list of valid user commands for error message
                // Custom fx to use see SpawnDefaultObject 
                // fxModes = ['bomb', 'bubbling', 'burn', 'burst', 'explode', 'glow', 'missile', 'nova', 'splatter']
                // fxColors = ['acid', 'blood', 'charm', 'death', 'fire', 'frost', 'holy', 'magic', 'slime', 'smoke', 'water'];
                fx: "", 
                statusmarkers: false, // Save the status markers
                target: "",
                targettoken: ""
            };
            if(msg.selected != undefined){
                data.targettoken = msg.selected[0]["_id"];
                var TempToken = getObj("graphic", msg.selected[0]["_id"])
                log(TempToken);
                data.target = TempToken.get("represents");
                if(data.target == undefined)
                {
                    sendChat('Wild Shape Manager',`/w "${data.who}" A character token must be selected`);
                }
            }
            else{
                sendChat('Wild Shape Manager',`/w "${data.who}" A token must be selected`);
            }
            //Parse msg into an array of argument objects [{cmd:params}]
            const args = parseArgs(msg);
    
            let errorMsg = ProcessCommands(data, args) || [];
            if (errorMsg.length > 0) {
                //Spam the chat with one or more errors (could be multiple due to user input validation checks)
                errorMsg.forEach((errMsg) => {
                    sendChat('Wild Shape Manager',`/w "${data.who}" `+ errMsg);
                });
                return;
            } 
        }
        catch(error){
            sendChat('Wild Shape Manager',`/w "${data.who}" `+ 'Unhandled exception: ' + error.message);
        }
    }

    const registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    function Preload (SpecialPlayerID){
        AddPlayers(SpecialPlayerID);
    }

    on("ready", function() {
        'use strict';
        try{
            let PlayerID = undefined;
            if(DEBUG){
                let Players = findObjs({type: "player"});
                for(let i = 0; i < Players.length; i++)
                {
                    if(Players[i].name == 'The Universe'){
                        PlayerID = Players[i].id;
                    }
                }
            }
            Preload(PlayerID);
            registerEventHandlers();
            log("-----Wild Shape Manager initialized-----");
        }
        catch(error){
            log("-----Wild Shape Manager Failed initialization-----");
            log(`Wild Shape error: ${error}`);
        }
    });

}());
