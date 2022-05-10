import { useSearchkitVariables } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
// import "./styles.css"
// import "./App.css"
import {
  FacetsList,
  SearchBar,
  Pagination,
  ResetSearchButton,
  SelectedFilters,
  SortingSelector,
} from "@searchkit/elastic-ui";
import "@elastic/eui/dist/eui_theme_light.css";
import {
  EuiBadge,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiHorizontalRule,
  EuiButtonGroup,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiCard,
} from "@elastic/eui";

const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
            __typename
          }
          ... on ValueSelectedFilter {
            value
            __typename
          }
          __typename
        }
        sortOptions {
          id
          label
          __typename
        }
        query
        __typename
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
          __typename
        }
        sortedBy
        items {
          ... on ResultHit {
            id
            fields {
              gender
              title
              image
              vendor
              price
              price_before_sale
              domain
              product_type
              is_on_sale
              updatedAt
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const HitsGrid = ({ data }) => (
  <EuiFlexGrid gutterSize="l">
    {data?.results.hits.items.map((hit) => (
      <EuiFlexItem key={hit.id} grow={2}>
        {hit.fields.is_on_sale == true ? (
          <EuiCard
            grow={true}
            textAlign="left"
            image={<img src={hit.fields.image} style={{ maxWidth: 200 }} />}
            title={hit.fields.title}
            description={hit.fields.product_type}
          >
            <EuiBadge color="#BADA55">Sale</EuiBadge>
            <EuiText size="s">
              <ul>
                <li>Price: {hit.fields.price}</li>
                <li>price_before_sale: {hit.fields.price_before_sale}</li>
                <li>vendor: {hit.fields.vendor}</li>
                <li>Domain: {hit.fields.domain}</li>
              </ul>
            </EuiText>
          </EuiCard>
        ) : (
          <EuiCard
            grow={true}
            textAlign="left"
            image={<img src={hit.fields.image} style={{ maxWidth: 200 }} />}
            title={hit.fields.title}
            description={hit.fields.product_type}
          >
            <EuiText size="s">
              <ul>
                <li>Price: {hit.fields.price}</li>
                <li>vendor: {hit.fields.vendor}</li>
                <li>Domain: {hit.fields.domain}</li>
              </ul>
            </EuiText>
          </EuiCard>
        )}
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
);

const App = () => {
  const variables = useSearchkitVariables();
  const {
    previousData,
    data = previousData,
    loading,
  } = useQuery(query, { variables });
  const [viewType, setViewType] = useState("list");
  const Facets = FacetsList([]);
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SearchBar loading={loading} />
        <EuiHorizontalRule margin="m" />
        <Facets data={data?.results} loading={loading} />
      </EuiPageSideBar>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <SelectedFilters data={data?.results} loading={loading} />
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <ResetSearchButton loading={loading} />
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="s">
                <h2>{data?.results.summary.total} Results</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection>
              <EuiFlexGroup>
                <EuiFlexItem grow={1}>
                  <SortingSelector data={data?.results} loading={loading} />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <HitsGrid data={data} />
            <EuiFlexGroup justifyContent="spaceAround">
              <Pagination data={data?.results} />
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default App;
