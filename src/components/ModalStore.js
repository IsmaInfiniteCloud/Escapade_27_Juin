import { makeAutoObservable } from "mobx";

class ModalStore {
  isConnexionOpen = false;
  isInscriptionOpen = false;
  isEscapadeOpen = false;
  isDetailsHebergementOpen = false;
  isMessageOpen = false;
  isReservationOpen = false;
  isRechercheOpen = false;
  isMonCompteOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  openConnexionModal() {
    this.isConnexionOpen = true;
  }

  closeConnexionModal() {
    this.isConnexionOpen = false;
  }

  openInscriptionModal() {
    this.isInscriptionOpen = true;
  }

  closeInscriptionModal() {
    this.isInscriptionOpen = false;
  }

  openEscapadeModal() {
    this.isEscapadeOpen = true;
  }

  closeEscapadeModal() {
    this.isEscapadeOpen = false;
  }

  openDetailsHebergementModal() {
    this.isDetailsHebergementOpen = true;
  }

  closeDetailsHebergementModal() {
    this.isDetailsHebergementOpen = false;
  }

  openMessageModal() {
    this.isMessageOpen = true;
  }

  closeMessageModal() {
    this.isMessageOpen = false;
  }

  openReservationModal() {
    this.isReservationOpen = true;
  }

  closeReservationModal() {
    this.isReservationOpen = false;
  }

  openRechercheModal() {
    this.isRechercheOpen = true;
  }

  closeRechercheModal() {
    this.isRechercheOpen = false;
  }

  openMonCompteModal() {
    this.isMonCompteOpen = true;
  }

  closeMonCompteModal() {
    this.isMonCompteOpen = false;
  }
}

export default new ModalStore();
