import store from "../../store.js";
import common from "../../common.js";

const name = "side-menu";

const template = /*html*/ `
<ons-page style="border-right:2px solid gray;">
    <div class="header centerText">
      <img src="./img/logo.png" width="100px" />
      <h3>Application Name</h3>
    </div>

    <ons-list modifier="inset" data-bind="foreach: linksToShow()">
      <ons-list-item modifier="longdivider" data-bind="click: $parent.goTo(type, link)" >
        <div class="left">
          <ons-icon class="menuIcon" fixed-width data-bind="attr: {icon: icon}" ></ons-icon>
        </div>
        <div class="center" data-bind="text: label"></div>
      </ons-list-item>
    </ons-list>
</ons-page>
`;

function viewModel() {
    const self = this;

    this.showHiddenLink = ko.observable(false);

    this.essentialLinks = [{
            label: "Page1",
            type: "page",
            link: "page1",
            icon: "fa-bookmark",
            show: () => true,
        },
        {
            label: "Page 2",
            type: "page",
            link: "page2",
            icon: "fa-undo",
            show: () => true,
        },
        {
            label: "Page123",
            type: "page",
            link: "page123",
            icon: "fa-rss",
            show: () => self.showHiddenLink,
        },
        {
            label: "Visit a Website",
            type: "link",
            link: "https://google.com/",
            icon: "fa-star-half-alt",
            show: () => false,
        },
    ];

    this.linksToShow = ko.computed(() => {
        return self.essentialLinks.filter((i) => i.show());
    });

    this.goTo = (type, link) => {
        if (type === "link") {
            window.open(link, "_blank");
        } else if (type === "page") {
            location.hash = link;
            common.closeMenu();
        } else {
            throw new Error(
                "Unknown Button Action : " + JSON.stringify([type, link])
            );
        }
    };
}

export default {
    tag: name,
    viewModel: viewModel,
    template: template,
    component: ko.components.register(name, {
        viewModel: viewModel,
        template: template,
    }),
};