function loadProfile() {
   var profile = system.loadObjectFromAppData("profile.json") ;
   if (profile==null)
     profile = { version: 1, nextlevel: 0, difficult: 1 } ;
   return profile;
}

function saveProfile(profile) {
   system.saveObjectToAppData("profile.json",profile) ;
}
