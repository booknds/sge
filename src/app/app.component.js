// import template from './app.html';

/**
 */
export default function appComponent() {
  return {
    template: (
      `<div style="display: flex; flex-direction: column">
          <sg-header ></sg-header>
          <sg-main></sg-main>
        </div>`),
    restrict: 'E',
  };
}
