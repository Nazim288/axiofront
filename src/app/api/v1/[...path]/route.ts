import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://www.axiogram.ru/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PUT");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const path = params.path.join("/");
    const url = new URL(request.url);
    const queryString = url.search;
    const targetUrl = `${API_BASE_URL}/${path}${queryString}`;

    // Получаем тело запроса, если есть
    let body: string | null = null;
    if (method !== "GET" && method !== "DELETE") {
      try {
        body = await request.text();
      } catch {
        // Тело может быть пустым
      }
    }

    // Копируем заголовки, исключая host и другие служебные
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      // Исключаем заголовки, которые не должны передаваться на внешний сервер
      if (
        !["host", "connection", "content-length"].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    // Выполняем запрос к внешнему API
    const response = await fetch(targetUrl, {
      method,
      headers,
      body: body || undefined,
    });

    // Получаем ответ
    const responseData = await response.text();
    let jsonData: unknown;
    try {
      jsonData = JSON.parse(responseData);
    } catch {
      jsonData = responseData;
    }

    // Копируем заголовки ответа
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      // Исключаем заголовки, которые не должны передаваться клиенту
      if (
        ![
          "content-encoding",
          "transfer-encoding",
          "connection",
        ].includes(key.toLowerCase())
      ) {
        responseHeaders.set(key, value);
      }
    });

    // Возвращаем ответ
    return NextResponse.json(jsonData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Ошибка при проксировании запроса:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

