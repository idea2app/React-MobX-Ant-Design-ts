export async function request<T>(path: string, method = "GET") {
  return (await (await fetch(path, { method })).json()) as T;
}
