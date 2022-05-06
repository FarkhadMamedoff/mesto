export default class UserInfo {
  constructor({ profileName, profileProfession, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileProfession = document.querySelector(profileProfession);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      profileProfession: this._profileProfession.textContent
    };
    return userInfo;
  }

  setUserInfo(newProfileName, newProfileProfession) {
    this._profileName.textContent = newProfileName;
    this._profileProfession.textContent = newProfileProfession;
  }

  setUserAvatar(avatarInfo) {
    this._profileAvatar.src = avatarInfo;
  }

  setCurrentUserId(id) {
    this._currentUserId = id;
  }

  getCurrentUserId() {
    return this._currentUserId;
  }

}
