//import { BUSINESS_STATUS_CODE } from "@/config/constants";

export async function callAPI<T>(
  path: string,
  method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
  body?: any
): Promise<T> {
  const isFormData = body instanceof FormData

  const res = await fetch(path, {
    method,
    headers: isFormData ? undefined : { "Content-Type": "application/json" },  // 讓瀏覽器自動設定 multipart boundary
    body: body ? isFormData ? body : JSON.stringify(body) : undefined,
  })

  const json = await res.json()

  if (!res.ok || json.status !== 1) {
    throw new Error(json.message || "API Error")
  }

  return json as T
}
