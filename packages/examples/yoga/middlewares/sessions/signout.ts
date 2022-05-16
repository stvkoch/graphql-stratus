export default function (next) {
  return (source, params, context) => {
    throw new Error("no authenticated");
  };
}
