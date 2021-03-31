import { GraphQLClient } from "graphql-request"
import { useQuerySubscription } from "react-datocms"
export { gql } from "graphql-request"

type EmptyVariables = { [key: string]: never }

export type GraphQuery<
  Q extends DocumentNode<any, any>,
  T = Q extends DocumentNode<infer T, any> ? T : never,
  V = Q extends DocumentNode<any, infer V> ? V : never
> =
  | { enabled: false; initialData: T }
  | {
      enabled: true
      initialData: T
      token: string
      query: DocumentNode<T, V>
      variables?: V
      preview: boolean
    }

const endpoint = process.env.NEXT_PUBLIC_GQL_ENDPOINT!
const draftEndpoint = process.env.NEXT_PUBLIC_GQL_DRAFT_ENDPOINT!
const token = process.env.GQL_TOKEN!

export const request = async <T, V>(
  preview = false,
  query: DocumentNode<T, V>,
  ...[variables]: V extends EmptyVariables ? [] : [variables: V]
): Promise<GraphQuery<DocumentNode<T, V>>> => {
  const client = new GraphQLClient(preview ? draftEndpoint : endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const initialData = await client.request<T, V>(
    (query as any) as string,
    variables
  )

  return preview
    ? { enabled: true, initialData, preview, query, token, variables }
    : { enabled: false, initialData }
}

export interface DocumentNode<Result extends {}, Variables extends unknown> {}

export const useGraphQuery = <T, V>(
  graphQuery: GraphQuery<DocumentNode<T, V>>
) => useQuerySubscription<T, V>(graphQuery as any)
