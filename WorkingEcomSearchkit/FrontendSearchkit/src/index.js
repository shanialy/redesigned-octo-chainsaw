import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ErrorBoundary } from "react-error-boundary";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SearchkitProvider, SearchkitClient } from "@searchkit/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const skClient = new SearchkitClient({
  itemsPerPage: 20,
});
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SearchkitProvider client={skClient}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          // onError={(error, errorInfo) => console.log({ error, errorInfo })}
        >
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </SearchkitProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
