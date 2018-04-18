export default (...classes) =>
    classes.reduce((res, className) => `${res} ${className}`, '');
