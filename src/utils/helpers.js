export const noop = () => undefined;
export const setRef = (ctx, name) => c => (ctx[name] = c);
