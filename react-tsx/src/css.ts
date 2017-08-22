export function classNamePrefixer(prefix: string) {
    return (...classNames: string[]): string => {
        if (classNames.length === 0) {
            return prefix;
        }
        return classNames
            .map(className => (className ? `${prefix}-${className}` : ''))
            .filter(className => className.length > 0)
            .sort()
            .join(' ');
    };
}
