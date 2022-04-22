export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
  }

  getUserInfo() {
    const userInfo =  {
      profileName: this._profileName.textContent,
      profileProfession: this._profileProfession.textContent
    };
    return userInfo;
  }

  setUserInfo(newProfileName, newProfileProfession) {
    this._profileName.textContent = newProfileName;
    this._profileProfession.textContent = newProfileProfession;
  }
}
