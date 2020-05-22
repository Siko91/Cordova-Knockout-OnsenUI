const name = "page2";
import store from "../store.js";

const template = /*html*/ `
  <h1 data-bind="text: title">
  </h1>
  <div>Set Answer : <input type="number" pattern="\d*" step="1" data-bind="textInput: a2"></input></div>
  `;

function viewModel() {
    this.title = "Page2";
    this.a2 = store.state.variable1;
}

export default {
    title: "Page2",
    path: "page2",
    tag: name,
    viewModel: viewModel,
    template: template,
    component: ko.components.register(name, {
        viewModel: viewModel,
        template: template,
    }),
    closeAction: () => {
        window.history.go(-1);
    },
};