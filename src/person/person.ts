/**
 * Abstract class representing a person
 */
export abstract class person {

  #personNumber
  #name
  #age
  #gender
  #address
  #phoneNumber
  #email

  person() {

  }

  getPersonNumber() {
    return this.#personNumber
  }
  getPerson() {
    return this;
  }
}