# Wild-Shape-Manager
  A script to that will allow any player to wild shape into any NPC/PC that they have control of. The script overall is pretty basic and relies on the Character sheets of PC and NPCs to be setup so that a single user has control of the character. If the Character has multiple controlled by users then there could be unexpected results. 
  To setup a Wild Shape you just need to set the Wild Shape character sheet to be controlled by the player. Then have the player run the !Set-As-Wild-Shape command with the Character's token selected. Once this step is completed the character will permanently become a wild shape available to the player. The token will update . A player can have as many wild shapes as they want but a caveat is that each one will need a seperate character sheet that has a unique name for them (i.e. "Dire Wolf" can be renamed to "Dire Wolf -CharacterName-".
  

## Commands
### !Set-As-Wild-Shape <Character ID>
  This will set the selected token as a character that can be wild shaped into. It is probably best (but not required) to have each Player have there own Set of NPC Character sheets. The token selection is only used to set the character sheet that the token is associated with and get the name of the character sheet.

> Macro example: !Set-As-Wild-Shape @{selected|character_id}
### !Unset-As-Wild-Shape <Character ID>
  This will make a character no longer a wild shape target.
  
> Macro example: !Unset-As-Wild-Shape @{selected|character_id}
### !Set-As-Default-Character <Character ID>
  This will set a character as the base character that a wild shape will transform back into. 
  
> Macro example: !Set-As-Default-Character @{selected|character_id}
### !Unset-As-Default-Character <Character ID>
  This will set a character as no longer a base character that a wild shape will transform into.
  
> Macro example: !Unset-As-Default-Character @{selected|character_id}
### !Wild-Shape <Character ID>
  This will bring up the menu for wild shapes that a player has access to. or a menu for the default character if the character selected is already a wild shape.

> Macro example: !Wild-Shape @{selected|character_id}
