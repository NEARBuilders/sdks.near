return {
    intersect: (firstObject, secondObject) => {
        return Object.fromEntries(
            new Map(
                Object.keys(firstObject).map((key) => [key, secondObject[key] || firstObject[key]])
            )
        );
    }
};