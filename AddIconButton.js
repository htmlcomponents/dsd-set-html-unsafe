export class AddIconButton extends HTMLElement {
  constructor() {
    super();
    this.iconButtonCount = 0;
  }

  connectedCallback() {
    this.container = this.shadowRoot.querySelector("#container");
    this.button = this.shadowRoot.querySelector("button");
    this.iconButtonHTML = `
<icon-button>
    <template shadowrootmode="open">
        <link rel="stylesheet" href="./icon-button.css">
        <button>
            <svg>
                <use href="./icons.svg#star"></use>
            </svg>
        </button>
    </template>
</icon-button>
    `;

    this.button.addEventListener("click", () => {
      let iconButtonsHTML = "";
      this.iconButtonCount++;
      for (let i = 0; i < this.iconButtonCount; i++) {
        iconButtonsHTML += this.iconButtonHTML;
      }
      this.container.setHTMLUnsafe(iconButtonsHTML);
    });
  }
}
