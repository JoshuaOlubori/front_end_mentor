/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
export default class Box extends HTMLElement {
    constructor() {
      super();
      this.render = () => {
        this.i = `Box-${[this.padding, this.invert].join('')}`;
        this.dataset.i = this.i;
        if (!document.getElementById(this.i)) {
          let styleEl = document.createElement('style');
          styleEl.id = this.i;
          styleEl.innerHTML = `
            [data-i="${this.i}"] {
              padding: ${this.padding};
              ${this.invert ?
              `background-color: var(--color-light);
                filter: invert(100%);`
              : ''}
            }
        
            [data-i="${this.i}"] {
              background-color: inherit;
            }
          `.replace(/\s\s+/g, ' ').trim();
          document.head.appendChild(styleEl);
        }
      }
    }
  
    get padding() {
      return this.getAttribute('padding') || 'var(--s1)';
    }
  
    set padding(val) {
      return this.setAttribute('padding', val);
    }
  
    // get borderWidth() {
    //   return this.getAttribute('borderWidth') || 'var(--border-thin)';
    // }
  
    // set borderWidth(val) {
    //   return this.setAttribute('borderWidth', val);
    // }
  
    static get observedAttributes() {
      return [ 'padding', 'invert'];
    }
  
    get invert() {
      return this.hasAttribute('invert');
    }
  
    set invert(val) {
      if (val) {
        return this.setAttribute('invert', '');
      } else {
        return this.removeAttribute('invert');
      }
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback() {
      this.render();
    }
  }
  
  if ('customElements' in window) {
    customElements.define('box-l', Box);
  }




/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export  class Center extends HTMLElement {
    constructor() {
      super();
      this.render = () => {
        this.i = `Center-${[this.max, this.andText, this.gutters, this.intrinsic].join('')}`;
        this.dataset.i = this.i;
        if (!document.getElementById(this.i)) {
          let styleEl = document.createElement('style');
          styleEl.id = this.i;
          styleEl.innerHTML = `
            [data-i="${this.i}"] {
              max-width: ${this.max};
              ${this.gutters ? `
              padding-inline-start: ${this.gutters};
              padding-inline-end: ${this.gutters};`
              : ''}
              ${this.andText ? `text-align: center;` : ''}
              ${this.intrinsic ? `
              display: flex;
              flex-direction: column;
              align-items: center;`
              : ''}
            }
          `.replace(/\s\s+/g, ' ').trim();
          document.head.appendChild(styleEl);
        }
      }
    }
  
    get max() {
      return this.getAttribute('max') || 'var(--measure)';
    }
  
    set max(val) {
      return this.setAttribute('max', val);
    }
  
    get andText() {
      return this.hasAttribute('andText');
    }
  
    set andText(val) {
      if (val) {
        return this.setAttribute('andText', '');
      } else {
        return this.removeAttribute('andText');
      }
    }
  
    get gutters() {
      return this.getAttribute('gutters') || null;
    }
  
    set gutters(val) {
      return this.setAttribute('gutters', val);
    }
  
    get intrinsic() {
      return this.hasAttribute('intrinsic');
    }
  
    set intrinsic(val) {
      if (val) {
        return this.setAttribute('intrinsic', '');
      } else {
        return this.removeAttribute('intrinsic');
      }
    }
  
    static get observedAttributes() {
      return ['max', 'andText', 'gutters', 'intrinsic'];
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback() {
      this.render();
    }
  }
  
  if ('customElements' in window) {
  
    customElements.define('center-l', Center);
  }


  /**
 * @module stack-l
 * @description
 * A custom element for injecting white space (margin) between flow 
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */
export  class Stack extends HTMLElement {
    constructor() {
      super();
      this.render = () => {
        this.i = `Stack-${[this.space, this.recursive, this.splitAfter].join('')}`;
        this.dataset.i = this.i;
        if (!document.getElementById(this.i)) {
          let styleEl = document.createElement('style');
          styleEl.id = this.i;
          styleEl.innerHTML = `
            [data-i="${this.i}"]${this.recursive ? '' : ' >'} * + * {
              margin-block-start: ${this.space};
            }
        
            ${this.splitAfter ? `
              [data-i="${this.i}"]:only-child {
                block-size: 100%;
              }
        
              [data-i="${this.i}"] > :nth-child(${this.splitAfter}) {
                margin-block-end: auto;
              }`
            : ''}
          `.replace(/\s\s+/g, ' ').trim();
          document.head.appendChild(styleEl);
        }
      }
    }
  
    get space() {
      return this.getAttribute('space') || 'var(--s1)';
    }
  
    set space(val) {
      return this.setAttribute('space', val);
    }
  
    get recursive() {
      return this.hasAttribute('recursive');
    }
  
    set recursive(val) {
      return this.setAttribute(val ? 'recursive' : '');
    }
  
    get splitAfter() {
      return this.getAttribute('splitAfter') || null;
    }
  
    set splitAfter(val) {
      return this.setAttribute('splitAfter', val);
    }
  
    static get observedAttributes() {
      return ['space', 'recursive', 'splitAfter'];
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback() {
      this.render();
    }
  }
  
  if ('customElements' in window) {
    customElements.define('stack-l', Stack);
  }


  /**
 * @module frame-l
 * @description
 * A custom element for augmenting image ratios
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export class Frame extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      if (this.children.length !== 1) {
        console.warn('<frame-l> elements should have just one child element');
      }
      this.i = `Frame-${[this.ratio].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let ratio = this.ratio.split(':');
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            aspect-ratio: ${ratio[0]} / ${ratio[1]};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get ratio() {
    return this.getAttribute('ratio') || '16:9';
  }

  set ratio(val) {
    return this.setAttribute('ratio', val);
  }

  static get observedAttributes() {
    return ['ratio'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('frame-l', Frame);
}



/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height (block-size) for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
export class Cover extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cover-${[this.centered, this.space, this.minHeight, this.noPad].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${!this.noPad ? this.space : '0'};
          }
      
          [data-i="${this.i}"] > * {
            margin-block: ${this.space};
          }
      
          [data-i="${this.i}"] > :first-child:not(${this.centered}) {
            margin-block-start: 0;
          }
      
          [data-i="${this.i}"] > :last-child:not(${this.centered}) {
            margin-block-end: 0;
          }
      
          [data-i="${this.i}"] > ${this.centered} {
            margin-block: auto;
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get centered() {
    return this.getAttribute('centered') || 'h1';
  }

  set centered(val) {
    return this.setAttribute('centered', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get minHeight() {
    return this.getAttribute('minHeight') || '100vh';
  }

  set minHeight(val) {
    return this.setAttribute('minHeight', val);
  }

  get noPad() {
    return this.hasAttribute('noPad');
  }

  set noPad(val) {
    if (val) {
      return this.setAttribute('noPad', '');
    } else {
      return this.removeAttribute('noPad');
    }
  }

  static get observedAttributes() {
    return ['centered', 'space', 'minHeight', 'noPad'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cover-l', Cover);
}

/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export class Cluster extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cluster-${[this.justify, this.align, this.space].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            justify-content: ${this.justify};
            align-items: ${this.align};
            gap: ${this.space};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get justify() {
    return this.getAttribute('justify') || 'flex-start';
  }

  set justify(val) {
    return this.setAttribute('justify', val);
  }

  get align() {
    return this.getAttribute('align') || 'flex-start';
  }

  set align(val) {
    return this.setAttribute('align', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  static get observedAttributes() {
    return ['justify', 'align', 'space'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cluster-l', Cluster);
}