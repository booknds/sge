// import template from './app.html';

/**
 */
export default function appComponent() {
  return {
    replace: true,
    template: (
      `<div style="display: flex; flex: 1; flex-direction: column">
          <header-nav></header-nav>
          <main></main>
        </div>`),
    restrict: 'E',
  };
}
