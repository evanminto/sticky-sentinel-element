/**
 * Creates a dummy "sentinel" element to track when a sticky element becomes "stuck."
 *
 * @see https://developers.google.com/web/updates/2017/09/sticky-headers
 */
export default class StickySentinel extends HTMLElement {
  static get tagName() {
    return 'sticky-sentinel';
  }

  constructor() {
    super();

    const el = this;

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = this.render();

    this.refs = {
      get sentinel() {
        return el.shadowRoot.querySelector('._sentinel');
      },

      /**
       * @returns {Element}
       */
      get target() {
        const { target } = el;

        if (!target) {
          return null;
        }

        return document.getElementById(target);
      }
    };

    const numThresholds = 100;
    const thresholdIncrement = 1 / numThresholds;

    const observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: [...new Array(numThresholds).keys()].map(i => i * thresholdIncrement),
      }
    );

    observer.observe(this.refs.sentinel);
  }

  get target() {
    return this.getAttribute('target');
  }

  set target(value) {
    this.setAttribute('target', value);
  }

  get stuckClass() {
    return this.getAttribute('stuck-class');
  }

  set stuckClass(value) {
    this.setAttribute('stuck-class', value);
  }

  get stuck() {
    return this.hasAttribute('stuck');
  }

  set stuck(value) {
    if (value) {
      this.setAttribute('stuck', '');
    } else {
      this.removeAttribute('stuck');
    }

    const { target } = this.refs;

    if (target) {
      const { stuckClass } = this;

      if (stuckClass) {
        if (value) {
          target.classList.add(stuckClass);
        } else {
          target.classList.remove(stuckClass);
        }
      }
    }
  }

  handleIntersection([ entry ]) {
    this.stuck = !entry.isIntersecting;
  }

  render() {
    return `
      <div class="_sentinel"></div>

      <style>
        :host {
          display: block;
          margin: 0;
          position: relative;
          visibility: hidden;
        }

        ._sentinel {
          position: absolute;
          top: 0;
          height: 1px;
          width: 1px;
          margin: 0;
        }
      </style>
    `;
  }
}

customElements.define(StickySentinel.tagName, StickySentinel);
