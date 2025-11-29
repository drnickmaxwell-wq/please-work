export function resolve(specifier, context, next) {
  if (specifier.endsWith(".css")) {
    return {
      url: new URL(specifier, context.parentURL ?? import.meta.url).href,
      shortCircuit: true,
    };
  }
  return next(specifier, context);
}

export function load(url, context, next) {
  if (url.endsWith(".css")) {
    return {
      format: "module",
      source: "export default {};",
      shortCircuit: true,
    };
  }
  return next(url, context);
}
