import { GraphQLClient } from "graphql-request"
import type { DocumentNode as _OriginalDocumentNode } from "graphql/language/ast"
export { gql } from "graphql-request"

type EmptyVariables = Record<string, never>

export const request = <T, V>(
  document: DocumentNode<T, V>,
  ...[variables]: V extends EmptyVariables ? [] : [variables: V]
) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT!, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GQL_TOKEN!}`,
    },
  }).request<T, V>(document, variables)

export interface DocumentNode<Result extends {}, Variables extends {}>
  extends _OriginalDocumentNode {}
