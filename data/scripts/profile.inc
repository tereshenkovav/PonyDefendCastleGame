function loadProfile() {
   var profile = system.loadObjectFromAppData("profile.json") ;
   if (profile==null)
     profile = { version: 1, nextlevel: 0, difficult: 1, money_d: 0 } ;
   else {
     // Этот фрагмент - как добавлять новые поля в профиль при изменении программы
     if (isNaN(profile.money_d)) profile.money_d=0 ;
   }
   return profile;
}

function saveProfile(profile) {
   system.saveObjectToAppData("profile.json",profile) ;
}
