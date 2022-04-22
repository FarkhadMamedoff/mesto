export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
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
