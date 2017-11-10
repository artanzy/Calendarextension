function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      window.location = "http://localhost:8080/main/main.html";
      $scope.userName = profile.getName();
}
window.onSignIn = onSignIn;
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        window.location = "http://localhost:8080";
    });
}
