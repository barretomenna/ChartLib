const chart = rootTagName => {
  const ID = rootTagName.replace("#", "");
  const CHART_CONTAINER_NAME = "chartContainer";
  const CHART_BAR_NAME = "chartBar";
  const BAR_ITEM_NAME = "chartBarItem";

  const init = () => {
    createContainer(300);
    createBar(140, 1);
    createBar(120, 2);
  };

  const getRootTag = () => {
    return document.querySelector(rootTagName);
  };

  const getElement = (name, pos) => {
    return document.querySelector(`#${ID}-${name}${pos || ""}`);
  };

  const animateFillUp = (element, size, animationTime) => {
    var pos = 0;

    const animation = setInterval(() => {
      element.style.height = `${pos + 1}px`;
      pos++;

      if (pos === size) {
        clearInterval(animation);
      }
    }, animationTime);
  };

  const createDiv = ({ className, heigth, animate, pos, animationTime }) => {
    const div = document.createElement("div");
    div.setAttribute("class", className);
    div.setAttribute("id", `${ID}-${className}${pos || ""}`);

    if (animate) {
      animateFillUp(div, heigth, animationTime || 5);
    } else {
      div.style.height = `${heigth}px`;
    }

    return div;
  };

  const createContainer = heigth => {
    const rootTag = getRootTag();
    const container = createDiv({ className: CHART_CONTAINER_NAME, heigth });
    rootTag.append(container);
  };

  const createBar = (heigth, pos) => {
    const bar = createDiv({
      className: CHART_BAR_NAME,
      heigth,
      animate: true,
      pos,
      animationTime: 15
    });

    const chartContainer = getElement(CHART_CONTAINER_NAME);
    chartContainer.append(bar);

    createBarItem({ heigth: 50, pos, color: "yellow" });
    createBarItem({ heigth: 10, pos, color: "blue" });
    createBarItem({ heigth: 10, pos, color: "green" });
  };

  const createBarItem = ({ heigth, color, pos }) => {
    const barItem = createDiv({
      className: BAR_ITEM_NAME,
      heigth: heigth,
      pos,
      animate: true
    });

    barItem.style.background = color;

    const bar = getElement(CHART_BAR_NAME, pos);

    bar.append(barItem);
  };

  init();
};

window.onload = () => {
  chart("#root");
  chart("#root2");
  chart("#root3");
};
