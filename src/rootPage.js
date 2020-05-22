import store from "./store.js";
import common from "./common.js";

import page1 from "./pages/page1.js";
import page2 from "./pages/page2.js";

import sideMenu from "./pages/components/sideMenu.js";

const pages = [page1, page2];

const name = "root-page";

const template = /*html*/ `
<div id="app" data-bind="class: theme ? theme + 'Theme' : 'lightTheme'">

    <link data-bind="attr: { href: './css/lib/onsenui/' + theme + '-onsen-css-components.min.css' }" rel="stylesheet" />

    <ons-splitter>
        <ons-splitter-side swipeable collapse width="250px" animation="reveal" id="side-menu-container">
            <${sideMenu.tag}>
            </${sideMenu.tag}>
        </ons-splitter-side>

        <ons-splitter-content>
            <ons-page>

                <ons-toolbar>
                    <div class="left">
                        <ons-toolbar-button id="toggleMenuBtn">
                            <ons-icon icon="fa-bars, material:md-menu"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                    <div class="center centerText" data-bind="text: currentPage().title"></div>
                    <div class="right" data-bind="visible: currentPage().closeAction">
                        <ons-toolbar-button data-bind="click: ()=>{if(currentPage().closeAction) currentPage().closeAction();}">
                            <ons-icon icon="fa-times-circle, material:md-close-circle"></ons-icon>
                        </ons-toolbar-button>
                    </div>
                </ons-toolbar>

                <div class="paddedContent">
                    ${pages
                      .map(
                        (i) =>
                          `<${i.tag} data-bind="visible: ('${i.path}' === currentPage().path)"></${i.tag}>`
                      )
                      .join("\n")}
                </div>

            </ons-page>
        </ons-splitter-content>
    </ons-splitter>
</div>
`;

function viewModel() {
  // Data
  var self = this;

  self.theme = "dark";
  self.pages = pages;

  self.currentPath = ko.observable(self.pages[0].path);

  self.getPage = function (path) {
    var matches = self.pages.filter((p) => p.path === path);
    return matches.length ? matches[0] : null;
  };

  self.currentPage = ko.computed(() => self.getPage(self.currentPath()));

  self.toggleMenuBtn = window.document.getElementById("toggleMenuBtn");
  self.toggleMenuBtn.addEventListener("click", () => common.toggleMenu());

  // Client-side routes
  Sammy(function () {
    this.get("#:page", async function () {
      if (self.getPage(this.params.page) === null) {
        console.log("Unknown Route : " + this.params.page);
        location.hash = self.pages[0].path;
      } else self.currentPath(this.params.page);
    });

    this.get("", function () {
      location.hash = self.pages[0].path;
    });
  }).run();
}

export default {
  viewModel: viewModel,
  template: template,
  component: ko.components.register(name, {
    viewModel: viewModel,
    template: template,
  }),
};