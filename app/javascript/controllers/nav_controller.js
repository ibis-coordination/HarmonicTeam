import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["icon"]

  log(event) {
    // console.log(event)
  }
}