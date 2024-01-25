const LightClient = {
    url: "",
    graphql: (query, variables, headers, method) => {
        return asyncFetch(LightClient.url, {
            method: method || "POST",
            headers: {
                "Content-Type": "application/json",
                ...(headers || {})
            },
            body: JSON.stringify({
                query: query,
                variables: variables || {},
            }),
        });
    },
};

return LightClient;