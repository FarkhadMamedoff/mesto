import Popup from "./Popup.js";
import {
  popupImageSelector,
  popupImageTitleSelector
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(popupImageSelector);
    this._popupImageTitle = this._popup.querySelector(popupImageTitleSelector);
  }

  open(name, url) {
    this._popupImage.src = url;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;

    super.open();
  }
}