# Wild-Shape-Manager
  A script to that will allow any player to wild shape into any NPC/PC that they have control of. The script overall is pretty basic and relies on the Character sheets of PC and NPCs to be setup somewhat correctly. A Player can have as many wild shapes as they want but each one will need an NPC or Character sheet that has a unique name. An example being if the player wants to use the dire wolf NPC character and the GM is using a dire wolf as a NPC then they both will need to have seperate NPC Character sheets. This will keep the players Dire Wolf Character Token seperate from the GMs Dire Wolf Token so that the player cannot control or see stats on the GMs Dire wolf . 

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
