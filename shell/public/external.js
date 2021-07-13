// minimum example
export default async (props) => {
  const root = props.getRoot();
  const node = document.createElement("div");
  node.textContent = "external";
  root.appendChild(node);
  return () => {
    node.remove();
    props.cleanup();
  };
};
