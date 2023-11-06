function loadProfile() {
   var profile = system.loadObjectFromAppData("profile.json") ;
   if (profile==null)
     profile = { version: 1, nextlevel: 0, difficult: 1, money_d: 0,
       applejack_level:1,
       pinkie_level:1,
       rarity_level:1,
       flatter_level:1,
       rainbow_level:1,
       twily_level:1,
       applejack_ability_0:false,
       applejack_ability_1:false,
       pinkie_ability_0:false,
       pinkie_ability_1:false,
       rarity_ability_0:false,
       rarity_ability_1:false,
       flatter_ability_0:false,
       flatter_ability_1:false,
       rainbow_ability_0:false,
       rainbow_ability_1:false,
       twily_ability_0:false,
       twily_ability_1:false
     } ;
   else {
     // Этот фрагмент - как добавлять новые поля в профиль при изменении программы
     if (isNaN(profile.money_d)) profile.money_d=0 ;
   }
   return profile;
}

function saveProfile(profile) {
   system.saveObjectToAppData("profile.json",profile) ;
}
