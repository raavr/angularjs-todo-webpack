export default function ToArrayFilter() {
  return (obj) => {
    if (!(obj instanceof Object)) return obj;

    return Object.keys(obj).map(
      key => Object.defineProperty(obj[key], '$key', { enumerable: false, value: key })
    );
  };
}