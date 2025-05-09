import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['header', 'content']
  static values = { url: String }

  get csrfToken() {
    return document.querySelector("meta[name='csrf-token']").content;
  }

  initialize() {
    // TODO Only poll if the decision is open
    document.addEventListener('decisionDataUpdated', this.refreshResults.bind(this))
    document.addEventListener('poll', this.refreshResults.bind(this))
  }

  async refreshResults(event) {
    event.preventDefault()
    if (this.refreshing) return;
    this.refreshing = true;
    const response = await fetch(this.urlValue, {
      method: "GET",
      headers: {
        "X-CSRF-Token": this.csrfToken,
      }
    });
    if (response.ok) {
      const html = await response.text();
      if (html !== this.previousHtml) {
        this.contentTarget.innerHTML = html;
        this.previousHtml = html;
        const newHeaderText = this.contentTarget.children[0].dataset.header;
        this.headerTarget.textContent = newHeaderText;
      }
      this.refreshing = false;
    } else {
      console.error("Error refreshing results:", response);
      this.refreshing = false;
    }
  }
}