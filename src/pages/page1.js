const name = "page1";
import store from "../store.js";

const template = /*html*/ `
<h1 data-bind="text: title">
</h1>
<div>Answer is : <span data-bind="text: a"></span></div>
<ons-button data-bind="click: increment">++</ons-button>
`;

function viewModel() {
    this.title = "Page1";
    this.a = store.state.variable1;
    this.increment = function() {
        this.a(this.a() + 1);
    };
}

export default {
    title: "Page1",
    path: "page1",
    tag: name,
    viewModel: viewModel,
    template: template,
    component: ko.components.register(name, {
        viewModel: viewModel,
        template: template,
    }),
};