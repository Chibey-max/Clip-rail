/**
 * Envio (Hasura) GraphQL client (playbook P-3.2). No extra dependency: plain fetch.
 * Envio exposes each entity as a root field (`Campaign`, `Campaign_by_pk`, …) and BigInt as strings.
 */
const URL = process.env.NEXT_PUBLIC_ENVIO_GRAPHQL_URL;

export const hasIndexer = () => Boolean(URL);

export async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!URL) throw new Error("NEXT_PUBLIC_ENVIO_GRAPHQL_URL is not set");
  const res = await fetch(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // Server components: revalidate every few seconds so pages stay close to live.
    next: { revalidate: 5 },
  });
  if (!res.ok) throw new Error(`Indexer error ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}

/** Envio returns BigInt/numeric as strings. USDC units and view counts fit safely in numbers. */
export const num = (v: string | number | null | undefined) => (v == null ? 0 : Number(v));
